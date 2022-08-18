import './index.css';

import { settings, initialCards,
  profileForm, cardsForm,
  buttonEdit, buttonAdd } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';


// Экземпляры классов.
const newPopupWithImage = new PopupWithImage('.popup_show');
const newPopupProfile = new Popup('.popup_profile');
const newPopupCards = new Popup('.popup_cards');
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profilejobSelector: '.profile__job'
});


// Создание экземпляра карточки.
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      newPopupWithImage.open(item.name, item.link);
      newPopupWithImage.setEventListeners();
    }
  },
  '.card-template');

  const cardElement = card.generateCard();

  return cardElement;
};


// Создание массива карточек + добавление в DOM.
const renderInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    renderInitialCards.addItem(cardElement);
  }
},
'.elements');

renderInitialCards.renderitems();


// Сабмит и закрытие попапа профиля.
const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

    profilePopupWithForm.close();
  }
});


// Сабмит и закрытие попапа добавления карточки.
const cardsPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_cards',
  handleFormSubmit: (item) => {
    const cardElement = createCard(item);
    renderInitialCards.addItem(cardElement);

    cardsPopupWithForm.close();
  }
});


// Открытие попапа профиля.
buttonEdit.addEventListener('click', () => {
  newPopupProfile.open();
  profileValidation.resetValidation();

  const formData = userInfo.getUserInfo();
  profilePopupWithForm.setInputValues(formData);
});


// Открытие попапа добавления карточки.
buttonAdd.addEventListener('click', () => {
  newPopupCards.open();
  newCardValidation.resetValidation();
});


// Лиснеры попапов.
newPopupProfile.setEventListeners();
newPopupCards.setEventListeners();
profilePopupWithForm.setEventListeners();
cardsPopupWithForm.setEventListeners();


// Валидация форм.
const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardsForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();
