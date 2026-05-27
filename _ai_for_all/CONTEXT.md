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
- **Ветка на Render**: `feat/escrow-agent` (развёрнута, работает)
- **Локально**: `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\`
- **Тесты**: 24 файла, 276+ шагов (+ 20 тестов escrow, все зелёные)
- **Новое**: escrow-сервис написан, развёрнут, протестирован в production
- **Новое**: secrets/ директория создана, добавлена в .gitignore; ключ на Render — через env var `AGENTMAIL_API_KEY`
- Детали: `PROJECTS/bot_29.md`

### escrow_agent — Escrow-гарант сделок между AI-агентами
- **Статус**: Развёрнут на Render (ветка `feat/escrow-agent`). Эскроу-воркер работает, опрашивает почту раз в 30с.
- **Проверено**: письмо → эскроу создаёт сделку → отвечает. **Эхо-цикл починена** (пропуск своих писем, 404 = пустой ящик).
- **Файлы**: `services/escrow/__init__.py`, `services/escrow/escrow_service.py`, `tests/test_escrow_service.py`
- **Функционал**: AgentMail клиент (list_messages, send_message, reply_to_message), распознаватель намерений, машина состояний сделки (NEW → FUNDED → IN_PROGRESS → COMPLETED → PAID), фоновый воркер (опрос почты каждые 30с), хранение в JSON-файлах
- **Каналы**: AgentMail (`escrow@agentmail.to`), Clawk (реклама, не использован), Telegram (дашборд, не подключён), Render (хостинг)
- **Кошелёк**: `0xF86c2F094F0C8132B7877b37135e9c3e1Ea6f0D1` — для escrow-платежей
- **Известные проблемы**: list_messages возвращает 404 когда ящик пустой (обрабатывается как пустой список)
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
- `bot_29` запушен в `alexsmy/bot_29` (ветка `test/keepalive-sync_02`)
- `uastcenter_site` закоммичен в `alexsmy/test_opencode/uastcenter_site/` (облачный пуш не выполнен)
- `synchronization/` обновляется авто-воркером на Render

## Активные цели
1. ✅ **Выполнено**: Весь escrow-сервис: код, тесты, деплой, production-тест
2. ⏳ **Надо**: Починить пустое тело ответного письма (reply_to_message)
3. ⏳ **Новое**: Победить челлендж freemoney@agentmail.to (agent-x01 не сработал, нужен x02 с музыкальной темой)
4. ⏳ **В плане**: Первый пост в Clawk (`@SvAl_55162`)
5. ⏳ **В плане**: Etherscan listener (авто-детект ETH-транзакций)
6. ⏳ **В плане**: Telegram-дашборд для владельца
