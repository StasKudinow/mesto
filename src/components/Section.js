export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка массива.
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Добавление элемента в DOM.
  addItem(item) {
    this._container.prepend(item);
  }

  renderAppendItems(item) {
    this._container.append(item);
  }
}