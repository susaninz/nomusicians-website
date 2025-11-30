import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

// Роли для команды (не музыканты)
export const teamRoles = [
  {title: 'Свет', value: 'light'},
  {title: 'Медиа', value: 'media'},
  {title: 'Фото', value: 'photo'},
  {title: 'Видео', value: 'video'},
  {title: 'Звукорежиссура', value: 'sound'},
  {title: 'Сценография', value: 'scenography'},
  {title: 'Администрация', value: 'administration'},
]

export default defineType({
  name: 'person',
  title: 'Человек',
  type: 'document',
  fieldsets: [
    {name: 'main', title: 'Основное', options: {collapsible: false}},
    {name: 'display', title: 'Отображение', options: {collapsible: true, collapsed: false}},
    {name: 'details', title: 'Детали', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    // === ОСНОВНОЕ ===
    defineField({
      name: 'name',
      title: 'Имя (RU)',
      type: 'string',
      fieldset: 'main',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Имя (EN)',
      type: 'string',
      fieldset: 'main',
    }),
    defineField({
      name: 'nameCn',
      title: 'Имя (CN)',
      type: 'string',
      fieldset: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      fieldset: 'main',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      fieldset: 'main',
      options: {
        hotspot: true,
      },
    }),

    // === КАТЕГОРИЯ ===
    defineField({
      name: 'personType',
      title: 'Тип',
      type: 'string',
      fieldset: 'main',
      options: {
        list: [
          {title: '🎵 Музыкант', value: 'musician'},
          {title: '👥 Команда', value: 'team'},
        ],
        layout: 'radio',
      },
      initialValue: 'musician',
      validation: Rule => Rule.required(),
    }),

    // Подкатегория для музыкантов
    defineField({
      name: 'musicianCategory',
      title: 'Категория музыканта',
      type: 'string',
      fieldset: 'main',
      options: {
        list: [
          {title: 'Nomusicians (основной состав)', value: 'nomusicians'},
          {title: 'Nomusicians Family', value: 'family'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => document?.personType !== 'musician',
      validation: Rule => Rule.custom((value, context) => {
        const doc = context.document as {personType?: string}
        if (doc?.personType === 'musician' && !value) {
          return 'Выберите категорию музыканта'
        }
        return true
      }),
    }),

    // Роль для команды
    defineField({
      name: 'teamRole',
      title: 'Роль в команде',
      type: 'string',
      fieldset: 'main',
      options: {
        list: teamRoles,
        layout: 'dropdown',
      },
      hidden: ({document}) => document?.personType !== 'team',
      validation: Rule => Rule.custom((value, context) => {
        const doc = context.document as {personType?: string}
        if (doc?.personType === 'team' && !value) {
          return 'Выберите роль в команде'
        }
        return true
      }),
    }),

    // === ОТОБРАЖЕНИЕ ===
    defineField({
      name: 'showInAbout',
      title: '📄 Показывать на странице "О нас"',
      type: 'boolean',
      fieldset: 'display',
      initialValue: true,
    }),

    defineField({
      name: 'role',
      title: 'Роль / Должность (RU)',
      type: 'string',
      fieldset: 'display',
      description: 'Например: Основатель · Композитор',
    }),
    defineField({
      name: 'roleEn',
      title: 'Роль / Должность (EN)',
      type: 'string',
      fieldset: 'display',
    }),
    defineField({
      name: 'roleCn',
      title: 'Роль / Должность (CN)',
      type: 'string',
      fieldset: 'display',
    }),
    defineField({
      name: 'instruments',
      title: 'Инструменты (RU)',
      type: 'string',
      fieldset: 'display',
      description: 'Например: Скрипка, синтезаторы, клавишные',
      hidden: ({document}) => document?.personType !== 'musician',
    }),
    defineField({
      name: 'instrumentsEn',
      title: 'Инструменты (EN)',
      type: 'string',
      fieldset: 'display',
      hidden: ({document}) => document?.personType !== 'musician',
    }),
    defineField({
      name: 'instrumentsCn',
      title: 'Инструменты (CN)',
      type: 'string',
      fieldset: 'display',
      hidden: ({document}) => document?.personType !== 'musician',
    }),

    // === ДЕТАЛИ ===
    defineField({
      name: 'bio',
      title: 'Био (RU)',
      type: 'text',
      fieldset: 'details',
      rows: 3,
    }),
    defineField({
      name: 'bioEn',
      title: 'Био (EN)',
      type: 'text',
      fieldset: 'details',
      rows: 3,
    }),
    defineField({
      name: 'bioCn',
      title: 'Био (CN)',
      type: 'text',
      fieldset: 'details',
      rows: 3,
    }),
    defineField({
      name: 'links',
      title: 'Ссылки',
      type: 'array',
      fieldset: 'details',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Тип',
              type: 'string',
              options: {
                list: [
                  {title: 'Telegram', value: 'telegram'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Сайт', value: 'website'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
            },
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'label', title: 'Подпись', type: 'string'},
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
            },
          },
        },
      ],
    }),

    // === СЛУЖЕБНЫЕ ===
    // Старое поле category для обратной совместимости (скрыто)
    defineField({
      name: 'category',
      title: 'Категория (устаревшее)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 0,
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Описание (устаревшее)',
      type: 'text',
      hidden: true,
    }),
    defineField({
      name: 'projects',
      title: 'Проекты (устаревшее)',
      type: 'array',
      of: [{type: 'string'}],
      hidden: true,
    }),
    orderRankField({type: 'person'}),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      personType: 'personType',
      musicianCategory: 'musicianCategory',
      teamRole: 'teamRole',
      showInAbout: 'showInAbout',
    },
    prepare({title, subtitle, media, personType, musicianCategory, teamRole, showInAbout}) {
      let icon = ''
      if (personType === 'musician') {
        icon = musicianCategory === 'nomusicians' ? '🎵' : '👨‍👩‍👧‍👦'
      } else {
        const roleIcons: Record<string, string> = {
          light: '💡',
          media: '🎨',
          photo: '📷',
          video: '🎬',
          sound: '🎛️',
          scenography: '🎭',
          administration: '👔',
        }
        icon = roleIcons[teamRole] || '👥'
      }
      const aboutIcon = showInAbout ? '' : ' 👁️‍🗨️'
      return {
        title: `${icon} ${title || 'Без имени'}${aboutIcon}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    orderRankOrdering,
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
