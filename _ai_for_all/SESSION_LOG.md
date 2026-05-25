# Session Log

История сессий. Append-only: новые записи сверху, старые не удаляются.

---

## 24.05.2026 — Корректировка _ai_for_all после ревью

- PROFILE: добавлено "начинающий пользователь", упрощены узлы (без имён ПК)
- README: переписан раздел "Принцип работы" — test_opencode как облачный дом
- README: переписаны "Репозитории" — bot_29 как текущий проект, test_opencode как опорный
- AGENTS: добавлены принципы про облачный дом, `synchronization/` не удалять
- CONTEXT: test_opencode — "мой облачный дом", `synchronization/` — НИКОГДА НЕ УДАЛЯТЬ
- Все изменения запушены в `test_opencode/main/_ai_for_all`
- Мастер-пароль VAULT: известен только alexs

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

## 25.05.2026 — Startup test, аудит _ai_for_all, исправление неточностей

- Проведён аудит `_ai_for_all`: обнаружены устаревшие данные в CONTEXT.md (коммит `ed3b406`, ветка `codex/__34`) и SESSION_LOG.md (test/vault-api — «локально» вместо «запушена»)
- Исправлены: CONTEXT.md, SESSION_LOG.md, REFERENCE/commands.md
- Создан `rules/startup_test.md` — чеклист из 5 блоков для проверки среды перед началом сессии
- `rules/lifecycle.md` дополнен: старт сессии включает запуск стартового теста
- Все изменения запушены в `test_opencode/main/_ai_for_all` (коммит `4bfdb53`)
- Ветка `test-device-auth` не запушена (существует только локально, при новой сессии потребуется создать заново)

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
