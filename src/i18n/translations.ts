export const languages = {
    ru: 'Русский',
    en: 'English',
    cn: '中文',
};

export const defaultLang = 'ru';

export const translations = {
    ru: {
        // Navigation
        'nav.home': 'Главная',

        // Hero
        'hero.tagline': 'Электроника и неоклассика',

        // Concert
        'concert.upcoming': 'Ближайшее событие',
        'concert.recent': 'Прошедшее событие',
        'concert.tickets': 'Купить билеты',

        // About
        'about.title': 'О проекте',
        'about.p1': '<strong>Nomusicians</strong> — это музыка, в которой академическое образование не препятствует свободе, а технологии не заслоняют человека.',
        'about.p2': 'Проект объединяет музыкантов с разным бэкграундом: классическое образование, джаз, электронная музыка. На сцене — фортепиано, скрипка, флюгельгорн, барабаны, аналоговые синтезаторы и драм-машины. Всё это сплетается в живую импровизацию, где каждое выступление — уникальное путешествие.',
        'about.p3': 'Мы называем это <em>classitronics</em> — подход, где звуковая палитра развивается как пейзаж за окном поезда. Атмосферная электроника, тяготеющая к камерной музыке и кинематографической выразительности.',
        'about.p4': 'Концерты часто проходят в иммерсивных пространствах — планетариях, куполах — в сопровождении визуального искусства и медиаарта.',

        // Listen
        'listen.title': 'Слушать',

        // Watch
        'watch.title': 'Видео',

        // Merch
        'merch.title': 'Мерч',
        'merch.soon': 'Скоро в продаже',
        'merch.notify': 'Сообщить о поступлении',

        // Contact
        'contact.title': 'Контакты',
        'contact.booking': 'Букинг и сотрудничество',
        'contact.presskit': 'Скачать пресс-кит',

        // Footer
        'footer.rights': '© 2025 Nomusicians. Все права защищены.',
    },

    en: {
        // Navigation
        'nav.home': 'Home',

        // Hero
        'hero.tagline': 'Electronic & Neoclassical',

        // Concert
        'concert.upcoming': 'Upcoming Event',
        'concert.recent': 'Recent Event',
        'concert.tickets': 'Get Tickets',

        // About
        'about.title': 'About',
        'about.p1': '<strong>Nomusicians</strong> is music where academic education doesn\'t hinder freedom, and technology doesn\'t overshadow the human.',
        'about.p2': 'The project brings together musicians with diverse backgrounds: classical education, jazz, electronic music. On stage — piano, violin, flugelhorn, drums, analog synthesizers and drum machines. All of this weaves into live improvisation, where each performance is a unique journey.',
        'about.p3': 'We call it <em>classitronics</em> — an approach where the sonic palette evolves like a landscape seen through a train window. Atmospheric electronics gravitating towards chamber music and cinematic expressiveness.',
        'about.p4': 'Concerts often take place in immersive spaces — planetariums, domes — accompanied by visual art and media art.',

        // Listen
        'listen.title': 'Listen',

        // Watch
        'watch.title': 'Watch',

        // Merch
        'merch.title': 'Merch',
        'merch.soon': 'Coming Soon',
        'merch.notify': 'Notify Me',

        // Contact
        'contact.title': 'Contact',
        'contact.booking': 'Booking & Collaboration',
        'contact.presskit': 'Download Press Kit',

        // Footer
        'footer.rights': '© 2025 Nomusicians. All rights reserved.',
    },

    cn: {
        // Navigation
        'nav.home': '首页',

        // Hero
        'hero.tagline': '电子与新古典音乐',

        // Concert
        'concert.upcoming': '即将举行',
        'concert.recent': '近期活动',
        'concert.tickets': '购买门票',

        // About
        'about.title': '关于我们',
        'about.p1': '<strong>Nomusicians</strong> 是一种音乐，学术教育不会阻碍自由，技术也不会掩盖人性。',
        'about.p2': '该项目汇集了具有不同背景的音乐家：古典教育、爵士乐、电子音乐。舞台上有钢琴、小提琴、翼号、鼓、模拟合成器和鼓机。所有这些都融入现场即兴演奏，每场演出都是一次独特的旅程。',
        'about.p3': '我们称之为 <em>classitronics</em> — 一种方法，声音调色板像火车窗外的风景一样演变。倾向于室内乐和电影表现力的氛围电子音乐。',
        'about.p4': '音乐会通常在沉浸式空间举行——天文馆、穹顶——伴随着视觉艺术和媒体艺术。',

        // Listen
        'listen.title': '聆听',

        // Watch
        'watch.title': '视频',

        // Merch
        'merch.title': '周边商品',
        'merch.soon': '即将推出',
        'merch.notify': '通知我',

        // Contact
        'contact.title': '联系方式',
        'contact.booking': '预订与合作',
        'contact.presskit': '下载媒体资料包',

        // Footer
        'footer.rights': '© 2025 Nomusicians. 保留所有权利。',
    },
} as const;

export type Lang = keyof typeof translations;

export function t(lang: Lang, key: keyof typeof translations['ru']): string {
    return translations[lang][key] || translations.ru[key] || key;
}

export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split('/');
    if (lang in translations) return lang as Lang;
    return defaultLang;
}

