# Синхронизация

## Что синхронизируется

| Данные | Куда | Когда |
|---|---|---|
| `_ai_for_all/` | `test_opencode/main/_ai_for_all` | После сессии, при изменениях |
| `synchronization/` | `test_opencode/main/synchronization/` | Авто-воркером на Render |
| `migrate/` (архивы) | `test_opencode/main/migrate/` | При /migrate |

## Протокол
1. `git status` — проверить изменения
2. Показать alexs diff
3. Спросить подтверждение
4. `git add -A && git commit -m "..." && git push origin main`
5. Сообщить результат

## Запрещено
- Пушить без подтверждения alexs
- Использовать `--force`
- Коммитить секреты
