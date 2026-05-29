# MCP — Работа с почтовым агентом

## Транспорт

MCP-сервер доступен по Streamable HTTP на Render:
- **URL**: `https://bot-29-nx0w.onrender.com/mcp/`
- **Без аутентификации** — путь `/mcp/` в белом списке middleware
- **Сессия**: каждый ответ содержит `mcp-session-id`, его нужно передавать в следующих запросах

### Заголовки
```
Content-Type: application/json
Accept: application/json
mcp-session-id: <session_id>
```

### Обязательный протокол

1. Получить session ID (из заголовка любого ответа)
2. Вызвать `initialize`:
   ```json
   {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"opencode","version":"1.0"}}}
   ```
3. После успешной инициализации можно вызывать инструменты

## Доступные почтовые MCP-инструменты

### mail_list — список писем
```json
{"name":"mail_list","arguments":{"unread_only":true}}
```
- `unread_only: bool` — только непрочитанные (true) или все (false)
- Возвращает: отправитель, тема, время, метки

### mail_get — полное содержимое письма
```json
{"name":"mail_get","arguments":{"message_id":"<id>"}}
```
- `message_id: str` — обязательный, ID письма
- Возвращает: полный разбор (отправитель, тема, тело, вложения)

### mail_delete — удалить письмо(а)
```json
{"name":"mail_delete","arguments":{"message_ids":"<id1>,<id2>"}}
```
- `message_ids: str` — ID через запятую
- Возвращает: сколько удалено, ошибки

### mail_send — отправить письмо
```json
{"name":"mail_send","arguments":{"to":"user@example.com","subject":"Тема","body":"Текст"}}
```
- Все поля обязательны

### mail_clean_old — удалить старые обработанные
```json
{"name":"mail_clean_old","arguments":{"keep_last":0}}
```
- `keep_last: int` — сколько последних оставить (0 = все)

### mail_status — статус агента
```json
{"name":"mail_status","arguments":{}}
```
- Возвращает: конфиг (inbox, poll, auto_reply, forward), unread_count, tracked_processed

### mail_inbox_list — список всех ящиков аккаунта
```json
{"name":"mail_inbox_list","arguments":{}}
```

### mail_inbox_create — создать новый ящик
```json
{"name":"mail_inbox_create","arguments":{"email":"newbox@agentmail.to"}}
```

## Пример полного вызова (PowerShell)

```powershell
# 1. Получить session ID
$headers = curl.exe -s -D - -o nul "https://bot-29-nx0w.onrender.com/mcp/" `
  -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{}' 2>&1
$sessionId = ""
foreach ($line in $sessionHeaders) {
  if ($line -match 'mcp-session-id:\s*(\S+)') { $sessionId = $matches[1] }
}

$h = @{"mcp-session-id"=$sessionId; "Accept"="application/json"}

# 2. Initialize
Invoke-RestMethod -Uri "https://bot-29-nx0w.onrender.com/mcp/" -Method Post `
  -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{...}}' `
  -ContentType "application/json" -Headers $h

# 3. Вызвать инструмент
Invoke-RestMethod -Uri "https://bot-29-nx0w.onrender.com/mcp/" -Method Post `
  -Body '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"mail_list","arguments":{"unread_only":true}}}' `
  -ContentType "application/json" -Headers $h
```

## Ограничения

- track_processed = 0 — из-за эфемерной ФС Render'а (processed_ids.json не сохраняется между рестартами)
- Нет MCP-инструмента для изменения конфига (auto_reply_enabled, forward_to_telegram) — можно добавить динамически через `/api/agents/mcp-tools/register` или изменить файл локально
- Нет MCP-инструмента для просмотра/списка вложений отдельно от письма
- Старые письма не фильтруются по времени (но processed_ids не теряются в рамках одной сессии воркера)
