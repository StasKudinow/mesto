export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }
}