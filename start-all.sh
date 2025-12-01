#!/bin/bash

# Nomusicians - Запуск всех серверов
# Использование: ./start-all.sh

PROJECT_DIR="/Users/ivanslezkin/Nomusicians taplink/nomusicians-website"

echo "🎵 Nomusicians - Запуск серверов..."
echo ""

# Функция для запуска в новой вкладке терминала (macOS)
open_terminal_tab() {
    osascript -e "tell application \"Terminal\"
        do script \"cd '$PROJECT_DIR' && $1\"
    end tell"
}

# Запуск Astro (основной сайт)
echo "1️⃣  Запуск Astro (http://localhost:4321)..."
open_terminal_tab "npm run dev"

sleep 1

# Запуск Sanity Studio
echo "2️⃣  Запуск Sanity Studio (http://localhost:3333)..."
open_terminal_tab "cd studio && npm run dev"

sleep 1

# Запуск DeepL Proxy
echo "3️⃣  Запуск DeepL Proxy (http://localhost:3334)..."
open_terminal_tab "cd studio && npm run proxy"

echo ""
echo "✅ Все серверы запущены!"
echo ""
echo "📍 URL адреса:"
echo "   Сайт:    http://localhost:4321"
echo "   Админка: http://localhost:3333"
echo "   Прокси:  http://localhost:3334"
echo ""
echo "📱 Для теста на телефоне:"
echo "   $(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print "http://"$2":4321"}')"


