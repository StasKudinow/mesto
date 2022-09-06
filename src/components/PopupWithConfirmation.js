import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__button_delete');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      console.log('ДА');

      this.close();
    })
  }
}