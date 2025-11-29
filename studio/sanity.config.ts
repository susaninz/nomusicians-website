import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {TranslateAction} from './actions/translateAction'

// Типы документов, которые поддерживают перевод
const translatableTypes = ['tour', 'project', 'siteSettings']

export default defineConfig({
  name: 'nomusicians',
  title: 'Nomusicians',

  projectId: '9ejs3m2v',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

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

