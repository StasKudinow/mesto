export default class Card {
  constructor({ data, handleCardClick, handleCardDelete, handleLike }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._idCard = data._id;
    this._owner = data.owner._id;
    this._idUser = 'ee65f85e444fb325a8167792';
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
    this._cardCounter.textContent = this._likes.length;

    if(this.isLiked()) {
      this._buttonLike.classList.add('elements__button_active');
    }

    if(this._owner === this._idUser) {
      return this._element;
    } else {
      this._buttonTrash.remove();
      return this._element;
    }
  }

  isLiked() {
    const userLikes = this._likes.find(user => user._id === this._idUser);
    return userLikes;
  }

  setLikes(likes) {
    this._likes = likes;
    this._cardCounter.textContent = likes.length;

    if(this.isLiked()) {
      this._buttonLike.classList.add('elements__button_active');
    } else {
      this._buttonLike.classList.remove('elements__button_active');
    }
  }

  _setEventListeners() {
    // Лиснер full-screen попапа.
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    // Лиснер попапа подтверждения удаления карточки.
    this._buttonTrash.addEventListener('click', () => {
      this._handleCardDelete(this._idCard, this._element);
      console.log('клик');
    });

    // Лиснер кнопки лайка.
    this._buttonLike.addEventListener('click', () => {
      this._handleLike(this._idCard);
    });
  }
}