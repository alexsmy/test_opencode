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
├── index.html              — единая страница (176 строк)
│                            Все секции: Hero, About, Directions, Projects, Contact, Footer
├── favicon.ico             — иконка сайта
├── css/
│   ├── style.css           — основные стили (647 строк)
│   │   Переменные CSS, типографика, шапка, Hero, About
│   │   Directions, Projects, модальное окно, Contact, Footer
│   │   Анимации (reveal-on-scroll, back-to-top)
│   └── responsive.css      — адаптивные стили (248 строк)
│       Брейкпоинты: 1024px (планшеты), 768px (мобильные), 480px (маленькие)
├── js/
│   ├── content.js           — весь контент в объекте siteContent (156 строк)
│   │   global, navigation, hero, about, directions, projects, contact, footer
│   └── app.js               — логика (364 строк)
│       Заполнение контента, мобильное меню, скролл, анимации
│       Модальное окно, слайдер Hero, активная навигация
├── img/                     — изображения
│   ├── svg/                 — SVG иконки (envelope, location-pin, phone)
│   ├── *.jpg / *.png        — фотографии и графика
└── _ai_for_all/             — облачная память AI
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
- Все изображения хостятся на https://uast.center/img/ и https://nppuast.com/wp-content/uploads/
- Логотип: `https://uast.center/img/logo.png` (но в HTML src пустой, заполняется из content.js)
- SVG иконки контактов: локально `img/svg/`

### Трекеры
В `index.html` установлены скрипты WordPress-трекера (строки 19-23):
```html
<script>
var tvsData = {'ajax_url': 'https://nppuast.com/wp-admin/admin-ajax.php', ...};
</script>
<script src="https://nppuast.com/wp-content/plugins/wp_15381/includes/tracker/tvs-fingerprint.js?ver=2.803"></script>
<script src="https://nppuast.com/wp-content/plugins/wp_15381/includes/tracker.js?ver=2.803"></script>
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
