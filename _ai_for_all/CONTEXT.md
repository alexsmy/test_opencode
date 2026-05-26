# Current Context

Общий контекст всех проектов. Дата: 25.05.2026.

## Активные проекты

### uastcenter_site — Сайт НТЦ 'УАСТ'
- **Локальная папка**: `C:\Users\Alex1\Downloads\uastcenter_site`
- **Git**: инициализирован (ветка `main`), коммит `9a83af2`
- **Стек**: HTML5, CSS3 (vanilla), JavaScript (vanilla), Google Fonts
- **Домен (production)**: https://uast.center
- **Описание**: Статический одностраничный сайт. Секции: Hero, About, Directions, Projects, Contact, Footer.
  Контент через `js/content.js`. Все изображения локальны (кроме about_bg.jpg — unsplash).
- **Выполнено**: аудит, исправление орфографии, замена внешних изображений на локальные, чистка мёртвого кода
- Детали: `PROJECTS/uastcenter_site.md`

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29/tree/codex/__34
- **Ветка**: `codex/__34`
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, часы, Telegram-бот, cloud sync
- **Последний коммит**: `6f82c15` — chore: remove deprecated _ai/ memory files
- **Ветка**: `test/keepalive-sync_02` (запушена в GitHub)
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
- Написано 17 тестов (247+ шагов) для keepalive + sync + security + API слоёв
- Покрытие: Vault ✅, Sync ✅ (включая restore), Keep-alive ✅ (все модули), Routers ⚠️ (5/10)
- Осталось критическое: `routers/agents_api.py`, `services/telegram_tunnel.py`, `routers/filevault_api.py`
- Секреты, токены, переменные — только в `VAULT/variables.json.enc`
- Тесты пишутся как страховка перед/после рефакторинга и сложных изменений

## Текущие ветки bot_29
- `codex/__34` — основная, работает на Render
- `test-vault-storage` — тест vault storage CRUD (запушена, stale)
- `test-device-auth` — тест 2FA device auth (локально, stale)
- `refactor/sync-package` — рефакторинг sync_service (локально + remote, stale)
- `refactor/add_test_04` — то же, что sync-package, запушена отдельно (stale)
- `test/vault-api` — тест REST API Vault + фикс бага (локально, stale)
- `test/keepalive-sync_01` — 17 тестов keepalive + sync + security + APIs (закоммичено, stale)
- `test/keepalive-sync_02` — **текущая ветка**. То же, что sync_01 + cleaned (запушена)

## Тесты (всего 22 файла, 247+ шагов)
| Файл | Шаги | Что проверяет |
|---|---|---|
| `tests/test_vault_storage.py` | 11 | CRUD vault storage |
| `tests/test_device_auth.py` | 10 | 2FA устройств |
| `tests/test_sync_service_pure.py` | 17 | hash/chunking/JSON (чистые функции) |
| `tests/test_sync_to_github.py` | 8 | sync_to_github с замоканным GitHub API |
| `tests/test_vault_api.py` | 18 | REST API Vault |
| `tests/test_master_key.py` | 12 | Мастер-ключ vault |
| `tests/test_keepalive_auth.py` | 21 | PIN-аутентификация |
| `tests/test_config_manager.py` | 19 | Конфигурация keep-alive |
| `tests/test_sync_collectors.py` | 16 | Коллекторы sync |
| `tests/test_sync_settings.py` | 7 | Настройки sync |
| `tests/test_sync_github.py` | 13 | GitHub API клиент async |
| `tests/test_sync_manifest.py` | 4 | Манифест sync |
| `tests/test_sync_notify.py` | 5 | Telegram-уведомления sync |
| `tests/test_keep_alive.py` | 11 | Мониторинг URL keep-alive |
| `tests/test_stats_manager.py` | 9 | Менеджер статистики |
| `tests/test_keepalive_security.py` | 26 | Security-примитивы PIN/HMAC |
| `tests/test_project_health.py` | 10 | Агрегатор здоровья сервисов |
| `tests/test_keepalive_api.py` | 9 | REST API keep-alive |
| `tests/test_health_api.py` | 2 | Health endpoint |
| `tests/test_sync_api.py` | 5 | Sync API |
| `tests/test_crpt_api.py` | 8 | CRPT API |
| `tests/test_sync_restore.py` | 17 | Восстановление с GitHub |

## Найденные баги
- `routers/vault_api.py:60` — `authorized` возвращал `""` (пустая строка) вместо `false` в JSON. Исправлено: `bool(...)`.
