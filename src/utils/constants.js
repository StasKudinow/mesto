// Объект настроек валидации.
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

// Изначальный массив карточек.
export const initialCards = [
  {
    name: 'Тебердинский заповедник',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/teberinskiy-zapovednik.jpg?raw=true'
  },
  {
    name: 'Косино',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/kosino.jpg?raw=true'
  },
  {
    name: 'Лазаревское',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/lazarevskoe.jpg?raw=true'
  },
  {
    name: 'Элиста',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/elista.jpg?raw=true'
  },
  {
    name: 'Озеро Рица',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/ozero-ritsa.jpg?raw=true'
  },
  {
    name: 'Абхазия',
    link: 'https://github.com/StasPanda/mesto/blob/develop/images/abkhazia.jpg?raw=true'
  }
];

// Константы:

// Контейнер карточек.
export const cardContainer = document.querySelector('.elements');

// Попапы.
export const popupProfile = document.querySelector('.popup_profile');
export const popupCards = document.querySelector('.popup_cards');
export const popupShow = document.querySelector('.popup_show');

// Формы.
export const profileForm = document.querySelector('.popup__container_profile');
export const cardsForm = document.querySelector('.popup__container_cards');

// Кнопки.
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
