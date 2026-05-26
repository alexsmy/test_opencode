# Security Rules — UAST Center Site

- Все секреты хранятся в `VAULT/variables.json.enc` (AES-256-GCM)
- Мастер-пароль знает только alexs
- Никогда не выводить секреты в лог, в ответы, в сообщения об ошибках
- Для расшифровки: `cd VAULT && .\decrypt.ps1` (запросит пароль)
- Для шифрования: `cd VAULT && .\encrypt.ps1` (запросит пароль)
- `variables.json` (plaintext) — в .gitignore, удалять после шифрования
- Никаких токенов/ключей в HTML, CSS, JS коде
