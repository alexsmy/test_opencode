# Project: bot_29

**Репозиторий**: `https://github.com/alexsmy/bot_29`
**Ветка на Render**: `fix/auto-reply-filevault` (текущая, рабочая)

## Суть

FastAPI-сервер с Telegram-ботом (aiogram), запускается через `python bot.py`.
Хостится на Render.com. Обеспечивает: веб-дашборд, FileVault, Vault, CRPT, погоду,
галактические часы, vault для паролей, синхронизацию с GitHub, почтовый агент v2.

## Архитектура

```
bot.py                 — точка входа (FastAPI + lifespan)
config/                — конфиги (keep_alive, sync_settings, mail_agent, security)
routers/               — REST API роутеры
services/              — сервисы (sync, agents, telegram, keepalive, mail_agent, escrow)
templates/             — HTML-шаблоны (Jinja2)
static/                — статика (CSS, JS)
data/                  — данные (vault, filevault_uploads, mail, agents, etc.)
project/               — фронтенд-проекты
secrets/               — токены (НЕ в git)
```

## Ключевые URL

- **Render**: https://bot-29-nx0w.onrender.com
- **FileVault**: https://bot-29-nx0w.onrender.com/files
- **Vault**: https://bot-29-nx0w.onrender.com/vault
- **MCP**: https://bot-29-nx0w.onrender.com/mcp
- **Почтовые файлы**: https://bot-29-nx0w.onrender.com/mail-files/

## Аутентификация (упрощена)

- **Один ключ**: `API_SECRET_KEY` на всё. Middleware проверяет `X-Api-Key` или `api_session` cookie.
- **Белый список**: `/static/`, `/project/`, `/mcp/`, `/auth/`, `/files/open/`, главные страницы
- **Логин**: `/auth/login`, cookie на 30 дней
- **Vault PIN/2FA**: Удалены. Master key запрашивается с сервера через `/api/vault/master-key`
- **Keepalive PIN**: Удалён. Настройки доступны по тому же API_SECRET_KEY
- **Localhost bypass**: 127.0.0.1 и ::1 без ключа (внутренний трафик)

## Почтовый агент v2 (`services/mail_agent/`)

8 файлов, конфиг `config/mail_agent.json`. Фоновый воркер опрашивает `escrow@agentmail.to` каждые 30с.

### Флоу обработки письма

1. `list_unread()` → новые письма
2. `get_message(id)` → полное содержимое
3. `analyze_email()` → парсинг (отправитель, тема, тело, вложения)
4. `save_email()` → `data/mail/<id>/` + FileVault (подпапка в Mail)
5. `save_attachment()` → `data/mail/<id>/attachments/` + FileVault
6. `forward_to_telegram()` → Telegram (текст + вложения photo/video/document)
7. `reply_to_sender()` → автоответ (тело через `"text"` поле, не `"body"`)
8. `mark_as_read()` → помечает прочитанным

### Структура FileVault для писем

```
Mail/
  Email from sender — subject/
    body.txt          ← текст письма
    IMG_photo.jpg     ← вложение
    doc.pdf           ← вложение
```

### Статус (28.05.2026)

| Компонент | Статус |
|-----------|--------|
| Telegram уведомления | ✅ Полностью |
| Автоответ | ✅ С телом, не пустой |
| /files папка Mail | ✅ Подпапки + файлы |
| Синхронизация в GitHub | ✅ Письмо + вложения |
| Тесты (19 шт) | ✅ Все зелёные |

## Синхронизация

- Сервер пушит данные в `alexsmy/test_opencode/synchronization/`
- Настройки: `config/sync_settings.json`
- Режимы: по расписанию (24ч) или по событию
- FileVault: мета + блобы (до 24 МБ)

## Известные баги (все исправлены)

1. ~~Автоответ пустой~~ → `body`→`text` ✅
2. ~~/files Mail пустая~~ → `_save_to_filevault()` ✅
3. ~~Файлы в корень Mail~~ → `create_mail_subfolder()` ✅
4. ~~Синхронизация не стартует~~ → `signal_sync_needed()` ✅
5. ~~Folder tree crash~~ → `index[child["folder_id"]]` ✅
6. ~~Воркер обработал старые письма~~ → `processed_ids.json` persist ✅
7. ~~Vault auth сломан~~ → удалена 2FA/PIN ✅
8. ~~Бесконечный пин-код~~ → удалён PIN vault ✅

## Тесты

- `tests/test_mail_agent.py` — 19 тестов (парсинг, storage, folder tree, config)
- `tests/test_mail_agent.py` запуск: `python tests/test_mail_agent.py`
- Старые тесты: vault, sync, keepalive, escrow — в `tests/`

## Переменные окружения (Render)

- `SYNC_GITHUB_TOKEN` — токен GitHub
- `TELEGRAM_BOT_TOKEN` — токен @imgtestlivebot
- `TELEGRAM_CHAT_ID` — 1252058698
- `AGENTMAIL_API_KEY` — ключ AgentMail
- `API_SECRET_KEY` — единый ключ API

## Локальная копия

`C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
