/**
 * Скрипт миграции категорий людей
 * 
 * Конвертирует старые категории (musician, family, collaborator) 
 * в новые (personType + musicianCategory/teamRole)
 * 
 * Запуск: npx tsx scripts/migrate-people-categories.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9ejs3m2v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skAmmetMLS3g493UuKIzJ8HfQ8DFi5ncbjV5GnPXNk4h1YlvlC2nJXeeLBS8Au7nhqUf7W0D8NyguPcrNnNLDWyZeZzLzLUsWnIa3oTdH9RsQvG1Nrnp9keFgcy0NeFhb5CpwIDgvKRnUTutsVhJi2dNxtyDZT6B2f9GaDp8ZXFSq9j7HjgW',
});

// Маппинг коллабораторов к ролям команды
const collaboratorToTeamRole: Record<string, string> = {
  'Алексей Чой': 'light',      // Свет, визуал
  'Вадим Биоман': 'media',     // Медиахудожник
  'Яна Дансури': 'media',      // Медиахудожник
  'Александр Самулёкин': 'photo', // Фотограф
};

async function migrate() {
  console.log('🔄 Начинаю миграцию категорий людей...\n');

  // Получаем всех людей
  const people = await client.fetch(`*[_type == "person"]`);
  console.log(`📊 Найдено ${people.length} человек\n`);

  let updated = 0;
  let skipped = 0;

  for (const person of people) {
    // Пропускаем, если уже есть новые поля
    if (person.personType) {
      console.log(`⏭️  ${person.name} - уже мигрирован`);
      skipped++;
      continue;
    }

    let patch: Record<string, any> = {
      showInAbout: true, // По умолчанию показываем всех
    };

    const oldCategory = person.category;

    if (oldCategory === 'musician') {
      patch.personType = 'musician';
      patch.musicianCategory = 'nomusicians';
      console.log(`🎵 ${person.name}: musician → Nomusicians`);
    } else if (oldCategory === 'family') {
      patch.personType = 'musician';
      patch.musicianCategory = 'family';
      console.log(`👨‍👩‍👧‍👦 ${person.name}: family → Nomusicians Family`);
    } else if (oldCategory === 'collaborator') {
      patch.personType = 'team';
      
      // Определяем роль по имени
      const teamRole = collaboratorToTeamRole[person.name] || 'media';
      patch.teamRole = teamRole;
      
      // Коллабораторы по умолчанию НЕ показываются на "О нас"
      // (кроме тех, кого явно включим)
      patch.showInAbout = false;
      
      console.log(`👥 ${person.name}: collaborator → Команда (${teamRole})`);
    } else {
      console.log(`❓ ${person.name}: неизвестная категория "${oldCategory}"`);
      skipped++;
      continue;
    }

    // Применяем изменения
    await client
      .patch(person._id)
      .set(patch)
      .commit();

    updated++;
  }

  console.log(`\n✅ Миграция завершена!`);
  console.log(`   Обновлено: ${updated}`);
  console.log(`   Пропущено: ${skipped}`);
}

migrate().catch(console.error);






