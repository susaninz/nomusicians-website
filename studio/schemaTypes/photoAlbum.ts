import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'photoAlbum',
  title: 'Фотоальбом',
  type: 'document',
  icon: () => '📷',
  fields: [
    defineField({
      name: 'title',
      title: 'Название альбома',
      type: 'object',
      fields: [
        {name: 'ru', title: 'RU', type: 'string'},
        {name: 'en', title: 'EN', type: 'string'},
        {name: 'cn', title: 'CN', type: 'string'},
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-идентификатор',
      type: 'slug',
      options: {
        source: 'title.ru',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
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
      name: 'date',
      title: 'Дата',
      type: 'date',
      description: 'Дата альбома (для сортировки)',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Избранный альбом',
      type: 'boolean',
      description: 'Фото из избранных альбомов показываются в блоке «Избранное»',
      initialValue: false,
    }),
    defineField({
      name: 'photos',
      title: 'Фотографии',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Подпись',
              type: 'object',
              fields: [
                {name: 'ru', title: 'RU', type: 'string'},
                {name: 'en', title: 'EN', type: 'string'},
                {name: 'cn', title: 'CN', type: 'string'},
              ],
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'showInMedia',
      title: 'Показывать в разделе Медиа?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'По дате (новые сверху)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Название',
      name: 'titleAsc',
      by: [{field: 'title.ru', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.ru',
      media: 'photos.0',
      date: 'date',
      isFeatured: 'isFeatured',
    },
    prepare({title, media, date, isFeatured}) {
      const star = isFeatured ? '⭐ ' : '';
      return {
        title: `${star}${title || 'Без названия'}`,
        subtitle: date ? `📷 ${date}` : '📷 Фотоальбом',
        media,
      }
    },
  },
})

