import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__show-image');
    this._popupTitle = this._popup.querySelector('.popup__show-title');
  }

  // Открытие попапа с данными изображения.
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
  }
}