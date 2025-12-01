import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fieldsets: [
    {name: 'basic', title: '📋 Основное (для страницы проектов)', options: {collapsible: true, collapsed: false}},
    {name: 'page', title: '📄 Отдельная страница проекта', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // === ОСНОВНОЕ (всегда видно) ===
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      fieldset: 'basic',
      options: {
        source: 'title.ru',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Название',
      type: 'object',
      fieldset: 'basic',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
    }),
    defineField({
      name: 'year',
      title: 'Период',
      type: 'string',
      fieldset: 'basic',
      description: 'Например: 2022—2024',
    }),
    defineField({
      name: 'image',
      title: 'Главное изображение (для страницы проектов)',
      type: 'image',
      fieldset: 'basic',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание (для страницы проектов)',
      type: 'object',
      fieldset: 'basic',
      fields: [
        {name: 'ru', title: 'RU', type: 'text', rows: 2},
        {name: 'en', title: 'EN', type: 'text', rows: 2},
        {name: 'cn', title: 'CN', type: 'text', rows: 2},
      ],
    }),
    defineField({
      name: 'order',
      title: 'Порядок на странице',
      type: 'number',
      fieldset: 'basic',
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({type: 'project'}),

    // === ПЕРЕКЛЮЧАТЕЛЬ ===
    defineField({
      name: 'hasPage',
      title: '🔗 Есть отдельная страница?',
      type: 'boolean',
      description: 'Включи, чтобы настроить отдельную страницу проекта',
      initialValue: false,
    }),

    // === ПОЛЯ СТРАНИЦЫ (появляются когда hasPage = true) ===
    defineField({
      name: 'heroImage',
      title: 'Hero изображение (для страницы)',
      type: 'image',
      fieldset: 'page',
      options: {hotspot: true},
      hidden: ({document}) => !document?.hasPage,
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'object',
      fieldset: 'page',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
      hidden: ({document}) => !document?.hasPage,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Полное описание',
      type: 'object',
      fieldset: 'page',
      fields: [
        {name: 'ru', title: 'RU', type: 'array', of: [{type: 'block'}]},
        {name: 'en', title: 'EN', type: 'array', of: [{type: 'block'}]},
        {name: 'cn', title: 'CN', type: 'array', of: [{type: 'block'}]},
      ],
      hidden: ({document}) => !document?.hasPage,
    }),
    // === АЛЬБОМЫ (новая архитектура) ===
    defineField({
      name: 'photoAlbums',
      title: '📷 Фотоальбомы',
      description: 'Привяжи существующие фотоальбомы к проекту',
      type: 'array',
      fieldset: 'page',
      of: [{type: 'reference', to: [{type: 'photoAlbum'}]}],
      hidden: ({document}) => !document?.hasPage,
    }),
    defineField({
      name: 'videoAlbums',
      title: '🎬 Видеоальбомы',
      description: 'Привяжи существующие видеоальбомы к проекту',
      type: 'array',
      fieldset: 'page',
      of: [{type: 'reference', to: [{type: 'videoAlbum'}]}],
      hidden: ({document}) => !document?.hasPage,
    }),

    defineField({
      name: 'participants',
      title: 'Участники',
      description: 'Выбери людей из справочника',
      type: 'array',
      fieldset: 'page',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'role', title: 'Роль', type: 'string', description: 'Например: Музыка, Визуал, Фото'},
            {name: 'people', title: 'Люди', type: 'array', of: [{type: 'reference', to: [{type: 'person'}]}]},
            {name: 'andOthers', title: 'и другие', type: 'boolean', initialValue: false},
          ],
        },
      ],
      hidden: ({document}) => !document?.hasPage,
    }),
    defineField({
      name: 'socials',
      title: 'Соцсети проекта',
      type: 'array',
      fieldset: 'page',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'type', title: 'Тип', type: 'string', options: {list: [
              {title: 'Telegram', value: 'telegram'},
              {title: 'Instagram', value: 'instagram'},
              {title: 'Сайт', value: 'website'},
            ]}},
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'label', title: 'Подпись (@username)', type: 'string'},
          ],
        },
      ],
      hidden: ({document}) => !document?.hasPage,
    }),
    defineField({
      name: 'presentationUrl',
      title: 'Ссылка на презентацию',
      type: 'url',
      fieldset: 'page',
      description: 'Google Slides или PDF',
      hidden: ({document}) => !document?.hasPage,
    }),
  ],
  preview: {
    select: {
      title: 'title.ru',
      subtitle: 'year',
      media: 'image',
      hasPage: 'hasPage',
    },
    prepare({title, subtitle, media, hasPage}) {
      return {
        title: `${hasPage ? '📄 ' : ''}${title || 'Без названия'}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
