/**
 * Скрипт миграции всех проектов в Sanity
 * Запуск: npx tsx scripts/migrate-projects.ts
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skAmmetMLS3g493UuKIzJ8HfQ8DFi5ncbjV5GnPXNk4h1YlvlC2nJXeeLBS8Au7nhqUf7W0D8NyguPcrNnNLDWyZeZzLzLUsWnIa3oTdH9RsQvG1Nrnp9keFgcy0NeFhb5CpwIDgvKRnUTutsVhJi2dNxtyDZT6B2f9GaDp8ZXFSq9j7HjgW',
  useCdn: false,
});

// Данные проектов из projects.ts
const projects = [
  {
    id: 'klassika',
    title: { ru: 'Классика', en: 'Klassika', cn: '古典' },
    year: '2022—2024',
    image: '/projects/klassika-hero.png',
    hasPage: true,
    description: {
      ru: 'Музыкальная программа для бёрнерских фестивалей Огонёк и Холодок. Концерты под открытым небом, импровизации и творческие встречи в атмосфере сообщества.',
      en: 'Music program for burner festivals Ogonek and Kholodok. Open-air concerts, improvisations and creative gatherings in a community atmosphere.',
      cn: '燃烧者节日Ogonek和Kholodok的音乐节目。露天音乐会、即兴创作和社区氛围中的创意聚会。',
    },
    order: 1,
  },
  {
    id: 'lampu-bali',
    title: { ru: 'Lampu Bali', en: 'Lampu Bali', cn: 'Lampu Bali' },
    year: '2024',
    image: '/projects/lampu-bali.jpg',
    hasPage: false,
    description: {
      ru: 'Музыкальная резиденция на Бали. Концерты на закате в рисовых полях, джем-сессии с местными музыкантами и творческие встречи.',
      en: 'Music residency in Bali. Sunset concerts in rice fields, jam sessions with local musicians and creative gatherings.',
      cn: '巴厘岛音乐驻留。稻田日落音乐会，与当地音乐家的即兴演奏和创意聚会。',
    },
    order: 2,
  },
  {
    id: 'qatar',
    title: { ru: 'Qatar', en: 'Qatar', cn: 'Qatar' },
    year: '2022',
    image: '/releases/qatar-22.jpg',
    hasPage: false,
    description: {
      ru: 'Выступление в Катаре на площадке Heenat Salma. Специальная программа с участием Дмитрия Скворцова.',
      en: 'Performance in Qatar at Heenat Salma venue. Special program featuring Dmitry Skvortsov.',
      cn: '在卡塔尔Heenat Salma场地的演出。德米特里·斯克沃尔佐夫参与的特别节目。',
    },
    order: 3,
  },
  {
    id: 'portugal',
    title: { ru: 'Portugal Special', en: 'Portugal Special', cn: 'Portugal Special' },
    year: '2023',
    image: '/hero.jpg',
    hasPage: false,
    description: {
      ru: 'Двойной концерт в Лиссабоне: электроника, неоклассика и минимализм + трибьют Radiohead.',
      en: 'Double concert in Lisbon: electronics, neoclassical and minimalism + Radiohead tribute.',
      cn: '里斯本双重音乐会：电子、新古典和极简主义 + Radiohead致敬。',
    },
    order: 4,
  },
];

async function uploadImage(filePath: string): Promise<any> {
  const absolutePath = path.resolve(__dirname, '..', 'public', filePath.replace(/^\//, ''));
  
  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️  Файл не найден: ${absolutePath}`);
    return null;
  }
  
  console.log(`📤 Загружаем: ${filePath}`);
  const imageBuffer = fs.readFileSync(absolutePath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filePath),
  });
  
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function migrate() {
  console.log('🚀 Начинаем миграцию проектов в Sanity...\n');
  
  for (const project of projects) {
    console.log(`\n📁 Проект: ${project.title.ru}`);
    
    // Проверяем, существует ли проект
    const existing = await client.fetch(`*[_type == "project" && slug.current == "${project.id}"][0]`);
    
    // Загружаем изображение
    const image = await uploadImage(project.image);
    
    if (existing) {
      // Обновляем существующий
      console.log(`   Обновляем существующий: ${existing._id}`);
      await client.patch(existing._id)
        .set({
          title: project.title,
          year: project.year,
          hasPage: project.hasPage,
          description: project.description,
          order: project.order,
          ...(image && { image }),
        })
        .commit();
    } else {
      // Создаём новый
      console.log(`   Создаём новый документ`);
      await client.create({
        _type: 'project',
        slug: { _type: 'slug', current: project.id },
        title: project.title,
        year: project.year,
        hasPage: project.hasPage,
        description: project.description,
        order: project.order,
        ...(image && { image }),
      });
    }
    
    console.log(`   ✅ Готово!`);
  }
  
  console.log('\n\n✅ Миграция всех проектов завершена!');
}

migrate().catch(console.error);







