export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  // Открытие попапа.
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Закрытие попапа.
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Лиснер закрытия попапа на оверлей и крестик.
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
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