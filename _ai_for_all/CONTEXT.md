# Current Context — UAST Center Site

Дата: 26.05.2026.

## Активные проекты

### uastcenter_site — Сайт НТЦ 'УАСТ'
- **Локальная папка**: `C:\Users\Alex1\Downloads\uastcenter_site`
- **Git**: инициализирован (ветка `main`)
- **Стек**: HTML5, CSS3 (vanilla), JavaScript (vanilla ES6 modules), Google Fonts
- **Описание**: Статический одностраничный сайт для Научно-технического центра 'Уралавиаспецтехнология'.
  Секции: Hero, О предприятии, Направления, Проекты, Контакты, Подвал.
  Контент управляется через `js/content.js` (один объект siteContent).
- **Домен (production)**: https://uast.center

## Текущий статус (после сессии 2 — рефакторинг и аудит)
- **Модульная структура**: CSS и JS разбиты на модули с файлами-оркестраторами
- **JS модули**: js/app.js (оркестратор) + modules/{renderer,navigation,gallery,modal,animations}.js
- **CSS модули**: style.css (документация-оркестратор) + modules/{variables,base,header,hero,sections,components}.css
- **Орфография**: полностью исправлена (7 ошибок)
- **Изображения**: все URL локализованы в `img/...` (внешних ссылок нет)
- **Мёртвый код**: удалён (hero.buttons, heroButtonsContainer)
- **aboutButton**: теперь видима (была display:none)
- **Трекеры**: сохранены, обёрнуты в try-catch с onerror-обработчиками
- **Слайдер Hero**: защита от пустого массива, корректная остановка интервала
- **Lazy loading**: добавлен на все динамические изображения
- **IntersectionObserver**: fallback для старых браузеров
- **WebP**: детекция поддержки + <picture>-элементы с fallback
- **Footer**: добавлена строка version_2 (opacity: 0.5)

## Структура проекта
```
uastcenter_site/
├── index.html              — главная страница (193 строки)
├── favicon.ico
├── css/
│   ├── style.css           — оркестратор (документация)
│   ├── responsive.css      — адаптивные стили
│   └── modules/
│       ├── variables.css   — CSS-переменные
│       ├── base.css        — сброс, типографика, секции
│       ├── header.css      — шапка и навигация
│       ├── hero.css        — Hero + галерея
│       ├── sections.css    — About, Directions, Projects, Contact, Footer
│       └── components.css  — кнопки, модалка, back-to-top, анимации
├── js/
│   ├── content.js          — контент (siteContent объект)
│   ├── app.js              — оркестратор
│   └── modules/
│       ├── renderer.js     — вспомогательные функции (setContent и т.д.)
│       ├── navigation.js   — меню, скролл, активная ссылка
│       ├── gallery.js      — слайдер Hero
│       ├── modal.js        — модальное окно
│       └── animations.js   — IntersectionObserver, back-to-top, скролл шапки
├── img/
│   └── svg/
└── _ai_for_all/
```

## Платформа
- **Текущая платформа**: Windows (PowerShell 5.1)
- **Инструменты**: Git 2.54.0

## Статус синхронизации
- `_ai_for_all` запушен в `alexsmy/test_opencode`
- Весь проект `uastcenter_site` добавлен в `alexsmy/test_opencode/uastcenter_site/`
- Локальный репозиторий: commited (не запушен — удалённого remote нет)
