import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'
import {TranslateAction} from './actions/translateAction'

// Типы документов, которые поддерживают перевод
const translatableTypes = ['project', 'siteSettings', 'event', 'photoAlbum', 'videoAlbum']

// Роли команды для создания списков
const teamRolesList = [
  {key: 'light', title: 'Свет', icon: '💡'},
  {key: 'media', title: 'Медиа', icon: '🎨'},
  {key: 'photo', title: 'Фото', icon: '📷'},
  {key: 'video', title: 'Видео', icon: '🎬'},
  {key: 'sound', title: 'Звукорежиссура', icon: '🎛️'},
  {key: 'scenography', title: 'Сценография', icon: '🎭'},
  {key: 'administration', title: 'Администрация', icon: '👔'},
]

export default defineConfig({
  name: 'nomusicians',
  title: 'Nomusicians',

  projectId: '9ejs3m2v',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Контент')
          .items([
            // === МУЗЫКАНТЫ ===
            S.listItem()
              .title('🎵 Музыканты')
              .child(
                S.list()
                  .title('Музыканты')
                  .items([
                    orderableDocumentListDeskItem({
                      type: 'person',
                      id: 'orderable-person-nomusicians',
                      title: 'Nomusicians',
                      icon: () => '🎵',
                      filter: 'personType == "musician" && musicianCategory == "nomusicians"',
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: 'person',
                      id: 'orderable-person-family',
                      title: 'Nomusicians Family',
                      icon: () => '👨‍👩‍👧‍👦',
                      filter: 'personType == "musician" && musicianCategory == "family"',
                      S,
                      context,
                    }),
                  ])
              ),

            // === КОМАНДА ===
            S.listItem()
              .title('👥 Команда')
              .child(
                S.list()
                  .title('Команда')
                  .items([
                    // Порядок ролей
                    orderableDocumentListDeskItem({
                      type: 'teamRoleOrder',
                      id: 'orderable-team-role-order',
                      title: '⬆️⬇️ Порядок разделов',
                      icon: () => '📋',
                      S,
                      context,
                    }),
                    S.divider(),
                    // Роли команды
                    ...teamRolesList.map(role => 
                      orderableDocumentListDeskItem({
                        type: 'person',
                        id: `orderable-person-team-${role.key}`,
                        title: role.title,
                        icon: () => role.icon,
                        filter: `personType == "team" && teamRole == "${role.key}"`,
                        S,
                        context,
                      })
                    ),
                  ])
              ),

            S.divider(),

            // === КОНТЕНТ ===
            orderableDocumentListDeskItem({
              type: 'release',
              id: 'orderable-release',
              title: '💿 Релизы',
              icon: () => '💿',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'project',
              id: 'orderable-project',
              title: '🎪 Проекты',
              icon: () => '🎪',
              S,
              context,
            }),

            S.divider(),

            // === МЕДИА (альбомы) ===
            S.listItem()
              .title('📷 Фотоальбомы')
              .schemaType('photoAlbum')
              .child(
                S.documentTypeList('photoAlbum')
                  .title('Фотоальбомы')
              ),
            S.listItem()
              .title('🎬 Видеоальбомы')
              .schemaType('videoAlbum')
              .child(
                S.documentTypeList('videoAlbum')
                  .title('Видеоальбомы')
              ),

            S.divider(),

            // === СОБЫТИЯ ===
            S.listItem()
              .title('📅 События')
              .schemaType('event')
              .child(
                S.documentTypeList('event')
                  .title('События')
                  .defaultOrdering([{field: 'date', direction: 'desc'}])
              ),

            S.divider(),

            // === Настройки (singleton) ===
            S.listItem()
              .title('⚙️ Настройки сайта')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Добавляем кнопку перевода только для переводимых типов
      if (translatableTypes.includes(context.schemaType)) {
        return [...prev, TranslateAction]
      }
      return prev
    },
  },
})
