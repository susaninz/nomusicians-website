/**
 * Скрипт для загрузки данных в Sanity CMS
 * Запуск: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ============ ДАННЫЕ ============

const videos = [
  { 
    _type: 'video',
    _id: 'video-1',
    title: 'Marcia Moderato (Live)', 
    youtubeUrl: 'https://www.youtube.com/watch?v=PzFOKI7Ezl0',
    order: 1,
  },
  { 
    _type: 'video',
    _id: 'video-2',
    title: 'Besedka Live', 
    youtubeUrl: 'https://www.youtube.com/watch?v=MkBzeE7Wye4',
    order: 2,
  },
  { 
    _type: 'video',
    _id: 'video-3',
    title: 'Fast No Fast / Blanc', 
    youtubeUrl: 'https://www.youtube.com/watch?v=Tt64lxUyiPw',
    order: 3,
  },
  { 
    _type: 'video',
    _id: 'video-4',
    title: 'MiR / Lampu, Bali', 
    youtubeUrl: 'https://www.youtube.com/watch?v=D0fvoGoUxxI',
    order: 4,
  },
];

const releases = [
  // Live
  { _type: 'release', _id: 'release-live-1', title: "Live at Ogonek '23", year: '2023', category: 'live', soundcloudUrl: 'https://soundcloud.com/nomusicians/live-set-on-ogonek-23-burning-time-thursday', order: 1 },
  { _type: 'release', _id: 'release-live-2', title: "Jam Loft '23", year: '2023', category: 'live', soundcloudUrl: 'https://soundcloud.com/nomusicians/sets/jam-loft', order: 2 },
  { _type: 'release', _id: 'release-live-3', title: "Qatar '22", year: '2022', category: 'live', soundcloudUrl: 'https://soundcloud.com/nomusicians/meanwhile-at-heenat-salma-featdmitry-skvortsov', order: 3 },
  { _type: 'release', _id: 'release-live-4', title: "Boring Room '20", year: '2020', category: 'live', soundcloudUrl: 'https://soundcloud.com/nomusicians/sets/boring-room-live-stream-20', order: 4 },
  { _type: 'release', _id: 'release-live-5', title: "Blanc '19", year: '2019', category: 'live', soundcloudUrl: 'https://soundcloud.com/nomusicians/mammoth-firs-live', order: 5 },
  // Studio
  { _type: 'release', _id: 'release-studio-1', title: 'Noch 3.0', year: '2023', category: 'studio', soundcloudUrl: 'https://soundcloud.com/nomusicians/noch-3', order: 1 },
  { _type: 'release', _id: 'release-studio-2', title: 'Paraphonic', year: '2025', category: 'studio', soundcloudUrl: 'https://soundcloud.com/nomusicians/ajh-pads', order: 2 },
  { _type: 'release', _id: 'release-studio-3', title: '5pulse', year: '2024', category: 'studio', soundcloudUrl: 'https://soundcloud.com/nomusicians/5pulse', order: 3 },
  // Collabs
  { _type: 'release', _id: 'release-collab-1', title: 'That Wedding', year: '2022', category: 'collabs', soundcloudUrl: 'https://soundcloud.com/itsgoodtobeatree/sets/dima-ustinov-nomusicians-that-wedding', artist: 'w/ Dima Ustinov', label: 'ItsGoodToBeATree', order: 1 },
];

const people = [
  // Музыканты (основной состав)
  {
    _type: 'person',
    _id: 'person-rakitin',
    name: 'Сергей Ракитин',
    slug: { _type: 'slug', current: 'rakitin' },
    category: 'musician',
    role: 'Основатель · Композитор',
    instruments: 'Скрипка, синтезаторы, клавишные',
    bio: 'Отец-основатель и главная творческая единица Nomusicians. Композитор и мультиинструменталист, соединяющий академическую школу с экспериментальной электроникой.',
    order: 1,
  },
  {
    _type: 'person',
    _id: 'person-kotnov',
    name: 'Максим Котнов',
    slug: { _type: 'slug', current: 'kotnov' },
    category: 'musician',
    role: 'Сооснователь · Композитор',
    instruments: 'Барабаны, синтезаторы',
    bio: 'Сооснователь проекта, отвечающий за ритмическую архитектуру звука. Мастер живых барабанов и электронных ритмов.',
    order: 2,
  },
  {
    _type: 'person',
    _id: 'person-slezkin',
    name: 'Иван Слёзкин',
    slug: { _type: 'slug', current: 'slezkin' },
    category: 'musician',
    role: 'Мультиинструменталист',
    instruments: 'Флюгельгорн, пимак, клавиши, баян',
    bio: 'Присоединился к коллективу в 2022 году. Привносит в звучание группы духовые тембры и этнические мотивы.',
    order: 3,
  },
  {
    _type: 'person',
    _id: 'person-shchedrin',
    name: 'Максим Щедрин',
    slug: { _type: 'slug', current: 'shchedrin' },
    category: 'musician',
    role: 'Скрипач',
    instruments: 'Скрипка',
    bio: 'Выпускник РАМ им. Гнесиных. Присоединился в 2023 году, добавив в звучание классическую глубину.',
    order: 4,
  },
  // Nomusicians Family
  {
    _type: 'person',
    _id: 'person-shcherbina',
    name: 'Алёна Щербина',
    slug: { _type: 'slug', current: 'shcherbina' },
    category: 'family',
    role: 'Музыкант',
    instruments: 'Вокал',
    bio: 'Вокалистка с уникальным тембром, участница концертных программ.',
    links: [{ type: 'banned', label: '@alenascherbina' }],
    order: 1,
  },
  {
    _type: 'person',
    _id: 'person-vorontsov',
    name: 'Александр Воронцов',
    slug: { _type: 'slug', current: 'vorontsov' },
    category: 'family',
    role: 'Мультиинструменталист',
    instruments: 'Гитара, бас-гитара, синтезаторы',
    bio: 'Музыкант и саунд-дизайнер. Автор арт-проекта Humgath и звуковых практик Sonus Magnum.',
    links: [
      { type: 'telegram', url: 'https://t.me/nusaash', label: 'Блог' },
      { type: 'telegram', url: 'https://t.me/humgathart', label: 'Humgath' },
    ],
    order: 2,
  },
  {
    _type: 'person',
    _id: 'person-resser',
    name: 'Дима Рессер',
    slug: { _type: 'slug', current: 'resser' },
    category: 'family',
    role: 'Мультиинструменталист',
    instruments: 'Гитара, синтезаторы',
    bio: 'Трезв и опасен. Концерты, спектакли, мастерклассы, уроки, перформансы.',
    links: [{ type: 'telegram', url: 'https://t.me/dmitresser', label: 'Telegram' }],
    order: 3,
  },
  // Коллабораторы
  {
    _type: 'person',
    _id: 'person-choy',
    name: 'Алексей Чой',
    slug: { _type: 'slug', current: 'choy' },
    category: 'collaborator',
    role: 'Медиахудожник',
    description: 'Визуальное сопровождение концертов, генеративная графика',
    projects: ['Планетарий', 'Camp Klassika'],
    links: [
      { type: 'website', url: 'https://choy.ru', label: 'choy.ru' },
      { type: 'telegram', url: 'https://t.me/choy_devyat_channel', label: 'Telegram' },
      { type: 'youtube', url: 'https://youtube.com/user/choy9', label: 'YouTube' },
    ],
    order: 1,
  },
  {
    _type: 'person',
    _id: 'person-bioman',
    name: 'Вадим Биоман',
    slug: { _type: 'slug', current: 'bioman' },
    category: 'collaborator',
    role: 'Медиахудожник',
    description: 'Визуальное сопровождение концертов',
    projects: ['Lampu Bali', 'Labirinth Nuanu'],
    links: [{ type: 'banned', label: '@vadbioman' }],
    order: 2,
  },
  {
    _type: 'person',
    _id: 'person-dansury',
    name: 'Yana Dansury',
    slug: { _type: 'slug', current: 'dansury' },
    category: 'collaborator',
    role: 'Медиахудожник',
    description: 'VJ, визуальное сопровождение',
    projects: ['Классика'],
    links: [
      { type: 'telegram', url: 'https://t.me/no_illusions', label: 'Telegram' },
      { type: 'banned', label: '@dansury.vj' },
    ],
    order: 3,
  },
  {
    _type: 'person',
    _id: 'person-samulekin',
    name: 'Александр Самулёкин',
    slug: { _type: 'slug', current: 'samulekin' },
    category: 'collaborator',
    role: 'Фотограф',
    description: 'Концертная и репортажная фотография',
    projects: ['ДК Рассвет', 'Классика'],
    links: [{ type: 'banned', label: '@aleksandr_samulekin' }],
    order: 4,
  },
];

const projects = [
  {
    _type: 'project',
    _id: 'project-klassika',
    slug: { _type: 'slug', current: 'klassika' },
    title: { ru: 'Классика', en: 'Klassika', cn: '经典' },
    year: '2022—2024',
    hasPage: true,
    description: {
      ru: 'Музыкальная программа для бёрнерских фестивалей Огонёк и Холодок. Концерты под открытым небом, импровизации и творческие встречи в атмосфере сообщества.',
      en: 'Music program for burner festivals Ogonek and Kholodok. Open-air concerts, improvisations and creative gatherings in a community atmosphere.',
      cn: '燃烧者节日Ogonek和Kholodok的音乐节目。露天音乐会、即兴创作和社区氛围中的创意聚会。',
    },
    socials: [
      { type: 'telegram', url: 'https://t.me/klassika_dom', label: '@klassika_dom' },
    ],
    order: 1,
  },
  {
    _type: 'project',
    _id: 'project-lampu',
    slug: { _type: 'slug', current: 'lampu-bali' },
    title: { ru: 'Lampu Bali', en: 'Lampu Bali', cn: 'Lampu Bali' },
    year: '2024',
    hasPage: false,
    description: {
      ru: 'Музыкальная резиденция на Бали. Концерты на закате в рисовых полях, джем-сессии с местными музыкантами и творческие встречи.',
      en: 'Music residency in Bali. Sunset concerts in rice fields, jam sessions with local musicians and creative gatherings.',
      cn: '巴厘岛音乐驻留。稻田日落音乐会，与当地音乐家的即兴演奏和创意聚会。',
    },
    order: 2,
  },
  {
    _type: 'project',
    _id: 'project-qatar',
    slug: { _type: 'slug', current: 'qatar' },
    title: { ru: 'Qatar', en: 'Qatar', cn: '卡塔尔' },
    year: '2022',
    hasPage: false,
    description: {
      ru: 'Выступление в Катаре на площадке Heenat Salma. Специальная программа с участием Дмитрия Скворцова.',
      en: 'Performance in Qatar at Heenat Salma venue. Special program featuring Dmitry Skvortsov.',
      cn: '在卡塔尔Heenat Salma场地的演出。德米特里·斯克沃尔佐夫参与的特别节目。',
    },
    order: 3,
  },
  {
    _type: 'project',
    _id: 'project-portugal',
    slug: { _type: 'slug', current: 'portugal' },
    title: { ru: 'Portugal Special', en: 'Portugal Special', cn: '葡萄牙特别版' },
    year: '2023',
    hasPage: false,
    description: {
      ru: 'Двойной концерт в Лиссабоне: электроника, неоклассика и минимализм + трибьют Radiohead.',
      en: 'Double concert in Lisbon: electronics, neoclassical and minimalism + Radiohead tribute.',
      cn: '里斯本双重音乐会：电子、新古典和极简主义 + Radiohead致敬。',
    },
    order: 4,
  },
];

const tour = {
  _type: 'tour',
  _id: 'tour-china-2026',
  title: 'China Tour 2026',
  description: {
    ru: 'электроника, неоклассика и минимализм',
    en: 'electronic, neoclassical & minimalism',
    cn: '电子、新古典与极简主义',
  },
  isTour: true,
  isPast: false,
  isActive: true,
  events: [
    { date: { ru: '1 февраля', en: 'February 1', cn: '2月1日' }, time: '20:00', city: { ru: 'Пекин', en: 'Beijing', cn: '北京' }, venue: 'Blue Note Beijing', ticketUrl: '#' },
    { date: { ru: '3 февраля', en: 'February 3', cn: '2月3日' }, time: '20:00', city: { ru: 'Шанхай', en: 'Shanghai', cn: '上海' }, venue: 'JZ Club', ticketUrl: '#' },
    { date: { ru: '5 февраля', en: 'February 5', cn: '2月5日' }, time: '20:00', city: { ru: 'Гуанчжоу', en: 'Guangzhou', cn: '广州' }, venue: 'MAO Livehouse', ticketUrl: '#' },
    { date: { ru: '7 февраля', en: 'February 7', cn: '2月7日' }, time: '20:00', city: { ru: 'Шэньчжэнь', en: 'Shenzhen', cn: '深圳' }, venue: 'B10 Live', ticketUrl: '#' },
    { date: { ru: '9 февраля', en: 'February 9', cn: '2月9日' }, time: '20:00', city: { ru: 'Ханчжоу', en: 'Hangzhou', cn: '杭州' }, venue: 'MAO Livehouse', ticketUrl: '#' },
    { date: { ru: '11 февраля', en: 'February 11', cn: '2月11日' }, time: '20:00', city: { ru: 'Чэнду', en: 'Chengdu', cn: '成都' }, venue: 'Little Bar', ticketUrl: '#' },
  ],
};

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  email: 'mail@nomusicians.com',
  youtubeChannel: 'https://www.youtube.com/@nomusicians',
  telegram: 'https://t.me/nomusicians',
  vk: 'https://vk.com/nomusicians',
  facebook: 'https://www.facebook.com/nomusiciansband',
  soundcloud: 'https://soundcloud.com/nomusicians',
  pressKitUrl: '#',
};

// ============ ЗАГРУЗКА ============

async function seed() {
  console.log('🚀 Начинаем загрузку данных в Sanity...\n');

  const transaction = client.transaction();

  // Видео
  console.log('📹 Видео...');
  for (const video of videos) {
    transaction.createOrReplace(video);
  }

  // Релизы
  console.log('💿 Релизы...');
  for (const release of releases) {
    transaction.createOrReplace(release);
  }

  // Люди
  console.log('👥 Люди...');
  for (const person of people) {
    transaction.createOrReplace(person);
  }

  // Проекты
  console.log('🎪 Проекты...');
  for (const project of projects) {
    transaction.createOrReplace(project);
  }

  // Тур
  console.log('🎤 Тур...');
  transaction.createOrReplace(tour);

  // Настройки
  console.log('⚙️  Настройки сайта...');
  transaction.createOrReplace(siteSettings);

  // Выполняем
  try {
    const result = await transaction.commit();
    console.log('\n✅ Загрузка завершена!');
    console.log(`   Создано/обновлено документов: ${result.documentIds?.length || 'N/A'}`);
  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    process.exit(1);
  }
}

seed();


