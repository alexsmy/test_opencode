# Current Context

Общий контекст всех проектов. Дата: 25.05.2026.

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29/tree/codex/__34
- **Ветка**: `codex/__34`
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, часы, Telegram-бот, cloud sync
- **Последний коммит**: `ec8fdb6` — test: add keepalive + sync tests (9 files, 108 steps)
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
- Активная разработка в `bot_29` (ветка `test/keepalive-sync_01`)
- Написаны тесты для keepalive + sync подсистем (9 файлов, 108 шагов)
- Покрытие: Vault ✅, Sync ✅ (кроме restore), Keep-alive ⚠️ (2/5 ключевых модулей)
- Осталось протестировать: `project_health.py`, `stats_manager.py`, `keepalive_security.py`, `restore.py`, роутеры (`keepalive_api.py`, `health_api.py`)
- Секреты, токены, переменные — только в `VAULT/variables.json.enc`
- Тесты пишутся как страховка перед/после рефакторинга и сложных изменений

## Текущие ветки bot_29
- `codex/__34` — основная, работает на Render
- `test-vault-storage` — тест vault storage CRUD (запушена, stale)
- `test-device-auth` — тест 2FA device auth (локально, stale)
- `refactor/sync-package` — рефакторинг sync_service (локально + remote, stale)
- `refactor/add_test_04` — то же, что sync-package, запушена отдельно (stale)
- `test/vault-api` — тест REST API Vault + фикс бага (локально, stale)
- `test/keepalive-sync_01` — **текущая ветка**. 9 тестов для keepalive + sync (закоммичено)

## Тесты (всего 14 файлов, 161+ шагов)
| Файл | Шаги | Что проверяет |
|---|---|---|
| `tests/test_vault_storage.py` | 11 | CRUD vault storage |
| `tests/test_device_auth.py` | 10 | 2FA устройств |
| `tests/test_sync_service_pure.py` | 17 | hash/chunking/JSON (чистые функции) |
| `tests/test_sync_to_github.py` | 8 | sync_to_github с замоканным GitHub API |
| `tests/test_vault_api.py` | 18 | REST API Vault через FastAPI TestClient |
| `tests/test_master_key.py` | 12 | Мастер-ключ vault |
| `tests/test_keepalive_auth.py` | 21 | PIN-аутентификация, rate-limit, HMAC |
| `tests/test_config_manager.py` | 19 | Конфигурация keep-alive |
| `tests/test_sync_collectors.py` | 16 | Коллекторы sync (keepalive, vault, crpt, agents) |
| `tests/test_sync_settings.py` | 7 | Настройки sync |
| `tests/test_sync_github.py` | 13 | GitHub API клиент async |
| `tests/test_sync_manifest.py` | 4 | Манифест sync |
| `tests/test_sync_notify.py` | 5 | Telegram-уведомления sync |
| `tests/test_keep_alive.py` | 11 | Мониторинг URL keep-alive |

## Найденные баги
- `routers/vault_api.py:60` — `authorized` возвращал `""` (пустая строка) вместо `false` в JSON. Исправлено: `bool(...)`.
