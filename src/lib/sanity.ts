import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // отключено для dev (CDN кэширует данные)
  // Для записи нужен токен:
  // token: import.meta.env.SANITY_API_TOKEN,
});

// Для генерации URL изображений
const builder = createImageUrlBuilder({
  projectId: '9ejs3m2v',
  dataset: 'production',
});

export function urlFor(source: any) {
  return builder.image(source);
}

// Типы
// SanityVideo удалён — используем SanityVideoAlbum

export interface SanityRelease {
  _id: string;
  title: string;
  year: string;
  category: 'live' | 'studio' | 'collabs';
  cover: any;
  soundcloudUrl: string;
  artist?: string;
  label?: string;
  order: number;
}

export interface SanityPerson {
  _id: string;
  name: string;
  slug: { current: string };
  // Новые поля
  personType: 'musician' | 'team';
  musicianCategory?: 'nomusicians' | 'family';
  teamRole?: 'light' | 'media' | 'photo' | 'video' | 'sound' | 'scenography' | 'administration';
  showInAbout: boolean;
  // Отображение
  role?: string;
  instruments?: string;
  photo?: any;
  bio?: string;
  links?: Array<{
    type: 'telegram' | 'youtube' | 'website' | 'instagram';
    url?: string;
    label?: string;
  }>;
  // Устаревшие (для обратной совместимости)
  category?: 'musician' | 'family' | 'collaborator';
  description?: string;
  projects?: string[];
  order: number;
  orderRank?: string;
}

export interface SanityTeamRoleOrder {
  _id: string;
  roleKey: string;
  displayName?: string;
  orderRank?: string;
}

export interface SanityProject {
  _id: string;
  slug: { current: string };
  title: { ru: string; en: string; cn: string };
  year: string;
  image?: any;
  hasPage: boolean;
  description: { ru: string; en: string; cn: string };
  // Поля страницы
  heroImage?: any;
  subtitle?: { ru: string; en: string; cn: string };
  fullDescription?: { ru: any[]; en: any[]; cn: any[] }; // Portable Text
  // Новая архитектура: альбомы
  photoAlbums?: SanityPhotoAlbum[];
  videoAlbums?: SanityVideoAlbum[];
  // Устаревшие поля (для обратной совместимости)
  gallery?: Array<{ _key: string; asset: any; caption?: string }>;
  videos?: Array<{ _key: string; title: string; youtubeUrl?: string; localFile?: any }>;
  participants?: Array<{
    _key: string;
    role: string;
    people: SanityPerson[];
    andOthers?: boolean;
  }>;
  socials?: Array<{ _key: string; type: string; url?: string; label?: string }>;
  presentationUrl?: string;
  order: number;
}

export interface SanityEvent {
  _id: string;
  title: { ru: string; en: string; cn: string };
  eventType: 'concert' | 'release' | 'news';
  description?: { ru: string; en: string; cn: string };
  date: string;
  time?: string;
  venue?: string;
  city?: { ru: string; en: string; cn: string };
  buttonText?: { ru: string; en: string; cn: string };
  url?: string;
  linkedRelease?: SanityRelease;
  isFuture: boolean;
  showOnHome: boolean;
  isActive: boolean;
}

export interface SanityPhotoAlbum {
  _id: string;
  title: { ru: string; en: string; cn: string };
  slug: { current: string };
  description?: { ru: string; en: string; cn: string };
  date?: string;
  isFeatured: boolean;
  photos: Array<{
    _key: string;
    asset: any;
    caption?: { ru: string; en: string; cn: string };
  }>;
  showInMedia: boolean;
}

export interface SanityVideoAlbum {
  _id: string;
  title: { ru: string; en: string; cn: string };
  slug: { current: string };
  description?: { ru: string; en: string; cn: string };
  date?: string;
  isFeatured: boolean;
  videos: Array<{
    _key: string;
    title: { ru: string; en: string; cn: string };
    url: string;
    thumbnail?: any;
    duration?: string;
  }>;
  showInMedia: boolean;
}

// Роли команды с названиями
export const teamRoleNames: Record<string, { ru: string; en: string; cn: string }> = {
  light: { ru: 'Свет', en: 'Lighting', cn: '灯光' },
  media: { ru: 'Медиа', en: 'Media', cn: '媒体' },
  photo: { ru: 'Фото', en: 'Photo', cn: '摄影' },
  video: { ru: 'Видео', en: 'Video', cn: '视频' },
  sound: { ru: 'Звукорежиссура', en: 'Sound Engineering', cn: '音响' },
  scenography: { ru: 'Сценография', en: 'Scenography', cn: '舞台设计' },
  administration: { ru: 'Администрация', en: 'Administration', cn: '管理' },
};

