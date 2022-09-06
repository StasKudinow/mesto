export default class Card {
  constructor({ data, handleCardClick, handleCardDelete }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._idCard = data._id;
    this._owner = data.owner._id;
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
    this._cardCounter = this._element.querySelector('.elements__counter');
    this._buttonTrash = this._element.querySelector('.elements__trash');
    this._buttonLike = this._element.querySelector('.elements__button');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._cardName.textContent = this._name;
    this._cardCounter.textContent = this._likes;

    if(this._owner === 'ee65f85e444fb325a8167792') {
      return this._element;
    } else {
      this._buttonTrash.remove();
      return this._element;
    }
  }

  // Функция кнопки лайка.
  _handleLikeButton(evt) {
    evt.target.classList.toggle('elements__button_active');
  }

  // Функция удаления карточки.
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // Лиснер full-screen попапа.
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    // Лиснер попапа подтверждения удаления карточки.
    this._buttonTrash.addEventListener('click', () => {
      this._handleCardDelete();
      console.log('клик');
    });

    // Лиснер кнопки лайка.
    this._buttonLike.addEventListener('click', this._handleLikeButton.bind(this));
  }
}