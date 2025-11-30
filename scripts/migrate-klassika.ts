/**
 * Скрипт миграции контента Классики в Sanity
 * Запуск: npx tsx scripts/migrate-klassika.ts
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

// Контент из index.astro
const klassikaContent = {
  title: {
    ru: 'Классика',
    en: 'Klassika',
    cn: '古典',
  },
  subtitle: {
    ru: 'Пространство для погружения в звук',
    en: 'A space for immersion in sound',
    cn: '沉浸于声音的空间',
  },
  years: '2022—2024',
  
  // Полное описание (Portable Text format для Sanity)
  fullDescription: {
    ru: [
      {
        _type: 'block',
        _key: 'p1',
        style: 'normal',
        children: [{_type: 'span', _key: 's1', text: 'Есть много аспектов музыки и эффектов, как она воздействует на людей. Она может развлекать, создавать фон, вызывать в человеке процессы, отзеркаливающие её настроение, порождать эмоции. Музыка запускает воображение, рисует картины внутри, создаёт пространство для мыслей и воспоминаний.'}],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [
          {_type: 'span', _key: 's2', text: 'Сейчас в мире преобладает развлекательный аспект музыки. Это неплохо... Но у нас, в Классике, мы предлагаем сконцентрироваться на другом. '},
          {_type: 'span', _key: 's3', text: 'Мы создаём пространство для идеального погружения в звук.', marks: ['strong']},
        ],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [{_type: 'span', _key: 's4', text: 'Классическая, неоклассическая, джазовая, электронная и другая музыка. Музыка, где основой является красота тембра каждого инструмента, глубина самой музыки и проникновения её в человека.'}],
      },
      {
        _type: 'block',
        _key: 'p4',
        style: 'normal',
        children: [{_type: 'span', _key: 's5', text: 'Совместное погружение в звук вместе с живыми концертами и визуальным искусством. Возможность побыть наедине с собой и музыкой.'}],
      },
      {
        _type: 'block',
        _key: 'p5',
        style: 'normal',
        children: [{_type: 'span', _key: 's6', text: 'Добро пожаловать ДОМОЙ.', marks: ['em']}],
      },
    ],
    en: [
      {
        _type: 'block',
        _key: 'e1',
        style: 'normal',
        children: [{_type: 'span', _key: 'es1', text: 'There are many aspects of music and effects on how it affects people. It can entertain, create a background, evoke processes in a person that mirror its mood, generate emotions. Music triggers imagination, paints pictures inside, creates space for thoughts and memories.'}],
      },
      {
        _type: 'block',
        _key: 'e2',
        style: 'normal',
        children: [
          {_type: 'span', _key: 'es2', text: 'Currently, the entertainment aspect of music prevails in the world. That\'s not bad... But here at Klassika, we suggest focusing on something else. '},
          {_type: 'span', _key: 'es3', text: 'We create a space for perfect immersion in sound.', marks: ['strong']},
        ],
      },
      {
        _type: 'block',
        _key: 'e3',
        style: 'normal',
        children: [{_type: 'span', _key: 'es4', text: 'Classical, neoclassical, jazz, electronic and other music. Music where the foundation is the beauty of each instrument\'s timbre, the depth of the music itself and its penetration into a person.'}],
      },
      {
        _type: 'block',
        _key: 'e4',
        style: 'normal',
        children: [{_type: 'span', _key: 'es5', text: 'Collective immersion in sound together with live concerts and visual art. An opportunity to be alone with yourself and music.'}],
      },
      {
        _type: 'block',
        _key: 'e5',
        style: 'normal',
        children: [{_type: 'span', _key: 'es6', text: 'Welcome HOME.', marks: ['em']}],
      },
    ],
    cn: [
      {
        _type: 'block',
        _key: 'c1',
        style: 'normal',
        children: [{_type: 'span', _key: 'cs1', text: '音乐有很多方面和效果，影响着人们。它可以娱乐，创造背景，唤起人们内心反映其情绪的过程，产生情感。音乐触发想象力，在内心描绘画面，为思想和记忆创造空间。'}],
      },
      {
        _type: 'block',
        _key: 'c2',
        style: 'normal',
        children: [
          {_type: 'span', _key: 'cs2', text: '目前，音乐的娱乐方面在世界上占主导地位。这并不坏...但在古典，我们建议专注于其他方面。'},
          {_type: 'span', _key: 'cs3', text: '我们创造一个完美沉浸于声音的空间。', marks: ['strong']},
        ],
      },
    ],
  },
  
  socials: [
    { 
      _key: 'tg1',
      type: 'telegram', 
      url: 'https://t.me/klassika_dom', 
      label: '@klassika_dom' 
    },
    { 
      _key: 'ig1',
      type: 'instagram', 
      url: null, 
      label: '@klassika_dom' 
    },
  ],
  
  presentationUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vRDIeSzd4H4wJQUtDKuL8j0DrmLc0HOhgnLd0tQQl_ItLVaC9jjFk-oCdPEYUHOhJX14h3GkttPYXhM/pub?start=false&loop=false&delayms=3000',
};

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
  console.log('🚀 Начинаем миграцию Классики в Sanity...\n');
  
  // 1. Находим документ klassika
  const existing = await client.fetch(`*[_type == "project" && slug.current == "klassika"][0]`);
  
  if (!existing) {
    console.log('❌ Проект "klassika" не найден в Sanity!');
    console.log('   Сначала создай проект в админке с slug "klassika"');
    return;
  }
  
  console.log(`✅ Найден проект: ${existing._id}\n`);
  
  // 2. Загружаем hero изображение
  console.log('📷 Загружаем hero изображение...');
  const heroImage = await uploadImage('/projects/klassika-logo.png');
  
  // 3. Загружаем галерею
  console.log('\n📷 Загружаем галерею...');
  const galleryFiles = [
    '/projects/klassika/gallery/Ogonek 24 - 1.png',
    '/projects/klassika/gallery/Ogonek 24 - 2.png',
    '/projects/klassika/gallery/Ogonek 24 - 3.png',
    '/projects/klassika/gallery/Holodok 25 - 1.png',
    '/projects/klassika/gallery/Holodok 25 - 2.png',
    '/projects/klassika/gallery/Holodok 25 - 3.png',
    '/projects/klassika/gallery/Holodok 25 - 4.png',
    '/projects/klassika/gallery/Holodok 25 - 5.png',
    '/projects/klassika/gallery/Holodok 25 - 6.png',
    '/projects/klassika/gallery/Dnevkin Yauza 1.png',
    '/projects/klassika/gallery/Dnevkin Yauza 2.png',
    '/projects/klassika/gallery/Dnevkin Yauza 3.png',
  ];
  
  const captions = [
    'Огонёк 2024', 'Огонёк 2024', 'Огонёк 2024',
    'Холодок 2025', 'Холодок 2025', 'Холодок 2025', 'Холодок 2025', 'Холодок 2025', 'Холодок 2025',
    'Дневник на Яузе', 'Дневник на Яузе', 'Дневник на Яузе',
  ];
  
  const gallery = [];
  for (let i = 0; i < galleryFiles.length; i++) {
    const img = await uploadImage(galleryFiles[i]);
    if (img) {
      gallery.push({
        ...img,
        _key: `gallery${i}`,
        caption: captions[i],
      });
    }
  }
  
  // 4. Обновляем документ
  console.log('\n📝 Обновляем документ в Sanity...');
  
  const result = await client.patch(existing._id)
    .set({
      hasPage: true,
      subtitle: klassikaContent.subtitle,
      fullDescription: klassikaContent.fullDescription,
      socials: klassikaContent.socials,
      presentationUrl: klassikaContent.presentationUrl,
      ...(heroImage && { heroImage }),
      ...(gallery.length > 0 && { gallery }),
    })
    .commit();
  
  console.log('\n✅ Миграция завершена!');
  console.log(`   Документ обновлён: ${result._id}`);
  console.log('\n📋 Что нужно сделать вручную:');
  console.log('   1. Загрузить видео (Quartet, Electronic Set) через админку');
  console.log('   2. Связать участников с документами Person');
  console.log('   3. Проверить результат на https://noadmin.ngrok.io');
}

migrate().catch(console.error);

