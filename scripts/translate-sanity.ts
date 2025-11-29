/**
 * Скрипт для автоматического перевода контента в Sanity через DeepL
 * Запуск: npx tsx scripts/translate-sanity.ts
 */

import { createClient } from '@sanity/client';

const DEEPL_API_KEY = '3e9634f6-0951-45a9-8469-65fb2a448c23:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type Lang = 'RU' | 'EN' | 'ZH';

async function translate(text: string, targetLang: Lang, sourceLang: Lang = 'RU'): Promise<string> {
  if (!text || text.trim() === '') return '';
  
  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    text: text,
    target_lang: targetLang,
    source_lang: sourceLang,
  });

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`DeepL error: ${response.status}`);
  }

  const data = await response.json();
  return data.translations[0]?.text || '';
}

async function translateField(field: { ru?: string; en?: string; cn?: string }): Promise<{ ru: string; en: string; cn: string }> {
  const result = { ru: field.ru || '', en: field.en || '', cn: field.cn || '' };
  
  // Определяем исходный язык (приоритет: RU > EN)
  const sourceText = field.ru || field.en || '';
  const sourceLang: Lang = field.ru ? 'RU' : 'EN';
  
  if (!sourceText) return result;
  
  // Переводим пустые поля
  if (!result.ru && sourceLang !== 'RU') {
    console.log(`  → Перевод на RU...`);
    result.ru = await translate(sourceText, 'RU', sourceLang);
  }
  
  if (!result.en && sourceLang !== 'EN') {
    console.log(`  → Перевод на EN...`);
    result.en = await translate(sourceText, 'EN', sourceLang);
  }
  
  if (!result.cn) {
    console.log(`  → Перевод на ZH (китайский)...`);
    result.cn = await translate(sourceText, 'ZH', sourceLang);
  }
  
  return result;
}

async function translateProjects() {
  console.log('\n📦 Переводим проекты...\n');
  
  const projects = await client.fetch(`*[_type == "project"]{_id, title, description}`);
  
  for (const project of projects) {
    console.log(`\n🎪 ${project.title?.ru || project._id}`);
    
    const updates: any = {};
    let hasUpdates = false;
    
    // Переводим title
    if (project.title?.ru && (!project.title?.en || !project.title?.cn)) {
      console.log('  Переводим title...');
      updates.title = await translateField(project.title);
      hasUpdates = true;
    }
    
    // Переводим description
    if (project.description?.ru && (!project.description?.en || !project.description?.cn)) {
      console.log('  Переводим description...');
      updates.description = await translateField(project.description);
      hasUpdates = true;
    }
    
    if (hasUpdates) {
      await client.patch(project._id).set(updates).commit();
      console.log('  ✅ Обновлено');
    } else {
      console.log('  ⏭️  Уже переведено');
    }
  }
}

async function translateTours() {
  console.log('\n🎤 Переводим туры...\n');
  
  const tours = await client.fetch(`*[_type == "tour"]{_id, title, description, events}`);
  
  for (const tour of tours) {
    console.log(`\n🎤 ${tour.title}`);
    
    const updates: any = {};
    let hasUpdates = false;
    
    // Переводим description
    if (tour.description?.ru && (!tour.description?.en || !tour.description?.cn)) {
      console.log('  Переводим description...');
      updates.description = await translateField(tour.description);
      hasUpdates = true;
    }
    
    // Переводим события
    if (tour.events && tour.events.length > 0) {
      const translatedEvents = [];
      
      for (const event of tour.events) {
        const translatedEvent = { ...event };
        
        if (event.date?.ru && (!event.date?.en || !event.date?.cn)) {
          console.log(`  Переводим дату: ${event.date.ru}...`);
          translatedEvent.date = await translateField(event.date);
          hasUpdates = true;
        }
        
        if (event.city?.ru && (!event.city?.en || !event.city?.cn)) {
          console.log(`  Переводим город: ${event.city.ru}...`);
          translatedEvent.city = await translateField(event.city);
          hasUpdates = true;
        }
        
        translatedEvents.push(translatedEvent);
      }
      
      if (hasUpdates) {
        updates.events = translatedEvents;
      }
    }
    
    if (hasUpdates) {
      await client.patch(tour._id).set(updates).commit();
      console.log('  ✅ Обновлено');
    } else {
      console.log('  ⏭️  Уже переведено');
    }
  }
}

async function checkUsage() {
  console.log('\n📊 Проверяем лимит DeepL...\n');
  
  try {
    const response = await fetch('https://api-free.deepl.com/v2/usage', {
      headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}` },
    });
    
    if (!response.ok) {
      console.log(`  ⚠️ Не удалось проверить лимит: ${response.status}`);
      return;
    }
    
    const data = await response.json();
    console.log('  Debug:', JSON.stringify(data));
    
    const used = data.character_count || 0;
    const limit = data.character_limit || 500000;
    const percent = ((used / limit) * 100).toFixed(1);
    
    console.log(`  Использовано: ${used.toLocaleString()} / ${limit.toLocaleString()} символов (${percent}%)`);
    console.log(`  Осталось: ${(limit - used).toLocaleString()} символов\n`);
  } catch (error) {
    console.log(`  ⚠️ Ошибка проверки лимита:`, error);
  }
}

async function main() {
  console.log('🌍 DeepL Auto-Translator для Sanity\n');
  console.log('=====================================');
  
  await checkUsage();
  
  await translateProjects();
  await translateTours();
  
  console.log('\n=====================================');
  console.log('✅ Перевод завершён!\n');
  
  await checkUsage();
}

main().catch(console.error);

