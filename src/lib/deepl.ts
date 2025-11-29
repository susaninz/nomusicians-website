/**
 * DeepL API интеграция для автоматических переводов
 * API Key: BTcoyWV3vOPT0Gk5 (Free plan)
 */

const DEEPL_API_KEY = '3e9634f6-0951-45a9-8469-65fb2a448c23:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export type DeepLLang = 'RU' | 'EN' | 'ZH'; // ZH для китайского

interface TranslateOptions {
  text: string;
  sourceLang?: DeepLLang;
  targetLang: DeepLLang;
}

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

/**
 * Перевод текста через DeepL API
 */
export async function translate({ text, sourceLang, targetLang }: TranslateOptions): Promise<string> {
  if (!text || text.trim() === '') return '';
  
  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    text: text,
    target_lang: targetLang,
  });
  
  if (sourceLang) {
    params.append('source_lang', sourceLang);
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${error}`);
    }

    const data: DeepLResponse = await response.json();
    return data.translations[0]?.text || '';
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

/**
 * Перевод текста на все языки сразу
 */
export async function translateToAll(
  text: string, 
  sourceLang: DeepLLang = 'RU'
): Promise<{ ru: string; en: string; cn: string }> {
  const targetLangs: DeepLLang[] = ['RU', 'EN', 'ZH'];
  const results: { ru: string; en: string; cn: string } = { ru: '', en: '', cn: '' };
  
  for (const lang of targetLangs) {
    if (lang === sourceLang) {
      // Исходный язык — просто копируем
      const key = lang === 'RU' ? 'ru' : lang === 'EN' ? 'en' : 'cn';
      results[key] = text;
    } else {
      const translated = await translate({ text, sourceLang, targetLang: lang });
      const key = lang === 'RU' ? 'ru' : lang === 'EN' ? 'en' : 'cn';
      results[key] = translated;
    }
  }
  
  return results;
}

/**
 * Проверка доступного лимита DeepL
 */
export async function getUsage(): Promise<{ character_count: number; character_limit: number }> {
  const response = await fetch('https://api-free.deepl.com/v2/usage', {
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status}`);
  }
  
  return response.json();
}

