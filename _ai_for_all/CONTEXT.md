# Current Context

Общий контекст всех проектов. Дата: 24.05.2026.

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29/tree/codex/__34
- **Ветка**: `codex/__34`
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, часы, Telegram-бот, cloud sync
- **Последний коммит**: `ed3b406` — Fix vault data path regression
- **Локально**: `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
- Детали: `PROJECTS/bot_29.md`

### test_opencode — Мой облачный дом
- **Репозиторий**: https://github.com/alexsmy/test_opencode/tree/main
- **Ветка**: `main`
- **Роль**: **Единственный облачный источник правды**. Здесь мои корни, память, правила, секреты.
- **Содержит**:
  - `_ai_for_all/` — моя облачная память (правила, профиль, контекст, проекты, VAULT)
  - `synchronization/` — память проекта bot_29 (НИКОГДА НЕ УДАЛЯТЬ! данные сервера)
  - `migrate/` — архивы для миграции между ПК

## Платформа
- **Текущая платформа**: Windows (PowerShell 5.1) — определяется автоматически
- **Инструменты**: Git 2.54.0, Python 3.13.3, Node.js v24.15.0

## Текущий фокус
- `_ai_for_all` создан и работает как облачная память
- Активная разработка в `bot_29` (ветка `codex/__34`)
- При работе с любыми проектами — сначала читать `_ai_for_all/`
- Секреты, токены, переменные — только в `VAULT/variables.json.enc`
- Тесты пишутся перед сложными изменениями (vault CRUD, 2FA, sync)
- `services/sync_service.py` разбит на пакет `services/sync/` (9 модулей)

## Текущие ветки bot_29
- `codex/__34` — основная, работает на Render
- `test-vault-storage` — тест vault storage CRUD (запушен)
- `test-device-auth` — тест 2FA device auth (локально)
- `refactor/sync-package` — рефакторинг sync_service (запушен)

## Тесты
- `tests/test_vault_storage.py` — 11 шагов, CRUD групп и записей
- `tests/test_device_auth.py` — 10 шагов, 2FA (код, попытки, блокировка, анти-флуд)
- `tests/test_sync_service_pure.py` — 17 шагов, hash/chunking/JSON
