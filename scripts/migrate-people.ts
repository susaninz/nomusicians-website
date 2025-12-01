/**
 * Скрипт миграции людей в Sanity
 * Запуск: npx tsx scripts/migrate-people.ts
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

const people = [
  // MUSICIANS
  {
    id: 'rakitin',
    name: 'Сергей Ракитин',
    role: 'Основатель · Композитор',
    category: 'musician',
    instruments: 'Скрипка, синтезаторы, клавишные',
    photo: '/musicians/rakitin-1.jpg',
    bio: 'Отец-основатель и главная творческая единица Nomusicians. Композитор и мультиинструменталист, соединяющий академическую школу с экспериментальной электроникой.',
    links: [
      { type: 'telegram', url: 'https://t.me/RakitinSV', label: 'Telegram' },
      { type: 'banned', label: '@sergeyra' },
    ],
    order: 1,
  },
  {
    id: 'kotnov',
    name: 'Максим Котнов',
    role: 'Сооснователь · Композитор',
    category: 'musician',
    instruments: 'Барабаны, синтезаторы',
    photo: '/musicians/kotnov-1.jpg',
    bio: 'Сооснователь проекта, отвечающий за ритмическую архитектуру звука. Мастер живых барабанов и электронных ритмов.',
    links: [
      { type: 'telegram', url: 'https://t.me/maxdrumm', label: 'Telegram' },
      { type: 'banned', label: '@maksimkotnov' },
    ],
    order: 2,
  },
  {
    id: 'slezkin',
    name: 'Иван Слёзкин',
    role: 'Мультиинструменталист',
    category: 'musician',
    instruments: 'Флюгельгорн, пимак, клавиши, баян',
    photo: '/musicians/slezkin.jpg',
    bio: 'Присоединился к коллективу в 2022 году. Привносит духовые тембры и этнические мотивы.',
    links: [
      { type: 'telegram', url: 'https://t.me/Ivanslyozkin', label: 'Telegram' },
      { type: 'banned', label: '@susaninz' },
    ],
    order: 3,
  },
  {
    id: 'shchedrin',
    name: 'Максим Щедрин',
    role: 'Скрипач',
    category: 'musician',
    instruments: 'Скрипка',
    photo: '/musicians/shchedrin.jpg',
    bio: 'Выпускник РАМ им. Гнесиных. Присоединился в 2023 году.',
    links: [
      { type: 'telegram', url: 'https://t.me/maxim_shchedrin', label: 'Telegram' },
    ],
    order: 4,
  },
  // FAMILY
  {
    id: 'shcherbina',
    name: 'Алёна Щербина',
    role: 'Музыкант',
    category: 'family',
    instruments: 'Вокал',
    photo: '/people/alena.jpg',
    bio: 'Вокалистка с уникальным тембром, участница концертных программ.',
    links: [
      { type: 'banned', label: '@alenascherbina' },
    ],
    order: 5,
  },
  {
    id: 'vorontsov',
    name: 'Александр Воронцов',
    role: 'Мультиинструменталист',
    category: 'family',
    instruments: 'Гитара, бас-гитара, синтезаторы',
    photo: '/people/vorontsov.jpg',
    bio: 'Музыкант и саунд-дизайнер. Автор арт-проекта Humgath и звуковых практик Sonus Magnum.',
    links: [
      { type: 'telegram', url: 'https://t.me/nusaash', label: 'Блог' },
      { type: 'telegram', url: 'https://t.me/humgathart', label: 'Humgath' },
      { type: 'telegram', url: 'https://t.me/sonusmagnum', label: 'Sonus Magnum' },
      { type: 'banned', label: '@alvorontsov' },
    ],
    order: 6,
  },
  {
    id: 'kumiho',
    name: 'Даша Kumiho',
    role: 'Музыкант',
    category: 'family',
    instruments: 'Альт, скрипка',
    photo: '/people/kumiho.jpg',
    bio: 'Струнница, добавляющая глубину и выразительность в звучание.',
    links: [
      { type: 'banned', label: '@kumihodreams' },
    ],
    order: 7,
  },
  {
    id: 'resser',
    name: 'Дима Рессер',
    role: 'Мультиинструменталист',
    category: 'family',
    instruments: 'Гитара, синтезаторы',
    photo: '/people/resser.jpg',
    bio: 'Трезв и опасен. Концерты, спектакли, мастерклассы, уроки, перформансы.',
    links: [
      { type: 'telegram', url: 'https://t.me/dmitresser', label: 'Telegram' },
      { type: 'banned', label: '@dmitresser' },
    ],
    order: 8,
  },
  // COLLABORATORS
  {
    id: 'choy',
    name: 'Алексей Чой',
    role: 'Медиахудожник',
    category: 'collaborator',
    description: 'Видеохудожник, художник по свету, сценограф. Создаёт визуальное сопровождение концертов.',
    photo: '/people/choy.jpg',
    projects: ['Планетарии', 'Холодок 2024'],
    links: [
      { type: 'website', url: 'http://choy.ru/', label: 'choy.ru' },
      { type: 'telegram', url: 'https://t.me/choy_devyat_channel', label: 'Telegram' },
      { type: 'youtube', url: 'https://www.youtube.com/user/choy9', label: 'YouTube' },
    ],
    order: 9,
  },
  {
    id: 'bioman',
    name: 'Вадим Биоман',
    role: 'Медиахудожник',
    category: 'collaborator',
    description: 'VJ и медиахудожник, работающий с визуальными средами.',
    photo: '/people/bioman.jpg',
    projects: ['Labirinth Nuanu', 'Lampu Bali'],
    links: [
      { type: 'banned', label: '@vadbioman' },
    ],
    order: 10,
  },
  {
    id: 'dansury',
    name: 'Яна Дансури',
    role: 'Медиахудожник',
    category: 'collaborator',
    description: 'VJ и визуальный художник, создающая иммерсивные пространства.',
    photo: '/people/dansury.jpg',
    links: [
      { type: 'telegram', url: 'https://t.me/no_illusions', label: 'Telegram' },
      { type: 'banned', label: '@dansury.vj' },
    ],
    order: 11,
  },
  {
    id: 'samulekin',
    name: 'Александр Самулёкин',
    role: 'Фотограф',
    category: 'collaborator',
    description: 'Автор атмосферных съёмок концертов и художественных портретов.',
    photo: '/people/samulekin.jpg',
    projects: ['ДК Рассвет'],
    links: [
      { type: 'banned', label: '@aleksandr_samulekin' },
    ],
    order: 12,
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
  console.log('🚀 Начинаем миграцию людей в Sanity...\n');
  
  for (const person of people) {
    console.log(`\n👤 ${person.name} (${person.category})`);
    
    // Проверяем существует ли
    const existing = await client.fetch(`*[_type == "person" && slug.current == "${person.id}"][0]`);
    
    // Загружаем фото
    const photo = await uploadImage(person.photo);
    
    // Подготавливаем ссылки с _key
    const links = person.links.map((link, i) => ({
      _key: `link${i}`,
      type: link.type,
      url: link.url || null,
      label: link.label,
    }));
    
    const data = {
      name: person.name,
      slug: { _type: 'slug', current: person.id },
      category: person.category,
      role: person.role,
      instruments: person.instruments || null,
      bio: person.bio || null,
      description: person.description || null,
      projects: person.projects || [],
      links: links,
      order: person.order,
      ...(photo && { photo }),
    };
    
    if (existing) {
      console.log(`   Обновляем: ${existing._id}`);
      await client.patch(existing._id).set(data).commit();
    } else {
      console.log(`   Создаём новый`);
      await client.create({
        _type: 'person',
        ...data,
      });
    }
    
    console.log(`   ✅ Готово!`);
  }
  
  console.log('\n\n✅ Миграция людей завершена!');
}

migrate().catch(console.error);







