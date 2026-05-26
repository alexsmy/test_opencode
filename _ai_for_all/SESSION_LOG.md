# Session Log

История сессий. Append-only: новые записи сверху, старые не удаляются.

---

## 26.05.2026 — Новый проект: сайт uastcenter_site (аудит и исправления)

- Создан новый проект: сайт НТЦ 'УАСТ' (статический HTML/CSS/JS) — `C:\Users\Alex1\Downloads\uastcenter_site`
- Создана локальная `_ai_for_all/` в корне проекта (правила, профиль, контекст, PROJECTS/uastcenter_site.md)
- Git инициализирован в проекте (ветка `main`, коммит `9a83af2`)
- Проведён аудит: исправлены орфографические ошибки (А1-А4, А6)
- 14 внешних ссылок `uast.center/img/...` заменены на локальные `img/...`
- Скачаны 2 внешних изображения: `img/about_company.jpg`, `img/contact_map.png`
- Unsplash (about_bg.jpg) — не скачан (соединение блокировано), оставлена внешняя ссылка
- Удалён мёртвый код: hero.buttons, скрытые контейнеры; aboutButton теперь видна
- Логотип: src и alt исправлены
- Обновлён `_ai_for_all` в облаке: добавлен PROJECTS/uastcenter_site.md, обновлён CONTEXT
- **Следующий шаг**: дальнейшие улучшения сайта по запросу пользователя

---

## 24.05.2026 — Корректировка _ai_for_all после ревью

- PROFILE: добавлено "начинающий пользователь", упрощены узлы (без имён ПК)
- README: переписан раздел "Принцип работы" — test_opencode как облачный дом
- README: переписаны "Репозитории" — bot_29 как текущий проект, test_opencode как опорный
- AGENTS: добавлены принципы про облачный дом, `synchronization/` не удалять
- CONTEXT: test_opencode — "мой облачный дом", `synchronization/` — НИКОГДА НЕ УДАЛЯТЬ
- Все изменения запушены в `test_opencode/main/_ai_for_all`
- Мастер-пароль VAULT: известен только alexs

## 25.05.2026 (сессия 3, финал) — 17 тестов, 22 файла, 247+ шагов → **запушено в GitHub**

- Ветка `test/keepalive-sync_02` создана и **запушена** в `alexsmy/bot_29`
  (коммиты: `ec8fdb6`, `491d3a9`, `6f82c15`)
- Удалены старые `_ai/` файлы (мигрированы в `_ai_for_all/`)
- `_ai_for_all` синхронизирован с `test_opencode/main`
- **Следующий шаг**: `routers/agents_api.py`, `services/telegram_tunnel.py`, `routers/filevault_api.py`

## 25.05.2026 (сессия 3) — 17 новых тестов: keepalive + sync + security + APIs (247 шагов) + чекпоинт

- **Сессия завершена**: ветка `test/keepalive-sync_01`, 2 коммита (`ec8fdb6`, `491d3a9`)
- Написано **17 тестовых файлов** (247+ шагов), все зелёные:
  - 9 тестов keep-alive + sync модулей (108 шагов) — первая волна
  - **8 критических тестов** (86 шагов) — вторая волна:
    - `test_stats_manager.py` — менеджер статистики (9)
    - `test_keepalive_security.py` — security-примитивы PIN/HMAC (26)
    - `test_project_health.py` — агрегатор здоровья сервисов (10)
    - `test_keepalive_api.py` — REST API keep-alive (9)
    - `test_health_api.py` — health endpoint (2)
    - `test_sync_api.py` — sync API (5)
    - `test_crpt_api.py` — CRPT API (8)
    - `test_sync_restore.py` — восстановление данных с GitHub (17)
- Покрыты критичные модули: keepalive security, project health, keepalive/stats/sync/crpt API, restore
- Обновлена память `_ai_for_all`, данные запушены в `test_opencode/main`
- **Следующий шаг**: `routers/agents_api.py` (175 строк), `services/telegram_tunnel.py` (333 строк)
- Проблема: emoji в `keep_alive.py` (🚀📡⛔) → cp1251 warning на Windows

## 25.05.2026 (сессия 2) — 9 новых тестов: keepalive + sync subsystems (108 шагов)

- Созданы тесты (ветка `test/keepalive-sync_01`, 9 файлов, 1448 строк):
  - `test_master_key.py` — мастер-ключ vault (12 шагов)
  - `test_keepalive_auth.py` — PIN-аутентификация (21 шаг)
  - `test_config_manager.py` — конфигурация keep-alive (19 шагов)
  - `test_sync_collectors.py` — коллекторы sync (16 шагов)
  - `test_sync_settings.py` — настройки sync (7 шагов)
  - `test_sync_github.py` — GitHub API клиент async (13 шагов)
  - `test_sync_manifest.py` — манифест sync (4 шага)
  - `test_sync_notify.py` — уведомления sync (5 шагов)
  - `test_keep_alive.py` — мониторинг URL (11 шагов)
