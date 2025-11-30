import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {teamRoles} from './person'

export default defineType({
  name: 'teamRoleOrder',
  title: 'Порядок ролей команды',
  type: 'document',
  fields: [
    defineField({
      name: 'roleKey',
      title: 'Роль',
      type: 'string',
      options: {
        list: teamRoles,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Отображаемое название',
      type: 'string',
      description: 'Можно изменить название для отображения на сайте',
    }),
    orderRankField({type: 'teamRoleOrder'}),
  ],
  preview: {
    select: {
      roleKey: 'roleKey',
      displayName: 'displayName',
    },
    prepare({roleKey, displayName}) {
      const roleIcons: Record<string, string> = {
        light: '💡',
        media: '🎨',
        photo: '📷',
        video: '🎬',
        sound: '🎛️',
        scenography: '🎭',
        administration: '👔',
      }
      const roleNames: Record<string, string> = {
        light: 'Свет',
        media: 'Медиа',
        photo: 'Фото',
        video: 'Видео',
        sound: 'Звукорежиссура',
        scenography: 'Сценография',
        administration: 'Администрация',
      }
      const icon = roleIcons[roleKey] || '👥'
      const name = displayName || roleNames[roleKey] || roleKey
      return {
        title: `${icon} ${name}`,
      }
    },
  },
  orderings: [
    orderRankOrdering,
  ],
})