// Запросы (GROQ)
export const queries = {
  // video удалён — используем videoAlbums
  
  releases: `*[_type == "release"] | order(orderRank asc, order asc)`,
  releasesByCategory: (category: string) => 
    `*[_type == "release" && category == "${category}"] | order(orderRank asc, order asc)`,
  
  // Все люди
  people: `*[_type == "person"] | order(orderRank asc, order asc)`,
  
  // Люди для страницы "О нас" (с showInAbout == true)
  peopleForAbout: `*[_type == "person" && showInAbout == true] | order(orderRank asc, order asc)`,
  
  // Музыканты по подкатегориям
  musicians: `*[_type == "person" && personType == "musician" && showInAbout == true] | order(orderRank asc, order asc)`,
  nomusicians: `*[_type == "person" && personType == "musician" && musicianCategory == "nomusicians" && showInAbout == true] | order(orderRank asc, order asc)`,
  family: `*[_type == "person" && personType == "musician" && musicianCategory == "family" && showInAbout == true] | order(orderRank asc, order asc)`,
  
  // Команда по ролям
  teamByRole: (role: string) => 
    `*[_type == "person" && personType == "team" && teamRole == "${role}" && showInAbout == true] | order(orderRank asc, order asc)`,
  
  // Все команда
  team: `*[_type == "person" && personType == "team" && showInAbout == true] | order(orderRank asc, order asc)`,
  
  // Порядок ролей команды
  teamRoleOrder: `*[_type == "teamRoleOrder"] | order(orderRank asc)`,
  
  // Устаревшее (для обратной совместимости)
  peopleByCategory: (category: string) => 
    `*[_type == "person" && category == "${category}"] | order(orderRank asc, order asc)`,
  
  projects: `*[_type == "project"] | order(orderRank asc, order asc)`,
  projectBySlug: (slug: string) => 
    `*[_type == "project" && slug.current == "${slug}"][0]{
      ...,
      photoAlbums[]->{
        _id, title, slug, description, date, isFeatured,
        photos[]{_key, caption, asset->}
      },
      videoAlbums[]->{
        _id, title, slug, description, date, isFeatured,
        videos[]{_key, title, url, thumbnail, duration}
      },
      gallery[]{_key, caption, asset->},
      videos[]{_key, title, youtubeUrl, localFile},
      participants[]{
        _key,
        role,
        andOthers,
        people[]->{_id, name, slug, role, photo}
      },
      socials[]{_key, type, url, label}
    }`,
  
  // События
  events: `*[_type == "event" && isActive == true] | order(date desc)`,
  eventsForHome: `*[_type == "event" && isActive == true && showOnHome == true] | order(isFuture desc, date desc)[0...10]`,
  futureEvents: `*[_type == "event" && isActive == true && isFuture == true] | order(date asc)`,
  pastEvents: `*[_type == "event" && isActive == true && isFuture == false] | order(date desc)`,
  eventsByType: (type: string) => 
    `*[_type == "event" && isActive == true && eventType == "${type}"] | order(date desc)`,
  
  siteSettings: `*[_type == "siteSettings"][0]`,
  
  // Фотоальбомы (showInMedia для списка альбомов)
  // Фильтруем только фото с реальным asset (исключаем пустые записи)
  photoAlbums: `*[_type == "photoAlbum" && showInMedia == true] | order(date desc) {
    _id, title, slug, description, date, isFeatured, showInMedia,
    photos[defined(asset)]{_key, caption, asset->}
  }`,
  // Избранные альбомы — показываем независимо от showInMedia
  // Фильтруем только фото с реальным asset
  featuredPhotoAlbums: `*[_type == "photoAlbum" && isFeatured == true] | order(date desc) {
    _id, title, slug, description, date, isFeatured, showInMedia,
    photos[defined(asset)]{_key, caption, asset->}
  }`,
  
  // Видеоальбомы (showInMedia для списка альбомов)
  videoAlbums: `*[_type == "videoAlbum" && showInMedia == true] | order(date desc) {
    _id, title, slug, description, date, isFeatured, showInMedia,
    videos[]{_key, title, url, thumbnail, duration}
  }`,
  // Избранные видеоальбомы — показываем независимо от showInMedia
  featuredVideoAlbums: `*[_type == "videoAlbum" && isFeatured == true] | order(date desc) {
    _id, title, slug, description, date, isFeatured, showInMedia,
    videos[]{_key, title, url, thumbnail, duration}
  }`,
};

// Функции для получения данных
// getVideos, getVideoForHome, getVideosForWatch удалены — используем альбомы

export async function getReleases(): Promise<SanityRelease[]> {
  return client.fetch(queries.releases);
}

export async function getPeople(): Promise<SanityPerson[]> {
  return client.fetch(queries.people);
}

export async function getPeopleForAbout(): Promise<SanityPerson[]> {
  return client.fetch(queries.peopleForAbout);
}

export async function getNomusicians(): Promise<SanityPerson[]> {
  return client.fetch(queries.nomusicians);
}

export async function getFamily(): Promise<SanityPerson[]> {
  return client.fetch(queries.family);
}

export async function getTeam(): Promise<SanityPerson[]> {
  return client.fetch(queries.team);
}

export async function getTeamByRole(role: string): Promise<SanityPerson[]> {
  return client.fetch(queries.teamByRole(role));
}

export async function getTeamRoleOrder(): Promise<SanityTeamRoleOrder[]> {
  return client.fetch(queries.teamRoleOrder);
}

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(queries.projects);
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return client.fetch(queries.projectBySlug(slug));
}

export async function getEvents(): Promise<SanityEvent[]> {
  return client.fetch(queries.events);
}

export async function getEventsForHome(): Promise<SanityEvent[]> {
  return client.fetch(queries.eventsForHome);
}

export async function getFutureEvents(): Promise<SanityEvent[]> {
  return client.fetch(queries.futureEvents);
}

export async function getPastEvents(): Promise<SanityEvent[]> {
  return client.fetch(queries.pastEvents);
}

export async function getEventsByType(type: string): Promise<SanityEvent[]> {
  return client.fetch(queries.eventsByType(type));
}

// Фотоальбомы
export async function getPhotoAlbums(): Promise<SanityPhotoAlbum[]> {
  return client.fetch(queries.photoAlbums);
}

export async function getFeaturedPhotoAlbums(): Promise<SanityPhotoAlbum[]> {
  return client.fetch(queries.featuredPhotoAlbums);
}

// Видеоальбомы
export async function getVideoAlbums(): Promise<SanityVideoAlbum[]> {
  return client.fetch(queries.videoAlbums);
}

export async function getFeaturedVideoAlbums(): Promise<SanityVideoAlbum[]> {
  return client.fetch(queries.featuredVideoAlbums);
}
