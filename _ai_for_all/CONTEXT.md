# Current Context

Общий контекст всех проектов. Дата: 29.05.2026 (обновлено, часть 7 — error handling)

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
- **Тесты**: 46 weather + 31 core = 77 тестов, все зелёные ✅
- **Аутентификация**: Единый ключ `API_SECRET_KEY`. Middleware проверяет X-Api-Key или cookie. Localhost bypass.
- **Почтовый агент v4**: роль auto_reply / weather_agent. Модуль `services/mail_agent/` (12 файлов). Per-inbox конфиг. Web Config UI на `/mail-agent`.
- **Погодный агент Стелла**: 10 языков, кастомизируемые шаблоны ошибок, rate limiter, pre-валидация
- **Live preview** в веб-интерфейсе: как будет выглядеть ответ Стеллы и шаблоны ошибок
- **Тексты Стеллы кастомизируемые** через веб-интерфейс (имя, приветствие, подпись, help, шаблоны ошибок)
- **Ветки запушены**: `mail_agent_v4/multi_lang`, `mail_agent_v4/error_handling`
- **Render**: всё ещё на `fix/auto-reply-filevault` (ждёт деплоя)
- Детали: `PROJECTS/bot_29.md`

### Почтовый агент v4 — актуальная архитектура
- **Модуль**: `services/mail_agent/` (12 файлов):
  - `__init__.py`, `config.py`, `mail_client.py`, `mail_parser.py`, `mail_storage.py`, `mail_telegram.py`, `mail_responder.py`, `mail_worker.py`
  - `mail_weather_agent.py` — ядро погодного агента
  - `weather_localization.py` — переводы (10 языков)
  - `weather_validator.py` — pre-валидация + rate limiter
  - `weather_templates.py` — шаблоны ошибок (10 языков × 7 типов)
- **Конфиг**: per-inbox + nested `weather_agent` секция для роли weather_agent
- **Роли**: `auto_reply` (шаблонный автоответчик) / `weather_agent` (Стелла)
- **Поля weather_agent**: name, greeting, signature, help_text, include_json, language, rate_limits, error_templates, response_format
- **10 языков**: en, ru, zh, hi, es, ar, fr, bn, pt, id
- **Обработка ошибок**: 7 типов с вежливыми локализованными шаблонами
- **API**: GET/PUT config, sync/restore cloud, список/создание инбоксов + address DB API
- **MCP**: 8 почтовых инструментов на `bot-29-nx0w.onrender.com/mcp/`
- **Sync/Restore**: mail config, addresses, emails синхронизируются и восстанавливаются из облака

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
- `bot_29` запушен: `mail_agent_v4/multi_lang`, `mail_agent_v4/error_handling`, `2905/files_ok`
- `synchronization/` обновляется авто-воркером на Render
- **Vault в облаке**: пуст (удалены повреждённые файлы), нужно создавать записи заново

## Активные цели
1. ✅ Mail Agent v4 — Multi-language (10 языков) — **ГОТОВО**
2. ✅ Mail Agent v4 — Error handling + modular architecture — **ГОТОВО (ждёт проверки)**
3. ⏳ Деплой на Render веток `mail_agent_v4/error_handling` + `2905/files_ok`
4. ⏳ Etherscan listener
5. ⏳ Freemoney challenge (agent-x02 с музыкальной темой)
6. ⏳ Telegram-дашборд для владельца
