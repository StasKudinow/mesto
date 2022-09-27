# __Mesto - интерактивный одностраничный сайт__

## __Функциональность проекта:__
* Возможномть добавления и удаления карточек с фото и названием, при помощи взаимодействия с сервером;
* Возможность лайкать карточки и открывать полноразмерные фото, так же через связь с сервером;
* Форма редактирования профиля сохраняет данные на сервер, отображаемые на странице;
* Включена валидация форм при помощи __JavaScript__.

## __Технологии в проекте:__

### HTML:
* Семантическая верстка;
* Названия классов по __БЭМ__.

### CSS:
* Все стили подключены в одном файле стилей с помощью директивы `@import`;
* Шрифты подключены с помощью директивы `@font-face`;
* Адаптивность сайта реализована с помощью медиа-запросов `@media`;
* В верстке используются __Flex__ и __Grid__ технологии;
* Эффекты при наведении на интерактивные элементы при помощи псевдокласса `hover:`;
* Анимация плавного появления модальных окон;
* Сайт сверстан по макету [Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1). При верстке использовалось расширение для Chrome - __Pixel Perfect__.

### JavaScript:
* Подключена кастомная валидация форм;
* __API__ используется для отправки и получения данных с удаленного сервера;
* Соблюдена парадигма __ООП__. Классы разделены на отдельные модули, каждый - с уникальной функциональностью. Общая функциональность проекта собрана в файле `index.js`;
* Сборка осуществлена посредством __Webpack__.

### Файловая структура:
* __БЭМ Nested__.

## __URL:__
[GitHub Pages](https://staskudinow.github.io/mesto/)