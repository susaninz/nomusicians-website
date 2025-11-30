import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

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
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Дата релиза',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
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
      name: 'additionalCovers',
      title: 'Дополнительные обложки (Side B, фото винила)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Описание (RU)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Описание (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionCn',
      title: 'Описание (CN)',
      type: 'text',
      rows: 4,
    }),
    // Треклист
    defineField({
      name: 'tracklist',
      title: 'Треклист',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', title: '№', type: 'number'},
            {name: 'title', title: 'Название трека', type: 'string'},
            {name: 'duration', title: 'Длительность', type: 'string', description: 'Например: 4:32'},
          ],
          preview: {
            select: {
              number: 'number',
              title: 'title',
              duration: 'duration',
            },
            prepare({number, title, duration}) {
              return {
                title: `${number}. ${title}`,
                subtitle: duration,
              }
            },
          },
        },
      ],
    }),
    // Credits
    defineField({
      name: 'credits',
      title: 'Участники записи',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'role', title: 'Роль', type: 'string', description: 'Piano, Synthesizers, Sound Engineer...'},
            {name: 'name', title: 'Имя', type: 'string'},
          ],
          preview: {
            select: {
              role: 'role',
              name: 'name',
            },
            prepare({role, name}) {
              return {
                title: name,
                subtitle: role,
              }
            },
          },
        },
      ],
    }),
    // Стриминг ссылки
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url',
    }),
    defineField({
      name: 'yandexMusicUrl',
      title: 'Яндекс Музыка URL',
      type: 'url',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeMusicUrl',
      title: 'YouTube Music URL',
      type: 'url',
    }),
    defineField({
      name: 'deezerUrl',
      title: 'Deezer URL',
      type: 'url',
    }),
    defineField({
      name: 'tidalUrl',
      title: 'Tidal URL',
      type: 'url',
    }),
    defineField({
      name: 'artist',
      title: 'Артист',
      type: 'string',
      description: 'Основной исполнитель (по умолчанию Nomusicians)',
    }),
    defineField({
      name: 'label',
      title: 'Лейбл',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({type: 'release'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'cover',
    },
  },
  orderings: [
    orderRankOrdering,
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

