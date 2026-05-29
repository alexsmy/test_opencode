# Current Context

Общий контекст всех проектов. Дата: 30.05.2026 (часть 8 — Conductor + Sub-agents)

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, галактические часы, Telegram-бот, cloud sync, MCP-сервер, escrow-сервис
- **Агенты**: 3 встроенных (test_echo, weather_monitor, weather_notifier) + динамические
- **MCP**: 10 инструментов (get_weather + 8 mail + send_telegram_message)
- **Ветка на Render**: `fix/auto-reply-filevault` (текущая)
- **Локально**: `C:\Users\alexs\Downloads\my_work_now\bot_29\`
- **Тесты**: 77 тестов, все зелёные ✅
- **Аутентификация**: Единый ключ `API_SECRET_KEY`. Middleware проверяет X-Api-Key или cookie. Localhost bypass.

### Архитектура почтового агента v5 — Conductor + Sub-agents
- **Модуль**: `services/mail_agent/` (17 файлов):
  - **Ядро**: `__init__.py`, `config.py`, `mail_client.py`, `mail_parser.py`, `mail_storage.py`, `mail_telegram.py`, `mail_responder.py`, `mail_weather_agent.py`
  - **Дирижёр**: `conductor.py` — главный цикл, `rate_limiter.py` — общий лимитер, `mail_worker.py` — запускает дирижёра
  - **Агенты**: `agents/__init__.py`, `agents/fetcher.py`, `agents/spam_watcher.py`, `agents/cleaner.py`, `agents/weather_agent.py`, `agents/auto_reply_agent.py`
  - **Погода**: `weather/__init__.py`, `weather/localization.py`, `weather/validator.py`, `weather/templates.py`
- **Как работает**: Fetcher забирает ровно столько писем, сколько можно обработать по лимитам → SpamWatcher проверяет отправителя → Conductor отдаёт письмо WeatherAgent или AutoReplyAgent → ответ. Очередь живёт на AgentMail (письма не забираются, пока не готовы к обработке).
- **Защита от спама**: per-sender скользящее окно (5/мин по умолчанию), автоблокировка при превышении, авторазблокировка через N минут.
- **Уборщик**: cleaner.py — периодически удаляет старые прочитанные письма на AgentMail (настраивается).
- **Веб-интерфейс**: `/mail-agent` — все настройки: погодный агент, шаблоны ошибок, rate limits, per-sender limits, cleaner, отправители, шаблоны.
- **Роли**: `auto_reply` / `weather_agent`
- **10 языков**: en, ru, zh, hi, es, ar, fr, bn, pt, id
- **API**: GET/PUT config, sync/restore cloud, список/создание инбоксов + address DB API
- **MCP**: 8 почтовых инструментов
- **Ветки запушены**: `mail_agent_v4/multi_lang`, `mail_agent_v4/error_handling`, будет `mail_agent_v5/conductor`
- **Render**: всё ещё на `fix/auto-reply-filevault` (ждёт деплоя)

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
- `bot_29` запушен: `mail_agent_v4/multi_lang`, `mail_agent_v4/error_handling`
- `synchronization/` обновляется авто-воркером на Render
- **Vault в облаке**: пуст (удалены повреждённые файлы), нужно создавать записи заново

## Активные цели
1. ✅ Mail Agent v4 — Multi-language (10 языков) — **ГОТОВО**
2. ✅ Mail Agent v4 — Error handling + modular architecture — **ГОТОВО**
3. ✅ Mail Agent v5 — Conductor + Sub-agents (очередь, spam, cleaner) — **ГОТОВО (ждёт проверки)**
4. ⏳ Создать ветку `mail_agent_v5/conductor` и запуш
5. ⏳ Деплой на Render
6. ⏳ Etherscan listener
7. ⏳ Freemoney challenge (agent-x02 с музыкальной темой)
8. ⏳ Telegram-дашборд для владельца
