import {useDocumentOperation} from 'sanity'
import {TranslateIcon} from '@sanity/icons'
import {useState} from 'react'

// Локальный прокси для обхода CORS
const PROXY_URL = 'https://deepl-proxy-production-834e.up.railway.app/translate'

type Lang = 'RU' | 'EN' | 'ZH'

async function translateText(text: string, targetLang: Lang, sourceLang: Lang = 'RU'): Promise<string> {
  if (!text || text.trim() === '') return ''
  
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      targetLang: targetLang,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepL error: ${response.status}`)
  }

  const data = await response.json()
  return data.translatedText || ''
}

async function translateField(
  field: { ru?: string; en?: string; cn?: string },
  forceOverwrite: boolean = false
): Promise<{ ru: string; en: string; cn: string }> {
  const result = { ru: field.ru || '', en: field.en || '', cn: field.cn || '' }
  
  const sourceText = field.ru || field.en || ''
  const sourceLang: Lang = field.ru ? 'RU' : 'EN'
  
  if (!sourceText) return result
  
  // Переводим EN если пусто ИЛИ если принудительная перезапись
  if ((!result.en || forceOverwrite) && sourceLang !== 'EN') {
    result.en = await translateText(sourceText, 'EN', sourceLang)
  }
  
  // Переводим CN если пусто ИЛИ если принудительная перезапись
  if (!result.cn || forceOverwrite) {
    result.cn = await translateText(sourceText, 'ZH', sourceLang)
  }
  
  return result
}

// Проверяем есть ли уже заполненные переводы
function hasExistingTranslations(doc: any): boolean {
  for (const key of Object.keys(doc)) {
    const value = doc[key]
    if (value && typeof value === 'object') {
      if (('ru' in value) && (value.en || value.cn)) {
        return true
      }
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === 'object' && hasExistingTranslations(item)) {
            return true
          }
        }
      } else if (hasExistingTranslations(value)) {
        return true
      }
    }
  }
  return false
}

// Рекурсивно находим и переводим все объекты с полями ru/en/cn
async function translateDocument(doc: any, forceOverwrite: boolean = false): Promise<any> {
  const result = { ...doc }
  
  for (const key of Object.keys(doc)) {
    const value = doc[key]
    
    if (value && typeof value === 'object') {
      // Проверяем, является ли это переводимым полем (имеет ru/en/cn)
      if ('ru' in value || 'en' in value || 'cn' in value) {
        result[key] = await translateField(value, forceOverwrite)
      } 
      // Проверяем массивы (например events в турах)
      else if (Array.isArray(value)) {
        result[key] = await Promise.all(
          value.map(async (item) => {
            if (item && typeof item === 'object') {
              return translateDocument(item, forceOverwrite)
            }
            return item
          })
        )
      }
      // Рекурсивно обрабатываем вложенные объекты
      else {
        result[key] = await translateDocument(value, forceOverwrite)
      }
    }
  }
  
  return result
}

export function TranslateAction(props: any) {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const [isTranslating, setIsTranslating] = useState(false)

  return {
    label: isTranslating ? 'Перевод...' : 'Перевести',
    icon: TranslateIcon,
    disabled: isTranslating,
    onHandle: async () => {
      const doc = props.draft || props.published
      if (!doc) {
        alert('Нет документа для перевода')
        return
      }
      
      // Проверяем есть ли уже переводы
      let forceOverwrite = false
      if (hasExistingTranslations(doc)) {
        forceOverwrite = confirm(
          'Некоторые поля уже переведены.\n\n' +
          'OK — перезаписать все переводы\n' +
          'Отмена — перевести только пустые поля'
        )
      }
      
      setIsTranslating(true)
      
      try {
        const translated = await translateDocument(doc, forceOverwrite)
        
        // Применяем изменения
        const changes: any = {}
        for (const key of Object.keys(translated)) {
          if (key.startsWith('_')) continue // Пропускаем системные поля
          if (JSON.stringify(doc[key]) !== JSON.stringify(translated[key])) {
            changes[key] = translated[key]
          }
        }
        
        if (Object.keys(changes).length > 0) {
          patch.execute([{set: changes}])
          alert('✅ Перевод завершён!')
        } else {
          alert('ℹ️ Нечего переводить')
        }
      } catch (error) {
        console.error('Translation error:', error)
        alert(`❌ Ошибка перевода: ${error}`)
      } finally {
        setIsTranslating(false)
      }
    },
  }
}

