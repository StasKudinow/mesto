export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открытие попапа.
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа.
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Лиснер закрытия попапа на оверлей и крестик.
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }

  //Закрытие попапа на Esc.
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }
}