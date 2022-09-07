import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleDelete }) {
    super(popupSelector);
    this._handleDelete = handleDelete;
  }

  submitDeleteCard(idCard, cardElement) {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDelete(idCard, cardElement);
      console.log(idCard);
      console.log('ДА');
      this.close();
    })
  }
}