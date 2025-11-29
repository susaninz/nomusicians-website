import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // для продакшена — быстрее
  // Для записи нужен токен:
  // token: import.meta.env.SANITY_API_TOKEN,
});

// Для генерации URL изображений
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Типы
export interface SanityVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: any;
  order: number;
}

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
  category: 'musician' | 'family' | 'collaborator';
  role?: string;
  instruments?: string;
  photo?: any;
  bio?: string;
  description?: string;
  projects?: string[];
  links?: Array<{
    type: 'telegram' | 'youtube' | 'website' | 'banned';
    url?: string;
    label?: string;
  }>;
  order: number;
}

export interface SanityProject {
  _id: string;
  slug: { current: string };
  title: { ru: string; en: string; cn: string };
  year: string;
  image?: any;
  hasPage: boolean;
  description: { ru: string; en: string; cn: string };
  participants?: SanityPerson[];
  gallery?: Array<{ asset: any; caption?: string }>;
  videos?: Array<{ title: string; url?: string; file?: any }>;
  order: number;
}

export interface SanityTour {
  _id: string;
  title: string;
  description: { ru: string; en: string; cn: string };
  isTour: boolean;
  events: Array<{
    date: { ru: string; en: string; cn: string };
    time: string;
    city: { ru: string; en: string; cn: string };
    venue?: string;
    ticketUrl?: string;
  }>;
  isPast: boolean;
  isActive: boolean;
}

// Запросы (GROQ)
export const queries = {
  videos: `*[_type == "video"] | order(order asc)`,
  
  releases: `*[_type == "release"] | order(order asc)`,
  releasesByCategory: (category: string) => 
    `*[_type == "release" && category == "${category}"] | order(order asc)`,
  
  people: `*[_type == "person"] | order(order asc)`,
  peopleByCategory: (category: string) => 
    `*[_type == "person" && category == "${category}"] | order(order asc)`,
  
  projects: `*[_type == "project"] | order(order asc)`,
  projectBySlug: (slug: string) => 
    `*[_type == "project" && slug.current == "${slug}"][0]{
      ...,
      participants[]->{...}
    }`,
  
  activeTour: `*[_type == "tour" && isActive == true][0]`,
  
  siteSettings: `*[_type == "siteSettings"][0]`,
};

// Функции для получения данных
export async function getVideos(): Promise<SanityVideo[]> {
  return client.fetch(queries.videos);
}

export async function getReleases(): Promise<SanityRelease[]> {
  return client.fetch(queries.releases);
}

export async function getPeople(): Promise<SanityPerson[]> {
  return client.fetch(queries.people);
}

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(queries.projects);
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return client.fetch(queries.projectBySlug(slug));
}

export async function getActiveTour(): Promise<SanityTour | null> {
  return client.fetch(queries.activeTour);
}
