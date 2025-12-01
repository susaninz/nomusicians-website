/**
 * Скрипт миграции релизов в Sanity
 * Запуск: npx tsx scripts/migrate-releases.ts
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

const releases = [
  // Live
  {
    title: "Live at Ogonek '23",
    year: '2023',
    category: 'live',
    cover: '/releases/ogonek-23.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/live-set-on-ogonek-23-burning-time-thursday',
    order: 1,
  },
  {
    title: "Jam Loft '23",
    year: '2023',
    category: 'live',
    cover: '/releases/jam-loft-23.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/sets/jam-loft',
    order: 2,
  },
  {
    title: "Qatar '22",
    year: '2022',
    category: 'live',
    cover: '/releases/qatar-22.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/meanwhile-at-heenat-salma-featdmitry-skvortsov',
    order: 3,
  },
  {
    title: "Boring Room '20",
    year: '2020',
    category: 'live',
    cover: '/releases/boring-room-20.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/sets/boring-room-live-stream-20',
    order: 4,
  },
  {
    title: "Blanc '19",
    year: '2019',
    category: 'live',
    cover: '/releases/blanc-19.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/mammoth-firs-live',
    order: 5,
  },
  // Studio
  {
    title: 'Noch 3.0',
    year: '2023',
    category: 'studio',
    cover: '/releases/noch-3.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/noch-3',
    order: 6,
  },
  {
    title: 'Paraphonic',
    year: '2025',
    category: 'studio',
    cover: '/releases/paraphonic.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/ajh-pads',
    order: 7,
  },
  {
    title: '5pulse',
    year: '2024',
    category: 'studio',
    cover: '/releases/5pulse.jpg',
    soundcloudUrl: 'https://soundcloud.com/nomusicians/5pulse',
    order: 8,
  },
  // Collabs
  {
    title: 'That Wedding',
    year: '2022',
    category: 'collabs',
    cover: '/releases/that-wedding.jpg',
    soundcloudUrl: 'https://soundcloud.com/itsgoodtobeatree/sets/dima-ustinov-nomusicians-that-wedding',
    artist: 'w/ Dima Ustinov',
    label: 'ItsGoodToBeATree',
    order: 9,
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function migrate() {
  console.log('🚀 Начинаем миграцию релизов в Sanity...\n');
  
  for (const release of releases) {
    const slug = slugify(release.title);
    console.log(`\n🎵 Релиз: ${release.title} (${release.category})`);
    
    // Проверяем существует ли
    const existing = await client.fetch(`*[_type == "release" && title == "${release.title}"][0]`);
    
    // Загружаем обложку
    const cover = await uploadImage(release.cover);
    
    const data = {
      title: release.title,
      year: release.year,
      category: release.category,
      soundcloudUrl: release.soundcloudUrl,
      artist: release.artist || null,
      label: release.label || null,
      order: release.order,
      ...(cover && { cover }),
    };
    
    if (existing) {
      console.log(`   Обновляем: ${existing._id}`);
      await client.patch(existing._id).set(data).commit();
    } else {
      console.log(`   Создаём новый`);
      await client.create({
        _type: 'release',
        ...data,
      });
    }
    
    console.log(`   ✅ Готово!`);
  }
  
  console.log('\n\n✅ Миграция релизов завершена!');
}

migrate().catch(console.error);







