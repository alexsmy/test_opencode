# Current Context

Общий контекст всех проектов. Дата: 29.05.2026 (обновлено, часть 5)

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, галактические часы, Telegram-бот, cloud sync, MCP-сервер, escrow-сервис
- **Агенты**: 3 встроенных (test_echo, weather_monitor, weather_notifier) + динамические
- **MCP**: 10 инструментов (get_weather + 8 mail + send_telegram_message)
- **Ветка на Render**: `fix/auto-reply-filevault` (текущая, все фиксы)
- **Локально**: `C:\Users\alexs\Downloads\my_work_now\bot_29\`
- **Тесты**: 48 mail agent + weather agent тестов, все зелёные ✅
- **Аутентификация**: Единый ключ `API_SECRET_KEY`. Middleware проверяет X-Api-Key или cookie. Localhost bypass.
- **Почтовый агент v3**: роль auto_reply / weather_agent. Модуль `services/mail_agent/` (9 файлов). Per-inbox конфиг. Web Config UI на `/mail-agent`. 48 тестов.
- **Погодный агент Стелла** на stellanova@agentmail.to: парсинг JSON-запроса, Open-Meteo API, двойной ответ (читаемый + JSON). Английская локализация.
- **Live preview** в веб-интерфейсе: как будет выглядеть ответ Стеллы.
- **Тексты Стеллы кастомизируемые** через веб-интерфейс (имя, приветствие, подпись, help).
- **Ветки запушены**: `mail_agent_v3/weather_agent`, `mail_agent_v3/weather_fixes`, `2905/files_ok`
- **Render**: всё ещё на `fix/auto-reply-filevault` (ждёт деплоя `2905/files_ok`)
- Детали: `PROJECTS/bot_29.md`

### Почтовый агент v3 — актуальная архитектура
- **Модуль**: `services/mail_agent/` (9 файлов — добавился `mail_weather_agent.py`)
- **Конфиг**: per-inbox + nested `weather_agent` секция для роли weather_agent
- **Роли**: `auto_reply` (шаблонный автоответчик) / `weather_agent` (Стелла)
- **Поля weather_agent**: name, greeting, signature, help_text, include_json, language (ru/en)
- **API**: GET/PUT config, sync/restore cloud, список/создание инбоксов + address DB API
- **MCP**: 8 почтовых инструментов на `bot-29-nx0w.onrender.com/mcp/`
- **Sync/Restore**: mail config, addresses, emails теперь синхронизируются и восстанавливаются из облака

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
- `bot_29` запушен: `mail_agent_v2/web_config`, `mail_agent_v2/web_config_ext`, `2905/files_ok`
- `synchronization/` обновляется авто-воркером на Render
- **Vault в облаке**: пуст (удалены повреждённые файлы), нужно создавать записи заново

## Активные цели
1. ✅ Mail Agent v3 — ролевая система + Погодный агент Стелла — **ГОТОВО**
2. ⏳ Деплой на Render ветки `2905/files_ok` (sync/restore fix)
3. ⏳ Live preview ответа Стеллы — **ГОТОВО**
4. ⏳ Etherscan listener
5. ⏳ Freemoney challenge (agent-x02 с музыкальной темой)
6. ⏳ Telegram-дашборд для владельца
