import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Получение template-элемента.
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  // Создание карточки.
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    // Открытие full-screen попапа.
    const popupShow = document.querySelector('.popup_show');
    const imageShow = document.querySelector('.popup__show-image');
    const titleShow = document.querySelector('.popup__show-title');
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      openPopup(popupShow);
      imageShow.src = this._link;
      imageShow.alt = this._link;
      titleShow.textContent = this._name;
    });

    // Лиснер кнопки лайка.
    this._element.querySelector('.elements__button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__button_active');
    });

    // Лиснер кнопки удаления.
    this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
      evt.target.closest('.elements__card').remove();
    });
  }
}
