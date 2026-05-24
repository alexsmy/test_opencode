# Telegram-уведомления

- Уведомления включены (уровень: all)
- Бот: @imgtestlivebot
- После значимых действий — отправлять краткое уведомление
- Формат: HTML-разметка (жирный, код, курсив)

## Отправка через PowerShell
```powershell
powershell -File telegram-hub/notify.ps1 -Message "<b>текст</b>"
```

## Отправка через сервер (Render)
```sh
sh telegram-hub/notify.sh "текст"
```
