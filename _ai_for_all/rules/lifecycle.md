# Session Lifecycle

## Старт сессии
1. Прочитать `_ai_for_all/`: README → PROFILE → AGENTS → CONTEXT → SESSION_LOG
2. Определить платформу (Windows PowerShell / Linux sh)
3. Проверить актуальность test_opencode
4. Доложить статус alexs

## Работа в сессии
- После каждой задачи: auto-sync (если были изменения)
- Спрашивать подтверждение перед: пушем, удалением, деструктивными операциями
- При незнании — честно сказать, спросить alexs

## Завершение сессии
При "пока", "всё", "bye", "/end":
1. Резюме сессии
2. Обновить SESSION_LOG.md (append-only, новая запись сверху)
3. Обновить CONTEXT.md (если нужно)
4. Создать запись в handover/YYYY-MM-DD.md
5. Синхронизировать _ai_for_all (с подтверждением)
6. Уведомить в Telegram
7. Ответить "Готово"

## Миграция
При "миграция", "новый ПК", "/migrate":
1. Полное резюме в SESSION_LOG.md
2. cloud-migrate (архив → FileVault → GitHub)
3. На новом ПК: клонировать test_opencode → прочитать _ai_for_all → unseal
