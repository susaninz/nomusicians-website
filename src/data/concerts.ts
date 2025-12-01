// Централизованные данные о концертах/турах
// Переводы генерируются автоматически для каждого языка

import type { Lang } from '../i18n/translations';

export interface TourEvent {
  date: Record<Lang, string>;
  time: string;
  city: Record<Lang, string>;
  venue?: string;
  ticketUrl?: string;
}

export interface Tour {
  title: string; // Не переводится (название тура)
  description: Record<Lang, string>;
  events: TourEvent[];
}

export interface SingleConcert {
  date: Record<Lang, string>;
  time: string;
  city: Record<Lang, string>;
  venue?: string;
  description?: Record<Lang, string>;
  ticketUrl?: string;
  isPast?: boolean;
}

// Текущий тур (или null если нет)
export const currentTour: Tour | null = {
  title: 'China Tour 2026',
  description: {
    ru: 'электроника, неоклассика и минимализм',
    en: 'electronic, neoclassical & minimalism',
    cn: '电子、新古典与极简主义',
  },
  events: [
    {
      date: { ru: '1 февраля', en: 'February 1', cn: '2月1日' },
      time: '20:00',
      city: { ru: 'Пекин', en: 'Beijing', cn: '北京' },
      venue: 'Blue Note Beijing',
      ticketUrl: '#',
    },
    {
      date: { ru: '3 февраля', en: 'February 3', cn: '2月3日' },
      time: '20:00',
      city: { ru: 'Шанхай', en: 'Shanghai', cn: '上海' },
      venue: 'JZ Club',
      ticketUrl: '#',
    },
    {
      date: { ru: '5 февраля', en: 'February 5', cn: '2月5日' },
      time: '20:00',
      city: { ru: 'Гуанчжоу', en: 'Guangzhou', cn: '广州' },
      venue: 'MAO Livehouse',
      ticketUrl: '#',
    },
    {
      date: { ru: '7 февраля', en: 'February 7', cn: '2月7日' },
      time: '20:00',
      city: { ru: 'Шэньчжэнь', en: 'Shenzhen', cn: '深圳' },
      venue: 'B10 Live',
      ticketUrl: '#',
    },
    {
      date: { ru: '9 февраля', en: 'February 9', cn: '2月9日' },
      time: '20:00',
      city: { ru: 'Ханчжоу', en: 'Hangzhou', cn: '杭州' },
      venue: 'MAO Livehouse',
      ticketUrl: '#',
    },
    {
      date: { ru: '11 февраля', en: 'February 11', cn: '2月11日' },
      time: '20:00',
      city: { ru: 'Чэнду', en: 'Chengdu', cn: '成都' },
      venue: 'Little Bar',
      ticketUrl: '#',
    },
  ],
};

// Ближайший одиночный концерт (если нет тура)
export const upcomingConcert: SingleConcert | null = null;

// Хелперы для получения данных на нужном языке
export function getTourForLang(lang: Lang) {
  if (!currentTour) return null;
  
  return {
    title: currentTour.title,
    description: currentTour.description[lang],
    events: currentTour.events.map(event => ({
      date: event.date[lang],
      time: event.time,
      city: event.city[lang],
      venue: event.venue,
      ticketUrl: event.ticketUrl,
    })),
  };
}

export function getConcertForLang(lang: Lang) {
  if (!upcomingConcert) return null;
  
  return {
    date: upcomingConcert.date[lang],
    time: upcomingConcert.time,
    city: upcomingConcert.city[lang],
    venue: upcomingConcert.venue,
    description: upcomingConcert.description?.[lang],
    ticketUrl: upcomingConcert.ticketUrl,
    isPast: upcomingConcert.isPast,
  };
}


