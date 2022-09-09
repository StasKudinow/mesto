import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._buttonPopup = this._popup.querySelector('.popup__button');
  }

  // Получение массива данных инпутов.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  // Присвоение данных в инпуты.
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // Лиснер сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //Закрытие попапа + сброс.
  close() {
    super.close();
    this._element.reset();
  }

  changeButtonText(text) {
    if(this._buttonPopup.textContent === text) {
      this._buttonPopup.textContent = 'Сохранение...';
    } else {
      this._buttonPopup.textContent = text;
    }
  }
}