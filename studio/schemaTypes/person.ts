import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Человек',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Музыкант (основной состав)', value: 'musician'},
          {title: 'Nomusicians Family', value: 'family'},
          {title: 'Коллаборатор', value: 'collaborator'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Роль',
      type: 'string',
      description: 'Например: Основатель · Композитор',
    }),
    defineField({
      name: 'instruments',
      title: 'Инструменты',
      type: 'string',
      description: 'Например: Скрипка, синтезаторы, клавишные',
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Био',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Описание (для коллабораторов)',
      type: 'text',
      rows: 2,
      hidden: ({document}) => document?.category !== 'collaborator',
    }),
    defineField({
      name: 'projects',
      title: 'Проекты (для коллабораторов)',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({document}) => document?.category !== 'collaborator',
    }),
    defineField({
      name: 'links',
      title: 'Ссылки',
      type: 'array',
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
                  {title: 'Запрещёнограм', value: 'banned'},
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
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})

