import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Тур / Концерт',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      description: 'Например: China Tour 2026',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
    }),
    defineField({
      name: 'isTour',
      title: 'Это тур (несколько концертов)?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'events',
      title: 'События',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Дата',
              type: 'object',
              fields: [
                {name: 'ru', title: 'RU', type: 'string'},
                {name: 'en', title: 'EN', type: 'string'},
                {name: 'cn', title: 'CN', type: 'string'},
              ],
            },
            {name: 'time', title: 'Время', type: 'string'},
            {
              name: 'city',
              title: 'Город',
              type: 'object',
              fields: [
                {name: 'ru', title: 'RU', type: 'string'},
                {name: 'en', title: 'EN', type: 'string'},
                {name: 'cn', title: 'CN', type: 'string'},
              ],
            },
            {name: 'venue', title: 'Площадка', type: 'string'},
            {name: 'ticketUrl', title: 'Ссылка на билеты', type: 'url'},
          ],
          preview: {
            select: {
              title: 'city.ru',
              subtitle: 'date.ru',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isPast',
      title: 'Прошедшее событие?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Показывать на сайте?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description.ru',
    },
  },
})

