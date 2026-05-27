# Команды и ссылки

## bot_29 — проверка сервера
- **Главная страница** — https://bot-29-nxw0.onrender.com
- **Vault** — https://bot-29-nxw0.onrender.com/vault
- **Sync status** — https://bot-29-nxw0.onrender.com/sync
- **FileVault** — https://bot-29-nxw0.onrender.com/files
- **Telegram** — @imgtestlivebot

## uastcenter_site — проверка локально
```powershell
start C:\Users\Alex1\Downloads\uastcenter_site\index.html
```

## Запуск тестов bot_29
```powershell
cd C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29
python -m tests.test_vault_storage     # 11 шагов
python -m tests.test_device_auth       # 10 шагов
python -m tests.test_sync_service_pure # 17 шагов
python -m tests.test_sync_to_github    # 8 шагов
python -m tests.test_vault_api         # 18 шагов
```
Запуск всех (рекомендуется):
```powershell
python -m pytest tests/ -v
```

## Git (общее)
```powershell
git status
git checkout -b feat/название
git add -A && git commit -m "feat: описание"
git push origin feat/название  # только с разрешения alexs
```
