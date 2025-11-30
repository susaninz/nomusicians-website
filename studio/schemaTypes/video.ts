import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'video',
  title: 'Видео',
  type: 'document',
  fieldsets: [
    {name: 'display', title: 'Отображение', options: {collapsible: false}},
    {name: 'localization', title: 'Локализация', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    // === ОСНОВНОЕ ===
    defineField({
      name: 'title',
      title: 'Название (RU)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Название (EN)',
      type: 'string',
      fieldset: 'localization',
    }),
    defineField({
      name: 'titleCn',
      title: 'Название (CN)',
      type: 'string',
      fieldset: 'localization',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Превью (авто из YouTube)',
      type: 'image',
      description: 'Опционально. Если не указано — возьмётся из YouTube',
      options: {
        hotspot: true,
      },
    }),

    // === ОТОБРАЖЕНИЕ ===
    defineField({
      name: 'showOnHome',
      title: '🏠 Показывать на главной',
      type: 'boolean',
      fieldset: 'display',
      description: 'Только одно видео будет отображаться на главной странице',
      initialValue: false,
    }),
    defineField({
      name: 'showOnWatch',
      title: '🎬 Показывать на странице Видео (/watch)',
      type: 'boolean',
      fieldset: 'display',
      initialValue: true,
    }),

    // === СЛУЖЕБНЫЕ ===
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      initialValue: 0,
      hidden: true,
    }),
    orderRankField({type: 'video'}),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      showOnHome: 'showOnHome',
      showOnWatch: 'showOnWatch',
    },
    prepare({title, media, showOnHome, showOnWatch}) {
      const badges = [];
      if (showOnHome) badges.push('🏠');
      if (showOnWatch) badges.push('🎬');
      return {
        title: `${badges.join(' ')} ${title || 'Без названия'}`.trim(),
        media: media,
      };
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

