# Команды и ссылки

## Основные URL
- Render: https://bot-29-nx0w.onrender.com
- Vault: https://bot-29-nx0w.onrender.com/vault
- Sync status: https://bot-29-nx0w.onrender.com/sync
- FileVault: https://bot-29-nx0w.onrender.com/files
- Telegram: @imgtestlivebot

## Как проверить что всё работает после рефакторинга

1. **Главная страница** — открыть https://bot-29-nx0w.onrender.com
   - Если загружается — импорты работают

2. **Vault** — открыть https://bot-29-nx0w.onrender.com/vault
   - Если группы и записи видны — API не сломан

3. **Sync status** — открыть https://bot-29-nx0w.onrender.com/sync
   - Должна показать статус синхронизации, настройки

4. **Telegram-бот** — написать @imgtestlivebot команду `/start`
   - Если приходит меню с кнопками — бот работает
   - Нажать «💾 Синхронизация» → проверить статус

5. **Health check** — Render Dashboard → Logs
   - Проверить что нет ошибок `ImportError` или `ModuleNotFoundError`
   - Искать `sync: Фоновый синхронизатор запущен` в логах

## Запуск тестов локально
```powershell
cd C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29
python -m tests.test_vault_storage
python -m tests.test_device_auth
python -m tests.test_sync_service_pure
```

## Telegram команды (бот)
- `/start` — главное меню (кнопки: Автоподдержка, Файлы, Радио, Шифратор, Сборщик, Часы, Синхронизация)
- `/hub` — то же самое
