# Current Context

Общий контекст всех проектов. Дата: 27.05.2026.

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29/tree/codex/__34
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, галактические часы, Telegram-бот, cloud sync, MCP-сервер
- **Агенты**: 3 встроенных (test_echo, weather_monitor, weather_notifier) + динамические
- **MCP**: 3 встроенных инструмента (get_weather, send_weather_to_telegram, send_telegram_message)
- **Ветки**: `codex/__34` (на Render), `test/keepalive-sync_02` (запушена)
- **Локально**: `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
- **Тесты**: 22 файла, 247+ шагов (Vault, Sync, Keepalive, Security, API)
- Детали: `PROJECTS/bot_29.md`

### uastcenter_site — Сайт НТЦ 'УАСТ'
- **Репозиторий**: `alexsmy/test_opencode` (в папке `uastcenter_site/`)
- **Домен**: https://uast.center
- **Стек**: HTML5, CSS3 (vanilla ES6 modules), JavaScript (vanilla), Google Fonts
- **Описание**: Статический одностраничный сайт. Секции: Hero, О предприятии, Направления, Проекты, Контакты, Подвал.
- **Статус**: Полный аудит, рефакторинг, модульная архитектура, WebP, lazy loading
- **Локально**: `C:\Users\Alex1\Downloads\uastcenter_site`
- Детали: `PROJECTS/uastcenter_site.md`

### test_opencode — Мой облачный дом
- **Репозиторий**: https://github.com/alexsmy/test_opencode/tree/main
- **Ветка**: `main`
- **Роль**: **Единственный облачный источник правды**. Здесь корни, память, правила, секреты.
- **Содержит**:
  - `_ai_for_all/` — облачная память (правила, профиль, контекст, проекты, VAULT)
  - `synchronization/` — память проекта bot_29 (НИКОГДА НЕ УДАЛЯТЬ)
  - `uastcenter_site/` — полный код сайта НТЦ 'УАСТ'
  - `migrate/` — архивы для миграции между ПК

## Платформа
- **Текущая платформа**: Windows (PowerShell 5.1)
- **Инструменты**: Git 2.54.0, Python 3.13.3

## Статус синхронизации
- `_ai_for_all` смержен: bot_29 + uastcenter_site
- `bot_29` запушен в `alexsmy/bot_29` (ветка `test/keepalive-sync_02`)
- `uastcenter_site` закоммичен в `alexsmy/test_opencode/uastcenter_site/` (облачный пуш не выполнен)
- `synchronization/` обновляется авто-воркером на Render
