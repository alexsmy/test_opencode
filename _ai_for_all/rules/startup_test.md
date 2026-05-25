# Startup Test

Перед началом работы — пройти чеклист, чтобы убедиться что `_ai_for_all` актуален и среда готова.

## Как запускать

```powershell
# Шаг 1: проверить что стоит на bot_29
cd C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29
git branch                              # текущая ветка — последняя рабочая
git log --oneline -3                    # последние коммиты
git status                              # нет ли грязи

# Шаг 2: проверить _ai_for_all на актуальность
cd C:\Users\alexs\Downloads\my_work_now\test_opencode_clone
git status                              # нет ли незакоммиченного
git log --oneline -3                    # последние коммиты
git fetch --dry-run                     # есть ли обновления на GitHub

# Шаг 3: запустить тесты bot_29
cd C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29
python -m tests.test_vault_storage
python -m tests.test_device_auth
python -m tests.test_sync_service_pure
python -m tests.test_sync_to_github
python -m tests.test_vault_api
```

## Чеклист (ручная проверка)

### 1. Git bot_29
- [ ] Текущая ветка совпадает с `CONTEXT.md` (сейчас `test/vault-api`)
- [ ] Последний коммит совпадает с `CONTEXT.md` (сейчас `a98ce6b`)
- [ ] Нет незакоммиченных изменений (кроме `secrets/` и `_ai/` если удалён)

### 2. Git test_opencode
- [ ] `test_opencode_clone` на `main`
- [ ] Нет незакоммиченных изменений
- [ ] Нет новых коммитов на GitHub (fetch)

### 3. Файлы существуют
- [ ] `tests/test_vault_storage.py`
- [ ] `tests/test_device_auth.py`
- [ ] `tests/test_sync_service_pure.py`
- [ ] `tests/test_sync_to_github.py`
- [ ] `tests/test_vault_api.py`
- [ ] `services/sync/__init__.py` + 9 модулей
- [ ] `services/sync_service.py` (shim)

### 4. Багфиксы на месте
- [ ] `routers/vault_api.py:60` — `bool(...)` обёртка

### 5. Тесты проходят
- [ ] Все 5 тестов: 64 шага, 0 ошибок

## Результат

Если все пункты зелёные — среда готова, `_ai_for_all` актуален, можно продолжать.
Если есть несовпадения — сначала разобраться, потом работать.
