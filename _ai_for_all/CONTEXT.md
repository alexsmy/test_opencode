# Current Context

Общий контекст всех проектов. Дата: 29.05.2026 (обновлено, часть 2)

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, галактические часы, Telegram-бот, cloud sync, MCP-сервер, escrow-сервис
- **Агенты**: 3 встроенных (test_echo, weather_monitor, weather_notifier) + динамические
- **MCP**: 10 инструментов (get_weather + 8 mail + send_telegram_message)
- **Ветка на Render**: `fix/auto-reply-filevault` (текущая, все фиксы)
- **Локально**: `C:\Users\Alex1\Downloads\my_work_now\bot_29\`
- **Тесты**: 19 mail_agent тестов, все зелёные ✅
- **Аутентификация**: Единый ключ `API_SECRET_KEY`. Middleware проверяет X-Api-Key или cookie. Localhost bypass.
- **Почтовый агент v2**: отдельный модуль `services/mail_agent/`. Per-inbox конфиг. Web Config UI на `/mail-agent`. 19 тестов.
- **Все баги v2 исправлены** ✅
- **Новые ветки**: `mail_agent_v2/web_config` (первая версия UI), `mail_agent_v2/web_config_ext` (per-inbox, БД, шаблоны)
- **Старые локальные ветки удалены**: feat/escrow-agent, feat/mail-agent-v2, feat/unified-api-auth, improve/sync-storage, opencode_refact_03
- Детали: `PROJECTS/bot_29.md`

### Почтовый агент v2 — актуальная архитектура
- **Модуль**: `services/mail_agent/` (8 файлов)
- **Конфиг**: per-inbox (`config/mail_agent.json` база + `data/mail_agent_config.json` override)
- **Структура конфига**: `{selected_inbox, global: {...}, inboxes: {email: {...}}}`
- **Новые возможности (29.05 ч.2)**:
  - Per-inbox настройки (каждый ящик — свои параметры)
  - Web UI: 6 блоков (инбокс, парсинг, история, БД адресов, шаблоны, остальное)
  - API: GET/PUT config, sync/restore cloud, список/создание инбоксов
  - БД адресов (`data/mail_agent_addresses.json`)
  - Множественные шаблоны автоответов (добавление/удаление/выбор)
  - Миграция из плоского конфига в per-inbox
- **MCP**: 8 почтовых инструментов на `bot-29-nx0w.onrender.com/mcp/`
- **Документация**: `REFERENCE/mcp_mail.md`

### uastcenter_site — Сайт НТЦ 'УАСТ'
- **Репозиторий**: `alexsmy/test_opencode` (в папке `uastcenter_site/`)
- **Домен**: https://uast.center
- **Стек**: HTML5, CSS3 (vanilla ES6 modules), JavaScript (vanilla), Google Fonts
- **Статус**: Полный аудит, рефакторинг, модульная архитектура, WebP, lazy loading ✅

### test_opencode — Мой облачный дом
- **Репозиторий**: https://github.com/alexsmy/test_opencode/tree/main
- **Ветка**: `main`
- **Роль**: Единственный облачный источник правды.

## Платформа
- **Текущая**: Windows (PowerShell 5.1)
- **Инструменты**: Git 2.54.0, Python 3.13.3

## Статус синхронизации
- `bot_29` запушен: `mail_agent_v2/web_config`, `mail_agent_v2/web_config_ext`
- `synchronization/` обновляется авто-воркером на Render

## Активные цели
1. ✅ Mail Agent Web Config UI (per-inbox, БД адресов, шаблоны) — **ГОТОВО**
2. ⏳ Деплой на Render ветки с новым UI (нужен PR/merge в fix/auto-reply-filevault)
3. ⏳ Dynamic workers (по одному воркеру на активный инбокс)
4. ⏳ Etherscan listener
5. ⏳ Freemoney challenge (agent-x02 с музыкальной темой)
6. ⏳ Telegram-дашборд для владельца
