// Данные о проектах
// Будут импортироваться из Sanity позже

import type { Lang } from '../i18n/translations';

export interface Project {
  id: string;
  title: string;
  year: string;
  image: string;
  hasPage: boolean;
  description: Record<Lang, string>;
}

export const projects: Project[] = [
  {
    id: 'klassika',
    title: 'Классика',
    year: '2022—2024',
    image: '/projects/klassika-hero.png',
    hasPage: true,
    description: {
      ru: 'Музыкальная программа для бёрнерских фестивалей Огонёк и Холодок. Концерты под открытым небом, импровизации и творческие встречи в атмосфере сообщества.',
      en: 'Music program for burner festivals Ogonek and Kholodok. Open-air concerts, improvisations and creative gatherings in a community atmosphere.',
      cn: '燃烧者节日Ogonek和Kholodok的音乐节目。露天音乐会、即兴创作和社区氛围中的创意聚会。',
    },
  },
  {
    id: 'lampu-bali',
    title: 'Lampu Bali',
    year: '2024',
    image: '/projects/lampu-bali.jpg',
    hasPage: false,
    description: {
      ru: 'Музыкальная резиденция на Бали. Концерты на закате в рисовых полях, джем-сессии с местными музыкантами и творческие встречи.',
      en: 'Music residency in Bali. Sunset concerts in rice fields, jam sessions with local musicians and creative gatherings.',
      cn: '巴厘岛音乐驻留。稻田日落音乐会，与当地音乐家的即兴演奏和创意聚会。',
    },
  },
  {
    id: 'qatar',
    title: 'Qatar',
    year: '2022',
    image: '/releases/qatar-22.jpg',
    hasPage: false,
    description: {
      ru: 'Выступление в Катаре на площадке Heenat Salma. Специальная программа с участием Дмитрия Скворцова.',
      en: 'Performance in Qatar at Heenat Salma venue. Special program featuring Dmitry Skvortsov.',
      cn: '在卡塔尔Heenat Salma场地的演出。德米特里·斯克沃尔佐夫参与的特别节目。',
    },
  },
  {
    id: 'portugal',
    title: 'Portugal Special',
    year: '2023',
    image: '/hero.jpg',
    hasPage: false,
    description: {
      ru: 'Двойной концерт в Лиссабоне: электроника, неоклассика и минимализм + трибьют Radiohead.',
      en: 'Double concert in Lisbon: electronics, neoclassical and minimalism + Radiohead tribute.',
      cn: '里斯本双重音乐会：电子、新古典和极简主义 + Radiohead致敬。',
    },
  },
];


