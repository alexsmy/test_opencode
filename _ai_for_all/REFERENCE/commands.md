# Frequent Commands

## Git
```powershell
# Посмотреть статус
git status

# Создать новую ветку
git checkout -b <branch-name>

# Коммит
git add -A
git commit -m "краткое описание"

# Пуш (с подтверждением пользователя)
git push origin <branch-name>
```

## PowerShell
```powershell
# Чтение файла (для AI)
Get-Content -LiteralPath "file.txt"

# Поиск файла
Get-ChildItem -Recurse -Filter "*.md" | Select-Object FullName
```

## Проект
```powershell
# Запуск bot_29 локально
Set-Location bot_29; python bot.py

# Синхронизация _ai_for_all
Set-Location test_opencode; git add _ai_for_all/; git commit -m "..."; git push
```

## Vault
```powershell
# Расшифровать секреты
.\VAULT\decrypt.ps1

# Зашифровать секреты
.\VAULT\encrypt.ps1
```
