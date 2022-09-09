import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleDelete }) {
    super(popupSelector);
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDelete(this._idCard, this._cardElement);
      console.log(this._idCard);
      console.log('ДА');
    });
  }

  open(idCard, cardElement) {
    this._idCard = idCard;
    this._cardElement = cardElement;
    super.open();
  }
}