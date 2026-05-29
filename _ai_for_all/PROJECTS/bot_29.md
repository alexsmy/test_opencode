# Project: bot_29

**Репозиторий**: `https://github.com/alexsmy/bot_29`
**Ветка на Render**: `fix/auto-reply-filevault` (текущая продакшен)
**Новые ветки**: `mail_agent_v2/web_config`, `mail_agent_v2/web_config_ext`

## Суть

FastAPI-сервер с Telegram-ботом (aiogram), запускается через `python bot.py`.
Хостится на Render.com.

## Архитектура

```
bot.py                 — точка входа (FastAPI + lifespan)
config/                — конфиги (keep_alive, sync_settings, security, mail_agent.json)
routers/               — REST API роутеры
routers/mail_agent_api.py — API Mail Agent (config, inboxes, sync/restore cloud)
services/              — сервисы (sync, agents, telegram, keepalive, mail_agent/)
templates/             — HTML-шаблоны (Jinja2)
templates/mail_agent.html — Web Config UI (6 блоков)
static/                — статика (CSS, JS)
data/                  — данные (vault, filevault_uploads, mail_agent_config.json, mail_agent_addresses.json)
project/               — фронтенд-проекты (sbor, crpt, filevault, radio, time)
secrets/               — токены (НЕ в git)
```

## Ключевые URL
- **Render**: https://bot-29-nx0w.onrender.com
- **Mail Agent UI**: https://bot-29-nx0w.onrender.com/mail-agent
- **MCP**: https://bot-29-nx0w.onrender.com/mcp

## Переменные окружения (на Render)
- SYNC_GITHUB_TOKEN — токен для пуша в test_opencode
- TELEGRAM_BOT_TOKEN — токен @imgtestlivebot
- TELEGRAM_CHAT_ID — 1252058698
- AGENTS_TUNNEL_SECRET — секрет MCP
- TELEGRAM_TUNNEL_SECRET — секрет уведомлений

## Синхронизация
- Сервер пушит в `alexsmy/test_opencode/synchronization/` каждые ~6с
- Mail config на облако — только вручную через кнопку на UI

## Почтовый агент v2 — per-inbox конфиг

### Структура конфига (config/mail_agent.json + data/mail_agent_config.json)
```json
{
  "selected_inbox": "",
  "global": {
    "auto_reply_enabled": true,
    "forward_to_telegram": false,
    "mark_as_read": false,
    "delete_after_processing": false,
    "poll_interval": 30,
    "max_senders_in_message": 10,
    "save_history_to_disk": false,
    "save_incoming": false,
    "save_attachments": false,
    "address_db_enabled": false
  },
  "inboxes": {
    "user@example.com": {
      "auto_reply_enabled": true,
      "forward_to_telegram": false,
      "mark_as_read": true,
      "delete_after_processing": false,
      "poll_interval": 30,
      "incoming_parse_max_body": 500,
      "incoming_parse_max_subject": 100,
      "save_history_to_disk": true,
      "save_incoming": true,
      "save_attachments": false,
      "address_db_enabled": true,
      "reply_templates": [
        {"name": "default", "text": "Стандартный ответ"},
        {"name": "support", "text": "Поддержка: {summary}"}
      ],
      "reply_template_name": "default",
      "max_senders_in_message": 10,
      "blocked_senders": []
    }
  }
}
```

### Миграция из плоского формата
Авто-конвертация: `{inbox_email, save_attachments_to_disk, ...}` → per-inbox.

### БД адресов (data/mail_agent_addresses.json)
```json
{
  "sender@example.com": {
    "last_incoming": "2026-05-29T12:00:00",
    "last_success": "2026-05-29T12:00:01",
    "last_status": "replied"
  }
}
```

### MCP инструменты (8 шт, на /mcp/)
- `list_mail_inboxes`, `get_mail_config`, `update_mail_config`, `mail_status`
- `last_senders`, `search_emails`, `test_auto_reply`, `list_addresses`

## Ветки
| Ветка | Содержание | Статус |
|-------|-----------|--------|
| `fix/auto-reply-filevault` | Стабильная на Render | 🟢 продакшен |
| `mail_agent_v2/web_config` | Базовая веб-настройка | 🟡 запушено |
| `mail_agent_v2/web_config_ext` | Per-inbox, БД адресов, шаблоны | 🟡 запушено |

## Тесты Mail Agent (19 шт, все зелёные ✅)
- `tests/test_mail_agent.py` — 19 тестов (config, storage, worker, responder, parser, migration, address DB)

**Запуск:**
```powershell
cd C:\Users\Alex1\Downloads\my_work_now\bot_29
python -m tests.test_mail_agent
```

## Структура services/mail_agent/
```
services/mail_agent/
├── __init__.py
├── config.py          ← per-inbox модель, загрузка/сохранение/миграция
├── mail_client.py     ← AgentMail API клиент
├── mail_parser.py     ← парсинг + классификация вложений
├── mail_storage.py    ← сохранение на диск + БД адресов
├── mail_responder.py  ← автоответ по шаблону
├── mail_worker.py     ← фоновый воркер
```

## Структура services/sync/
```
services/
├── sync_service.py
└── sync/
    ├── __init__.py
    ├── utils.py / settings.py / manifest.py / chunking.py
    ├── github.py / collectors.py / restore.py
    ├── notify.py / worker.py
    ├── collectors.py ← _collect_mail_config()
    └── restore.py ← _restore_mail_config()
```

## Локальная копия
`C:\Users\Alex1\Downloads\my_work_now\bot_29\`
