# Project: Escrow-агент — Uber для AI-агентов

**Статус**: ✅ Развёрнут на Render, полный цикл подтверждён. Есть мелкий баг (пустое тело ответа).
**Репозиторий**: `alexsmy/bot_29` (ветка: `feat/escrow-agent`)
**Хостинг**: Render.com (существующий сервер bot_29)

## Суть

Платформа-гарант (escrow) для безопасных сделок между AI-агентами.

**Как работает:**
1. Агент A (заказчик) пишет на `escrow@agentmail.to` с описанием задачи
2. Escrow-сервис создаёт сделку, отвечает с ID и адресом для оплаты
3. A отправляет ETH на escrow-кошелёк `0xF86c2F...`
4. B делает работу и сообщает о завершении
5. A подтверждает, что работа выполнена (или проходит авто-релиз через 48ч)
6. Сервер отправляет B ETH (минус 5% комиссия)

**Проблема:** AI-агенты не могут безопасно обмениваться услугами — нет доверия.
**Решение:** Наш сервер — гарант. Никто не теряет деньги.

## Статус сделок (state machine)

```
NEW → (оплата) → FUNDED → (работа сделана) → IN_PROGRESS → (подтверждение) → COMPLETED → PAID
                                                                        ↘ DISPUTED
```

- **NEW** — создана, ждёт оплаты
- **FUNDED** — ETH получен на кошелёк
- **IN_PROGRESS** — агент работает
- **COMPLETED** — заказчик подтвердил
- **PAID** — выплачено агенту
- **DISPUTED** — спор, нужен админ

## Каналы

| Канал | Назначение | Статус |
|-------|-----------|--------|
| AgentMail (`escrow@agentmail.to`) | Приём заказов от агентов | ✅ Работает |
| Clawk.ai (`@SvAl_55162`) | Реклама среди агентов | ⏳ Нет постов |
| Telegram (@imgtestlivebot) | Дашборд для владельца | ✅ Есть |
| Render | Хостинг escrow-сервиса | ✅ Есть |
| Etherscan API | Мониторинг ETH-транзакций | ⏳ Нужен API-ключ |

## Технический стек

- **Язык**: Python 3.13.3
- **HTTP-клиент**: httpx (для AgentMail API)
- **Фреймворк**: FastAPI (lifespan для воркера)
- **Платформа**: Render.com
- **Почта**: AgentMail REST API (ключ в `secrets/agentmail_api_key.txt`)
- **Блокчейн**: Ethereum Mainnet (тест: Sepolia)
- **Кошелёк**: `0xF86c2F094F0C8132B7877b37135e9c3e1Ea6f0D1`
- **Хранилище**: JSON-файлы в `data/escrow/deal_*.json`
- **Уведомления**: Telegram (aiogram) — пока не подключено
- **Комиссия**: 5%

## Архитектура (актуальная)

```
services/escrow/           ← пакет эскроу-сервиса
├── __init__.py            ← пустой
└── escrow_service.py      ← весь код:
    ├── AgentMailClient    ← REST API обёртка (list_messages, send_message, reply_to_message)
    ├── _identify_intent() ← распознавание намерений письма
    ├── _process_message() ← маршрутизация по намерениям
    ├── _save_deal/_load_deals() ← JSON-хранилище
    ├── _escrow_worker()   ← фоновый опрос почты (30с)
    └── start/stop_escrow_service() ← для lifespan

tests/
└── test_escrow_service.py ← 20 тестов (10 синхр. + 10 асинхр.)
```

## План развития

1. ✅ Escrow-сервис: код + тесты
2. ✅ Деплой на Render (ветка `feat/escrow-agent`)
3. ✅ Проверка: тестовое письмо → ответ от эскроу
4. ✅ Echo-loop починена (timestamp filter)
5. ⏳ **Починить пустое тело ответа** (reply body)
6. ⏳ **Победить freemoney challenge** (agent-x02 с музыкальной темой)
7. ⏳ Первый пост в Clawk
8. ⏳ Etherscan listener (авто-детект оплаты)
9. ⏳ Telegram-дашборд для владельца

## Freemoney Challenge (AgentMail freemoney@agentmail.to)

**Цель:** Убедить AI-агента freemoney отправить деньги (челлендж от создателей AgentMail).

**Попытки:**

| # | Inbox | Угол | Результат |
|---|-------|------|-----------|
| 1 | escrow@ | JSON-формат | rejected |
| 2 | escrow@ | Философия | rejected |
| 3 | escrow@ | Roast | rejected |
| 4 | escrow@ | Юмор | rejected |
| 5 | escrow@ | Честность | rejected |
| 6 | escrow@ | Продукт (Escrow Agent) | rejected |
| 7 | agent-x01 | Value exchange (play game) | rejected |

**Ключевая информация:**
- Другие агенты (Hermes от NousResearch) побеждают и получают $8-$100
- Владелец челленджа говорит о музыкальной отсылке — кто понял, тот победил
- Агент требует "new thread with better angle"
- Нужен свежий inbox для каждой новой попытки (старые "сгорают")

**Следующий шаг:** agent-x02 с музыкальной темой.

## Локальные файлы

- `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\secrets\agentmail_api_key.txt` — AgentMail API-ключ
- `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\services\escrow\escrow_service.py` — основной код
- `C:\Users\alexs\Downloads\my_work_now\my_work_now\bot_29\tests\test_escrow_service.py` — тесты
