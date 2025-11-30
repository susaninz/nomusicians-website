import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Событие',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Тип события',
      type: 'string',
      options: {
        list: [
          {title: 'Концерт', value: 'concert'},
          {title: 'Релиз', value: 'release'},
          {title: 'Новость', value: 'news'},
        ],
        layout: 'radio',
      },
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
      name: 'date',
      title: 'Дата',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Время (для концертов)',
      type: 'string',
      description: 'Например: 19:30',
      hidden: ({document}) => document?.eventType !== 'concert',
    }),
    defineField({
      name: 'venue',
      title: 'Площадка (для концертов)',
      type: 'string',
      description: 'Например: Beijing Concert Hall',
      hidden: ({document}) => document?.eventType !== 'concert',
    }),
    defineField({
      name: 'city',
      title: 'Город (для концертов)',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
      hidden: ({document}) => document?.eventType !== 'concert',
    }),
    defineField({
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
      description: 'Например: Билеты, Слушать, Читать, Смотреть, Купить, Подробнее',
    }),
    defineField({
      name: 'url',
      title: 'Ссылка',
      type: 'url',
      description: 'Куда ведёт кнопка',
    }),
    defineField({
      name: 'linkedRelease',
      title: 'Связанный релиз',
      type: 'reference',
      to: [{type: 'release'}],
      hidden: ({document}) => document?.eventType !== 'release',
    }),
    defineField({
      name: 'isFuture',
      title: 'Предстоящее событие?',
      type: 'boolean',
      initialValue: false,
      description: 'Отмечено = будет в секции "Скоро" с колокольчиком',
    }),
    defineField({
      name: 'showOnHome',
      title: 'Показывать на главной?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Активно?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Дата (новые первые)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Дата (старые первые)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      subtitle: 'date',
      eventType: 'eventType',
    },
    prepare({title, subtitle, eventType}) {
      const typeLabels: Record<string, string> = {
        concert: '🎫 Концерт',
        release: '🎵 Релиз',
        news: '📰 Новость',
      }
      return {
        title: title || 'Без названия',
        subtitle: `${typeLabels[eventType] || eventType} · ${subtitle || ''}`,
      }
    },
  },
})

