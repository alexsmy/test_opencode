# Current Context

Общий контекст всех проектов. Дата: 28.05.2026. (обновлено)

## Активные проекты

### bot_29 — FastAPI + Telegram бот
- **Репозиторий**: https://github.com/alexsmy/bot_29
- **Сервер**: Render.com — https://bot-29-nx0w.onrender.com
- **Стек**: Python 3.13.3, FastAPI, aiogram, uvicorn
- **Описание**: Многофункциональный сервер: веб-дашборд, FileVault, Vault, CRPT, погода, галактические часы, Telegram-бот, cloud sync, MCP-сервер, escrow-сервис
- **Агенты**: 3 встроенных (test_echo, weather_monitor, weather_notifier) + динамические
- **MCP**: 3 встроенных инструмента (get_weather, send_weather_to_telegram, send_telegram_message)
- **Ветка на Render**: `feat/email-to-telegram-forward` (развёрнута, работает)
- **Локально**: `C:\Users\Alex1\Downloads\my_work_now\bot_29\`
- **Тесты**: 30 файлов, 298+ шагов (+ 24 теста API auth, все зелёные)
- **Аутентификация**: Единый ключ `API_SECRET_KEY` на все эндпоинты. Middleware проверяет X-Api-Key или cookie. Localhost bypass для внутреннего трафика. Убраны дублирующие проверки (telegram tunnel secret, agents tunnel secret).
- **Защита**: escrow (7), filevault (18), agents (10), sync (5), telegram tunnel (2), telegram inbox (5), crpt (3). Белый список: /api/health, /, /vault, статика.
- **Логин**: `/auth/login` — страница ввода ключа, HMAC-cookie (30 дней).
- Детали: `PROJECTS/bot_29.md`

### escrow_agent — Почтовый агент (пересылка в Telegram)
- **Статус**: Развёрнут на Render. Воркер опрашивает почту раз в 30с, пересылает письма в Telegram.
- **Флоу**: письмо на `escrow@agentmail.to` → воркер читает → парсит (от кого, тема, содержание) → пересылает в Telegram → автоответ ОТКЛЮЧЁН.
- **Файлы**: `services/escrow/escrow_service.py`, `tests/test_escrow_service.py`
- **Функционал**: AgentMail клиент (list_messages, get_message, send_message, reply_to_message), распознаватель намерений, фоновый воркер (30с), пересылка в Telegram, хранение сделок в JSON.
- **Ключевой баг исправлен**: API AgentMail отдаёт только `preview` в списке — добавлен дозапрос по ID для получения полного тела.
- **Автоответ**: ОТКЛЮЧЁН (`AUTO_REPLY_ENABLED = False`). Включается по решению.
- **Каналы**: AgentMail (`escrow@agentmail.to`), Telegram (пересылка), Render (хостинг)
- **Кошелёк**: `0xF86c2F094F0C8132B7877b37135e9c3e1Ea6f0D1`
- **Детали**: `PROJECTS/escrow_agent.md`

### uastcenter_site — Сайт НТЦ 'УАСТ'
- **Репозиторий**: `alexsmy/test_opencode` (в папке `uastcenter_site/`)
- **Домен**: https://uast.center
- **Стек**: HTML5, CSS3 (vanilla ES6 modules), JavaScript (vanilla), Google Fonts
- **Описание**: Статический одностраничный сайт. Секции: Hero, О предприятии, Направления, Проекты, Контакты, Подвал.
- **Статус**: Полный аудит, рефакторинг, модульная архитектура, WebP, lazy loading
- **Локально**: `C:\Users\Alex1\Downloads\uastcenter_site`
- Детали: `PROJECTS/uastcenter_site.md`

### test_opencode — Мой облачный дом
- **Репозиторий**: https://github.com/alexsmy/test_opencode/tree/main
- **Ветка**: `main`
- **Роль**: **Единственный облачный источник правды**. Здесь корни, память, правила, секреты.
- **Содержит**:
  - `_ai_for_all/` — облачная память (правила, профиль, контекст, проекты, VAULT)
  - `synchronization/` — память проекта bot_29 (НИКОГДА НЕ УДАЛЯТЬ)
  - `uastcenter_site/` — полный код сайта НТЦ 'УАСТ'
  - `migrate/` — архивы для миграции между ПК

## Платформа
- **Текущая платформа**: Windows (PowerShell 5.1)
- **Инструменты**: Git 2.54.0, Python 3.13.3

## Статус синхронизации
- `_ai_for_all` смержен: bot_29 + uastcenter_site
- `bot_29` запушен в `alexsmy/bot_29` (ветки: `feat/unified-api-auth`, `feat/email-to-telegram-forward`)
- `uastcenter_site` закоммичен в `alexsmy/test_opencode/uastcenter_site/` (облачный пуш не выполнен)
- `synchronization/` обновляется авто-воркером на Render

## Активные цели
1. ✅ **Выполнено**: Единая аутентификация (один ключ на всё)
2. ✅ **Выполнено**: Пересылка писем из почты в Telegram
3. ✅ **Выполнено**: Исправлен баг с пустым телом письма (дозапрос по ID)
4. ⏳ **Новое**: Расширить флоу почтового агента (следующие шаги обсуждаются)
5. ⏳ **В плане**: Победить челлендж freemoney (agent-x02 с музыкальной темой)
6. ⏳ **В плане**: Etherscan listener (авто-детект ETH-транзакций)
7. ⏳ **В плане**: Telegram-дашборд для владельца
