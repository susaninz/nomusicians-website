import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email для контактов',
      type: 'string',
    }),
    defineField({
      name: 'youtubeChannel',
      title: 'YouTube канал',
      type: 'url',
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'url',
    }),
    defineField({
      name: 'vk',
      title: 'VK',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
    defineField({
      name: 'soundcloud',
      title: 'SoundCloud',
      type: 'url',
    }),
    defineField({
      name: 'pressKitUrl',
      title: 'Ссылка на пресс-кит',
      type: 'url',
    }),
  ],
  // Singleton — только один документ
  __experimental_actions: ['update', 'publish'],
})

