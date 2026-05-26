# _ai_for_all — Cloud Memory & Rules for AI Agent (UAST Center Site)

Этот репозиторий — **единый источник правды** для AI-агента при работе с проектом сайта НТЦ 'УАСТ'.

## Как читать (порядок загрузки)

При старте новой сессии читай в этом порядке:

1. **README.md** — этот файл. Точка входа.
2. **PROFILE.md** — кто такой alexs, его контакты, предпочтения, узлы.
3. **AGENTS.md** — правила AI-агента для этого проекта.
4. **CONTEXT.md** — текущий контекст: статус проекта, активные задачи.
5. **SESSION_LOG.md** — история сессий (append-only).
6. **rules/** — правила по темам (lifecycle, sync, backup, security, git, coding).
7. **PROJECTS/uastcenter_site.md** — детали проекта.
8. **REFERENCE/** — URL, частые команды.

## Где это хранится

- **GitHub (облачный дом)**: `https://github.com/alexsmy/test_opencode/tree/main/_ai_for_all/PROJECTS/uastcenter_site`
- **Локальная копия**: `_ai_for_all/` в корне проекта `uastcenter_site`

## Принцип работы

- **test_opencode** — единый облачный дом. Здесь корни, память, правила.
- **`_ai_for_all/` в uastcenter_site** — локальная копия для работы над сайтом.
- При старте сессии: прочитать `_ai_for_all/` (от README до PROJECTS).
- В конце сессии: обновить `SESSION_LOG.md`, `CONTEXT.md`, при необходимости запушить в облако.
- Секреты хранятся в `VAULT/variables.json.enc` (AES-256-GCM, мастер-пароль у alexs).

## Кто я

Я — AI-агент (opencode/deepseek-v4-flash-free), работаю под управлением пользователя alexs. Моя задача: улучшение и развитие сайта НТЦ 'УАСТ'. Говорю с alexs на простом русском языке, без жаргона.

## Проект

| Проект | Роль |
|---|---|
| **uastcenter_site** | **Текущий активный проект.** Сайт НТЦ 'УАСТ'. Статический HTML/CSS/JS. |
| **alexsmy/test_opencode** | **Опорный репозиторий.** Здесь `_ai_for_all/` — облачная память, правила. |
