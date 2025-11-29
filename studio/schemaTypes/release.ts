import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'release',
  title: 'Релиз',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Год',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Live', value: 'live'},
          {title: 'Studio', value: 'studio'},
          {title: 'Коллабы', value: 'collabs'},
        ],
        layout: 'radio',
      },
      initialValue: 'live',
    }),
    defineField({
      name: 'cover',
      title: 'Обложка',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Артист (для коллабов)',
      type: 'string',
      hidden: ({document}) => document?.category !== 'collabs',
    }),
    defineField({
      name: 'label',
      title: 'Лейбл (для коллабов)',
      type: 'string',
      hidden: ({document}) => document?.category !== 'collabs',
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
      title: 'title',
      subtitle: 'year',
      media: 'cover',
    },
  },
  orderings: [
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'По году (новые)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
})

