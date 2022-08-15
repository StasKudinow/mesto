export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardName = this._element.querySelector('.elements__name');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._cardName.textContent = this._name;

    return this._element;
  }

  // Функция кнопки лайка.
  _handleLikeButton(evt) {
    evt.target.classList.toggle('elements__button_active');
  }

  // Функция кнопки удаления.
  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // Лиснер full-screen попапа.
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    // Лиснер кнопки лайка.
    this._element.querySelector('.elements__button').addEventListener('click', this._handleLikeButton.bind(this));

    // Лиснер кнопки удаления.
    this._element.querySelector('.elements__trash').addEventListener('click', this._handleTrashButton.bind(this));
  }
}