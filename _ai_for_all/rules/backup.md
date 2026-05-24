# Backup & Restore

## Команды
- `/backup` — создать локальный архив (`zip`)
- `/backup upload` — архив + загрузка на Render FileVault

## Скрипты (находятся в `SCRIPTs/` проекта bot_29)
| Скрипт | Назначение |
|---|---|
| `SCRIPTs\backup.ps1` | Создать zip-архив |
| `SCRIPTs\restore.ps1` | Скачать архив и восстановить |
| `SCRIPTs\seal.ps1` | Зашифровать SSH-ключ + env-секреты |
| `SCRIPTs\unseal.ps1` | Расшифровать и установить |
| `SCRIPTs\bootstrap.ps1` | Полная настройка нового ПК |

## Что в архиве
- Все конфиги, скрипты, HANDOVER/CONTEXT/USER/AGENTS
- SSH-ключ и env-секреты — зашифрованы

## Хранение
- Render FileVault: папка `migrate/` (3 последних архива)
- GitHub: `alexsmy/test_opencode/migrate/`
