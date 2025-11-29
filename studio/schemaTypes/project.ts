import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Проект',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
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
      description: 'Например: 2022—2024',
    }),
    defineField({
      name: 'image',
      title: 'Главное изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hasPage',
      title: 'Есть отдельная страница?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'text', rows: 3},
        {name: 'en', title: 'EN', type: 'text', rows: 3},
        {name: 'cn', title: 'CN', type: 'text', rows: 3},
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Соцсети проекта',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'type', title: 'Тип', type: 'string', options: {list: ['telegram', 'instagram', 'website']}},
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'label', title: 'Подпись', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'participants',
      title: 'Участники',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'caption', title: 'Подпись', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Видео',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Название', type: 'string'},
            {name: 'url', title: 'URL (YouTube/Vimeo/mp4)', type: 'url'},
            {name: 'file', title: 'Или файл', type: 'file'},
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title.ru',
      subtitle: 'year',
      media: 'image',
    },
  },
})

