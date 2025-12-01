import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoAlbum',
  title: 'Видеоальбом',
  type: 'document',
  icon: () => '🎬',
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
      description: 'Видео из избранных альбомов показываются в блоке «Избранное»',
      initialValue: false,
    }),
    defineField({
      name: 'videos',
      title: 'Видео',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          title: 'Видео',
          fields: [
            defineField({
              name: 'title',
              title: 'Название видео',
              type: 'object',
              fields: [
                {name: 'ru', title: 'RU', type: 'string'},
                {name: 'en', title: 'EN', type: 'string'},
                {name: 'cn', title: 'CN', type: 'string'},
              ],
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL видео',
              type: 'url',
              description: 'YouTube, VK или другой embed URL',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Превью',
              type: 'image',
              description: 'Если не указано, будет использоваться превью из YouTube',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'duration',
              title: 'Длительность',
              type: 'string',
              description: 'Например: 4:32 или 1:23:45',
            }),
          ],
          preview: {
            select: {
              title: 'title.ru',
              url: 'url',
              media: 'thumbnail',
              duration: 'duration',
            },
            prepare({title, url, media, duration}) {
              return {
                title: title || 'Без названия',
                subtitle: duration ? `${duration} · ${url}` : url,
                media,
              }
            },
          },
        },
      ],
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
      date: 'date',
      isFeatured: 'isFeatured',
      firstVideo: 'videos.0.thumbnail',
    },
    prepare({title, date, isFeatured, firstVideo}) {
      const star = isFeatured ? '⭐ ' : '';
      return {
        title: `${star}${title || 'Без названия'}`,
        subtitle: date ? `🎬 ${date}` : '🎬 Видеоальбом',
        media: firstVideo,
      }
    },
  },
})

