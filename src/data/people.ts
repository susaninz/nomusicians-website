// Единый источник данных о людях
// Используется на /people и в проектах

export type PersonLink = {
  type: 'telegram' | 'youtube' | 'website' | 'handle' | 'instagram';
  url?: string;
  label: string;
};

export type PersonCategory = 'musician' | 'family' | 'collaborator';

export interface Person {
  id: string;
  name: string;
  role: string;
  category: PersonCategory;
  instruments?: string;
  description?: string;
  photo: string;
  bio?: string;
  projects?: string[];
  links: PersonLink[];
}

// Все люди в одном массиве
export const people: Person[] = [
  // ═══════════════════════════════════════════════════════════
  // MUSICIANS (core team)
  // ═══════════════════════════════════════════════════════════
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
      { type: 'instagram', url: 'https://instagram.com/sergeyra', label: '@sergeyra' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/maksimkotnov', label: '@maksimkotnov' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/susaninz', label: '@susaninz' },
    ],
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
  },

  // ═══════════════════════════════════════════════════════════
  // NOMUSICIANS FAMILY (расширенный состав)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'shcherbina',
    name: 'Алёна Щербина',
    role: 'Музыкант',
    category: 'family',
    instruments: 'Вокал',
    photo: '/people/alena.jpg',
    bio: 'Вокалистка с уникальным тембром, участница концертных программ.',
    links: [
      { type: 'instagram', url: 'https://instagram.com/alenascherbina', label: '@alenascherbina' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/alvorontsov', label: '@alvorontsov' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/kumihodreams', label: '@kumihodreams' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/dmitresser', label: '@dmitresser' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // COLLABORATORS (те, кто делает музыку возможной)
  // ═══════════════════════════════════════════════════════════
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
      { type: 'instagram', url: 'https://instagram.com/vadbioman', label: '@vadbioman' },
    ],
  },
  {
    id: 'dansury',
    name: 'Яна Дансури',
    role: 'Медиахудожник',
    category: 'collaborator',
    description: 'VJ и визуальный художник, создающая иммерсивные пространства.',
    photo: '/people/dansury.jpg',
    projects: [],
    links: [
      { type: 'telegram', url: 'https://t.me/no_illusions', label: 'Telegram' },
      { type: 'instagram', url: 'https://instagram.com/dansury.vj', label: '@dansury.vj' },
    ],
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
      { type: 'instagram', url: 'https://instagram.com/aleksandr_samulekin', label: '@aleksandr_samulekin' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

/** Получить человека по id */
export function getPerson(id: string): Person | undefined {
  return people.find(p => p.id === id);
}

/** Получить несколько людей по массиву id */
export function getPeople(ids: string[]): Person[] {
  return ids.map(id => getPerson(id)).filter((p): p is Person => p !== undefined);
}

/** Получить всех музыкантов (core team) */
export function getMusicians(): Person[] {
  return people.filter(p => p.category === 'musician');
}

/** Получить всех из Family */
export function getFamily(): Person[] {
  return people.filter(p => p.category === 'family');
}

/** Получить всех коллабораторов */
export function getCollaborators(): Person[] {
  return people.filter(p => p.category === 'collaborator');
}

/** Helper для иконок */
export function getLinkIcon(type: PersonLink['type']): string {
  switch(type) {
    case 'telegram': return '✈';
    case 'youtube': return '▶';
    case 'website': return '◎';
    case 'handle': return '';
    case 'instagram': return 'IG';
    default: return '→';
  }
}

