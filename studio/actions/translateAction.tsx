import {useDocumentOperation} from 'sanity'
import {TranslateIcon} from '@sanity/icons'
import {useState} from 'react'

// Локальный прокси для обхода CORS
const PROXY_URL = 'http://localhost:3334/translate'

type Lang = 'RU' | 'EN' | 'ZH'

async function translateText(text: string, targetLang: Lang, sourceLang: Lang = 'RU'): Promise<string> {
  if (!text || text.trim() === '') return ''
  
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      target_lang: targetLang,
      source_lang: sourceLang,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepL error: ${response.status}`)
  }

  const data = await response.json()
  return data.translations[0]?.text || ''
}

async function translateField(field: { ru?: string; en?: string; cn?: string }): Promise<{ ru: string; en: string; cn: string }> {
  const result = { ru: field.ru || '', en: field.en || '', cn: field.cn || '' }
  
  const sourceText = field.ru || field.en || ''
  const sourceLang: Lang = field.ru ? 'RU' : 'EN'
  
  if (!sourceText) return result
  
  if (!result.en && sourceLang !== 'EN') {
    result.en = await translateText(sourceText, 'EN', sourceLang)
  }
  
  if (!result.cn) {
    result.cn = await translateText(sourceText, 'ZH', sourceLang)
  }
  
  return result
}

// Рекурсивно находим и переводим все объекты с полями ru/en/cn
async function translateDocument(doc: any): Promise<any> {
  const result = { ...doc }
  
  for (const key of Object.keys(doc)) {
    const value = doc[key]
    
    if (value && typeof value === 'object') {
      // Проверяем, является ли это переводимым полем (имеет ru/en/cn)
      if ('ru' in value || 'en' in value || 'cn' in value) {
        result[key] = await translateField(value)
      } 
      // Проверяем массивы (например events в турах)
      else if (Array.isArray(value)) {
        result[key] = await Promise.all(
          value.map(async (item) => {
            if (item && typeof item === 'object') {
              return translateDocument(item)
            }
            return item
          })
        )
      }
      // Рекурсивно обрабатываем вложенные объекты
      else {
        result[key] = await translateDocument(value)
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
      setIsTranslating(true)
      
      try {
        const doc = props.draft || props.published
        if (!doc) {
          alert('Нет документа для перевода')
          return
        }
        
        const translated = await translateDocument(doc)
        
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
          alert('ℹ️ Все поля уже переведены')
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

