export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Отрисовка массива.
  renderitems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // Добавление элемента в DOM.
  addItem(item) {
    this._container.prepend(item);
  }
}