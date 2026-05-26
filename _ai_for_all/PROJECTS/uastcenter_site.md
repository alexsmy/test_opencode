# Project: uastcenter_site — Сайт НТЦ 'УАСТ'

**Локальная папка**: `C:\Users\Alex1\Downloads\uastcenter_site`
**Репозиторий (облачный дом)**: `alexsmy/test_opencode/_ai_for_all/PROJECTS/uastcenter_site`
**Домен**: https://uast.center

## Суть

Одностраничный статический сайт для Научно-технического центра 'Уралавиаспецтехнология' (НТЦ 'УАСТ').
Содержит информацию о предприятии, направлениях деятельности, проектах и контактах.

## Архитектура

```
uastcenter_site/
├── index.html              — единая страница (193 строки)
│                            Все секции: Hero, About, Directions, Projects, Contact, Footer
├── favicon.ico             — иконка сайта
├── css/
│   ├── style.css           — оркестратор (документация)
│   ├── responsive.css      — адаптивные стили (248 строк)
│   └── modules/
│       ├── variables.css   — CSS-переменные
│       ├── base.css        — сброс, типографика, секции
│       ├── header.css      — шапка и навигация
│       ├── hero.css        — Hero + галерея
│       ├── sections.css    — About, Directions, Projects, Contact, Footer
│       └── components.css  — кнопки, модалка, back-to-top, анимации
├── js/
│   ├── content.js          — весь контент (siteContent)
│   ├── app.js              — оркестратор (импортирует модули, инициализирует)
│   └── modules/
│       ├── renderer.js     — вспомогательные функции (setContent, setStyle и т.д.)
│       ├── navigation.js   — меню, скролл, активная ссылка
│       ├── gallery.js      — слайдер Hero
│       ├── modal.js        — модальное окно
│       └── animations.js   — IntersectionObserver, back-to-top
├── img/                     — изображения (все локальные)
│   ├── svg/                — SVG иконки
│   └── *.jpg / *.png       — фотографии и графика
├── .gitignore
└── _ai_for_all/            — облачная память AI
```

## Ключевые URL
- **Сайт (production)**: https://uast.center
- **Изображения**: https://uast.center/img/
- **Старый WordPress**: https://nppuast.com

## Особенности

### Контент
- Весь контент управляется через `js/content.js` (объект `siteContent`)
- Текст, изображения, кнопки, модальные окна — всё в одном файле
- Для изменения контента достаточно править `content.js`

### Изображения
- Все изображения локальны (`img/...`), внешних ссылок нет
- SVG иконки контактов: `img/svg/`
- WebP-детекция: при поддержке браузером грузятся .webp, fallback на JPG/PNG
- Lazy loading на всех динамических изображениях

### Трекеры
В `index.html` скрипты WordPress-трекера обёрнуты в try-catch + динамическая вставка с onerror:
```html
<script>
(function() {
    try {
        window.tvsData = {...};
        var s = document.createElement('script');
        s.src = '...';
        s.onerror = function() { console.warn('Tracker unavailable'); };
        document.head.appendChild(s);
    } catch(e) {}
})();
</script>
```

### Стилизация
- CSS-переменные в `:root` (цвета, шрифты, отступы, тени)
- Шрифты: Manrope (заголовки), Inter (текст) — через Google Fonts
- Секция Projects на тёмном фоне (overlay rgba(10,37,64,0.9))
- Анимации: IntersectionObserver для reveal-on-scroll, слайдер в Hero
- Мобильное меню: выезжает справа на 50%/75% ширины

### Зависимости
- Google Fonts (Inter, Manrope) — через CDN
- Никаких внешних JS-библиотек (чистый vanilla JS)

## Локальная копия
`C:\Users\Alex1\Downloads\uastcenter_site`
