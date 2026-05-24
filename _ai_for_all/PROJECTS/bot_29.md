# Project: bot_29

**Репозиторий**: `https://github.com/alexsmy/bot_29`
**Ветка**: `codex/__34` (актуальная, рабочая)

## Суть

FastAPI-сервер с Telegram-ботом (aiogram), запускается через `python bot.py`.
Хостится на Render.com. Обеспечивает: веб-дашборд, файловое хранилище, CRPT, погоду,
галактические часы, vault для паролей, синхронизацию с GitHub.

## Архитектура

```
bot.py                 — точка входа (FastAPI + lifespan)
config/                — конфиги (keep_alive, sync_settings, security)
routers/               — REST API роутеры
services/              — сервисы (sync, agents, telegram, keepalive)
templates/             — HTML-шаблоны (Jinja2)
static/                — статика (CSS, JS)
data/                  — данные (vault, filevault_uploads, agents, etc.)
project/               — фронтенд-проекты (sbor, crpt, filevault, radio, time)
secrets/               — токены (НЕ в git)
```

## Ключевые URL
- **Render**: https://bot-29-nx0w.onrender.com
- **FileVault**: https://bot-29-nx0w.onrender.com/files
- **Vault**: https://bot-29-nx0w.onrender.com/vault
- **MCP**: https://bot-29-nx0w.onrender.com/mcp

## Переменные окружения (на Render)
- SYNC_GITHUB_TOKEN — токен для пуша в test_opencode
- TELEGRAM_BOT_TOKEN — токен @imgtestlivebot
- TELEGRAM_CHAT_ID — 1252058698
- AGENTS_TUNNEL_SECRET — секрет MCP
- TELEGRAM_TUNNEL_SECRET — секрет уведомлений

## Синхронизация
- Сервер автоматически пушит данные в `alexsmy/test_opencode/synchronization/`
- Настройки: `config/sync_settings.json`
- Воркер проверяет события каждые ~6с

## Локальная копия
`C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
