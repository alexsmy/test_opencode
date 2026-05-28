# Project: Почтовый агент (Escrow → Telegram)

**Статус**: ✅ Развёрнут на Render, работает. Письма пересылаются в Telegram.
**Репозиторий**: `alexsmy/bot_29` (ветка: `feat/email-to-telegram-forward`)
**Хостинг**: Render.com (существующий сервер bot_29)

## Суть

Почтовый агент читает входящие письма на `escrow@agentmail.to` и пересылает их содержимое в Telegram владельцу.

**Текущий флоу:**
1. Письмо приходит на `escrow@agentmail.to`
2. Воркер опрашивает ящик каждые 30 секунд
3. Парсит: от кого, тема, содержание
4. Форматирует с HTML-разметкой
5. Отправляет в Telegram через локальный туннель
6. Автоответ ОТКЛЮЧЁН

**Формат сообщения в Telegram:**
```
📬 Новое письмо на escrow@agentmail.to

От: someone@gmail.com
Тема: Test deal

Содержание:
Текст письма...
```

## Технический стек

- **Язык**: Python 3.13.3
- **HTTP-клиент**: httpx (для AgentMail API + локального Telegram туннеля)
- **Фреймворк**: FastAPI (lifespan для воркера)
- **Платформа**: Render.com
- **Почта**: AgentMail REST API (ключ в ENV `AGENTMAIL_API_KEY`)
- **Telegram**: Локальный туннель `http://localhost:{port}/mytelegram`
- **Хранилище**: JSON-файлы в `data/escrow/`

## Архитектура

```
services/escrow/
├── __init__.py
└── escrow_service.py      ← весь код:
    ├── AgentMailClient    ← REST API (list_messages, get_message, send_message, reply_to_message)
    ├── _forward_to_telegram() ← форматирование и отправка в TG
    ├── _identify_intent() ← распознавание намерений (пока не используется)
    ├── _process_message() ← основной флоу: чтение → парсинг → пересылка в TG
    ├── _escrow_worker()   ← фоновый опрос почты (30с)
    └── start/stop_escrow_service() ← для lifespan

tests/
└── test_escrow_service.py ← 20 тестов (10 синхр. + 10 асинхр.)
```

## Ключевые особенности

### Чтение писем
- API AgentMail при списке сообщений отдаёт **только `preview`** (обрезанный текст)
- Полное тело письма — отдельным запросом по message_id (`get_message()`)
- Если тело пустое после первого разбора — делается дозапрос
- Fallback на `preview` если поле `body` не найдено

### Пересылка в Telegram
- Функция `_forward_to_telegram()` форматирует письмо с HTML
- Отправляет через локальный туннель `http://localhost:{port}/mytelegram`
- Middleware пропускает localhost без ключа (байпас для внутреннего трафика)

### Автоответ
- ОТКЛЮЧЁН (`AUTO_REPLY_ENABLED = False`)
- Включается по решению владельца
- Шаблоны ответов сохранены в `DEAL_REPLY_TEMPLATES`

## Каналы

| Канал | Назначение | Статус |
|-------|-----------|--------|
| AgentMail (`escrow@agentmail.to`) | Приём писем | ✅ Работает |
| Telegram (@imgtestlivebot) | Пересылка писем | ✅ Работает |
| Render | Хостинг | ✅ Работает |

## Ключи доступа

| Ключ | Где хранится | Для чего |
|------|-------------|----------|
| `API_SECRET_KEY` | ENV Render + `secrets/api_secret_key.txt` | Доступ ко всем API |
| `AGENTMAIL_API_KEY` | ENV Render + `secrets/agentmail_api_key.txt` | Доступ к AgentMail API |

## Тесты

- 20 тестов escrow-сервиса (синхронные — все зелёные)
- 86 общих тестов проекта — все зелёные
- Тесты аутентификации: 24 теста — все зелёные

## План развития

1. ✅ Код + тесты escrow-сервиса
2. ✅ Деплой на Render
3. ✅ Пересылка писем в Telegram
4. ✅ Исправлен баг с пустым телом письма
5. ⏳ Расширение флоу (следующие шаги обсуждаются)
6. ⏳ Автоответ (по решению)
7. ⏳ Etherscan listener (авто-детект оплаты)
8. ⏳ Freemoney challenge (agent-x02)

## Локальные файлы

- `C:\Users\Alex1\Downloads\my_work_now\bot_29\secrets\agentmail_api_key.txt` — AgentMail API-ключ
- `C:\Users\Alex1\Downloads\my_work_now\bot_29\services\escrow\escrow_service.py` — основной код
- `C:\Users\Alex1\Downloads\my_work_now\bot_29\tests\test_escrow_service.py` — тесты