- Всего тестов: 5 -> 14, шагов: 64 -> 161+
- Покрытие: Vault ✅, Sync ✅ (кроме restore), Keep-alive ⚠️ (2/5 модулей)
- Следующие кандидаты: `services/project_health.py`, `services/sync/restore.py`, `routers/keepalive_api.py`, `config/keepalive_security.py`
- Проблема: тесты с emoji (🚀, 📡, ⛔) в `keep_alive.py` логах падают на Windows cp1251 — логирование шумит, но тесты проходят

## 25.05.2026 — Тест sync_to_github + тест REST API Vault + найден баг в production

- Создан `tests/test_sync_to_github.py` — 8 шагов (без токена, auto_sync=off,
  пустые данные, успешная синхронизация, пропуск по манифесту, частичная неудача).
  Все вызовы GitHub API замоканы.
- Создан `tests/test_vault_api.py` — 18 шагов через FastAPI TestClient.
  Проверяет: auth status, запрос/верификация 2FA кода, CRUD групп, CRUD записей,
  фильтрация, поиск, ошибки 400/404.
- **Найден баг в production**: `routers/vault_api.py:60` — `authorized` возвращал
  `""` (пустую строку) в JSON вместо `false`. Причина: `bool(fp) and (False or "")` = `""`.
  Исправлено: обёртка в `bool(...)`.
- Обновлено `rules/git.md` — жёстче про новые ветки, явно спрашивать перед пушем.
- Ветка `refactor/add_test_04` запушена в bot_29.
- Ветка `test/vault-api` — запушена (содержит vault API test + bugfix).
- Все 5 тестов проходят: 64 шага, 0 ошибок.

## 24.05.2026 — Тест 2FA device auth + рефакторинг sync_service + тест чистых функций sync

- Создан `tests/test_device_auth.py` — 10 шагов (запрос кода, неверный/верный код, истечение, лимит попыток, анти-флуд, удаление устройства)
- Проанализирован `services/sync_service.py` (1255 строк)
- `sync_service.py` разбит на пакет `services/sync/` из 9 модулей:
  - `utils.py`, `settings.py`, `manifest.py`, `chunking.py`, `github.py`
  - `collectors.py`, `restore.py`, `notify.py`, `worker.py`
- Старый `sync_service.py` — shim (2 строки, `from services.sync import *`)
- Создан `tests/test_sync_service_pure.py` — 17 шагов: `_compute_hash`, `_chunk_if_large`, `_is_meaningful_json`
- Все 11 мест, импортирующих `services.sync_service`, продолжают работать
- Ветки: `test-device-auth` (локально), `refactor/sync-package` (запушена)
- Рефакторинг: божественный модуль 1255л → 9 маленьких файлов

## 24.05.2026 — Создан первый тест: vault storage CRUD

- Создан `tests/test_vault_storage.py` — 11 шагов, все пройдены
- Тест проверяет: создание/чтение/обновление/удаление групп и записей, поиск, каскадное удаление, защиту от дубликатов
- Найдена и исправлена мелочь: `search_entries()` — query теперь необязателен (значение по умолчанию "")
- Обновлён `rules/coding.md` — добавлен раздел про тесты
- Изменения в bot_29 запушены в ветку `test-vault-storage`

## 24.05.2026 — Добавлен rules/deepseek.md (13 pro-правил кодинга)

- Создан `rules/deepseek.md` со сводом правил от alexs (думать → писать, простота, хирургические правки, безопасность, стиль, чекпоинты, зависимости, обработка ошибок)
- `rules/coding.md` оптимизирован: убраны дубликаты, добавлена ссылка на deepseek.md
- `AGENTS.md` обновлён ссылками на deepseek.md и coding.md

## 24.05.2026 — Создан rules/coding.md (правила работы с кодом)

- На основе ответов alexs на 6 простых вопросов создан `rules/coding.md`
- В файле: план перед кодом, стиль объяснений, комментарии, выбор решений, ссылки, обратная связь
- Файл будет дополняться по мере работы

## 24.05.2026 — Создание _ai_for_all

- Создана облачная память AI `_ai_for_all` в `alexsmy/test_opencode`
- Структура: README, PROFILE, AGENTS, CONTEXT, rules/, handover/, PROJECTS/, VAULT/, REFERENCE/
- Перенесены и переработаны все правила из bot_29/_ai
- Создан VAULT с AES-256-GCM шифрованием (crypto.js + encrypt/decrypt.ps1)
- Активная ветка bot_29: `codex/__34`
- Render: https://bot-29-nx0w.onrender.com
- Мастер-пароль VAULT: известен только alexs
