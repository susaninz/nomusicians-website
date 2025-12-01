/**
 * Скрипт миграции: перенос галерей проектов в фотоальбомы
 * 
 * Запуск:
 * 1. Установи зависимости: npm install @sanity/client dotenv
 * 2. Создай .env с SANITY_API_TOKEN (или укажи токен напрямую)
 * 3. Запусти: npx ts-node scripts/migrate-gallery-to-albums.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Загружаем .env
dotenv.config();

// Конфигурация
const PROJECT_ID = '9ejs3m2v';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

// Токен нужен для записи! Получи его в manage.sanity.io → API → Tokens
// Права: Editor или выше
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN || '';

// Клиент для чтения (без токена)
const readClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
});

// Клиент для записи (с токеном)
const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
});

interface ProjectWithGallery {
  _id: string;
  title: { ru?: string; en?: string; cn?: string };
  slug: { current: string };
  gallery: Array<{
    _key: string;
    _type: 'image';
    asset: { _ref: string };
    caption?: string;
  }>;
  photoAlbums?: Array<{ _ref: string }>;
}

async function migrate() {
  if (!TOKEN) {
    console.error('❌ Нужен SANITY_API_TOKEN для записи!');
    console.log('   Получи токен: manage.sanity.io → API → Tokens');
    console.log('   Запусти: SANITY_API_TOKEN=xxx npx ts-node scripts/migrate-gallery-to-albums.ts');
    process.exit(1);
  }

  console.log('🔍 Получаем проекты с галереями...\n');

  // Получаем все проекты с непустой галереей
  const projects: ProjectWithGallery[] = await readClient.fetch(`
    *[_type == "project" && defined(gallery) && count(gallery) > 0] {
      _id,
      title,
      slug,
      gallery,
      photoAlbums
    }
  `);

  console.log(`📦 Найдено проектов с галереями: ${projects.length}\n`);

  if (projects.length === 0) {
    console.log('✅ Нет проектов для миграции');
    return;
  }

  for (const project of projects) {
    const projectName = project.title?.ru || project.slug?.current || project._id;
    console.log(`\n📁 Проект: ${projectName}`);
    console.log(`   Фото в галерее: ${project.gallery.length}`);

    // Проверяем, есть ли уже привязанные альбомы
    if (project.photoAlbums && project.photoAlbums.length > 0) {
      console.log(`   ⚠️  Уже есть привязанные альбомы (${project.photoAlbums.length}), пропускаем`);
      continue;
    }

    // Создаём фотоальбом
    const albumTitle = `${projectName} — Фото`;
    console.log(`   📷 Создаём альбом: "${albumTitle}"`);

    const album = await writeClient.create({
      _type: 'photoAlbum',
      title: {
        ru: albumTitle,
        en: project.title?.en ? `${project.title.en} — Photos` : albumTitle,
        cn: project.title?.cn ? `${project.title.cn} — 照片` : albumTitle,
      },
      slug: {
        _type: 'slug',
        current: `${project.slug?.current || project._id}-photos`,
      },
      photos: project.gallery.map((photo, index) => ({
        _key: photo._key || `photo-${index}`,
        _type: 'image',
        asset: photo.asset,
        caption: photo.caption ? {
          ru: photo.caption,
          en: photo.caption,
          cn: photo.caption,
        } : undefined,
      })),
      showInMedia: true,
      isFeatured: false,
    });

    console.log(`   ✅ Альбом создан: ${album._id}`);

    // Привязываем альбом к проекту
    await writeClient
      .patch(project._id)
      .set({
        photoAlbums: [{ _type: 'reference', _ref: album._id }],
      })
      .commit();

    console.log(`   🔗 Альбом привязан к проекту`);
  }

  console.log('\n\n✅ Миграция завершена!');
  console.log('📝 Теперь можно удалить поле gallery из схемы project.ts');
}

// Режим только чтения (для проверки)
async function dryRun() {
  console.log('🔍 [DRY RUN] Проверяем проекты с галереями...\n');

  const projects: ProjectWithGallery[] = await readClient.fetch(`
    *[_type == "project" && defined(gallery) && count(gallery) > 0] {
      _id,
      title,
      slug,
      "photoCount": count(gallery),
      "albumsCount": count(photoAlbums)
    }
  `);

  console.log(`📦 Найдено проектов с галереями: ${projects.length}\n`);

  for (const project of projects) {
    const name = (project as any).title?.ru || (project as any).slug?.current;
    const photoCount = (project as any).photoCount;
    const albumsCount = (project as any).albumsCount || 0;
    
    console.log(`  • ${name}: ${photoCount} фото, альбомов: ${albumsCount}`);
  }

  console.log('\n💡 Запусти migrate() для переноса данных');
}

// Запуск
const args = process.argv.slice(2);
if (args.includes('--dry-run')) {
  dryRun().catch(console.error);
} else {
  migrate().catch(console.error);
}

