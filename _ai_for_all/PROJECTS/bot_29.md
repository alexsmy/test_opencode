# Project: bot_29

**Репозиторий**: `https://github.com/alexsmy/bot_29`
**Ветка**: `feat/email-to-telegram-forward` (актуальная, на Render)

## Суть

FastAPI-сервер с Telegram-ботом (aiogram), запускается через `python bot.py`.
Хостится на Render.com. Обеспечивает: веб-дашборд, файловое хранилище, CRPT, погоду,
галактические часы, vault для паролей, синхронизацию с GitHub, почтовый агент (пересылка в TG).

## Архитектура

```
bot.py                 — точка входа (FastAPI + lifespan)
config/                — конфиги (keep_alive, sync_settings, security)
routers/               — REST API роутеры
services/              — сервисы (sync, agents, telegram, keepalive)
templates/             — HTML-шаблоны (Jinja2)
static/                — статика (CSS, JS)
data/                  — данные (vault, filevault_uploads, agents, etc.)
project/               — фронтенд-проекты (sbor, crpt, filevault, radio, time)
secrets/               — токены (НЕ в git)
```

## Ключевые URL
- **Render**: https://bot-29-nx0w.onrender.com
- **FileVault**: https://bot-29-nx0w.onrender.com/files
- **Vault**: https://bot-29-nx0w.onrender.com/vault
- **MCP**: https://bot-29-nx0w.onrender.com/mcp

## Переменные окружения (на Render)
- SYNC_GITHUB_TOKEN — токен для пуша в test_opencode
- TELEGRAM_BOT_TOKEN — токен @imgtestlivebot
- TELEGRAM_CHAT_ID — 1252058698
- AGENTS_TUNNEL_SECRET — секрет MCP
- TELEGRAM_TUNNEL_SECRET — секрет уведомлений

## Синхронизация
- Сервер автоматически пушит данные в `alexsmy/test_opencode/synchronization/`
- Настройки: `config/sync_settings.json`
- Воркер проверяет события каждые ~6с

## Обновление weather агента (ветка feat/weather-any-city)

- Агент больше не хардкодит Уфу. Определяет местоположение:
  - По координатам в запросе: "55.75, 37.62"
  - По названию города (рус/англ): "Москва", "London", "погода в Сочи"
  - Через args: `{"latitude": 55.75, "longitude": 37.62}`
- Использует Open-Meteo Geocoding API (бесплатно, без ключа)
- Добавлены поля в ответ: pressure, cloud_cover, wind_direction, wind_gusts, is_day
- MCP инструмент get_weather() принимает параметры: location, latitude, longitude
- Тесты: 9 шт, все зелёные

## Тесты (всего 23 файла, 256+ шагов)
- `tests/test_vault_storage.py` — CRUD vault storage (11 шагов)
- `tests/test_device_auth.py` — 2FA авторизация устройств (10 шагов)
- `tests/test_sync_service_pure.py` — чистые функции sync (17 шагов)
- `tests/test_sync_to_github.py` — sync_to_github с моками (8 шагов)
- `tests/test_vault_api.py` — REST API Vault через TestClient (18 шагов)

**Запуск всех тестов:**
```powershell
cd C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29
python -m tests.test_vault_storage
python -m tests.test_device_auth
python -m tests.test_sync_service_pure
python -m tests.test_sync_to_github
python -m tests.test_vault_api
```

## Структура services/sync/
```
services/
├── sync_service.py        ← shim (2 строки, обратная совместимость)
└── sync/
    ├── __init__.py         ← реэкспорт всех публичных функций
    ├── utils.py            ← _compute_hash, _now_iso, _is_meaningful_json
    ├── settings.py         ← настройки синхронизации
    ├── manifest.py         ← манифест отправленных файлов
    ├── chunking.py         ← дробление больших файлов
    ├── github.py           ← все запросы к GitHub API
    ├── collectors.py       ← сбор данных (keepalive, filevault, crpt, agents, vault)
    ├── restore.py          ← восстановление с GitHub
    ├── notify.py           ← Telegram-уведомления о синхронизации
    └── worker.py           ← оркестрация, триггеры, фоновый воркер
```

## Локальная копия
`C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
