import './index.css';

import { settings, initialCards, buttonEdit, buttonAdd } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';


// Создание экземпляра карточки.
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupImage.open(item.name, item.link);
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


// Экземпляры классов.
const popupImage = new PopupWithImage('.popup_show');
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profilejobSelector: '.profile__job'
});


// Сабмит и закрытие попапа профиля.
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

    popupProfile.close();
  }
});


// Сабмит и закрытие попапа добавления карточки.
const popupCards = new PopupWithForm({
  popupSelector: '.popup_cards',
  handleFormSubmit: (item) => {
    const cardElement = createCard(item);
    renderInitialCards.addItem(cardElement);

    popupCards.close();
  }
});


// Открытие попапа профиля.
buttonEdit.addEventListener('click', () => {
  popupProfile.open();
  formValidators['profile-form'].resetValidation();

  const formData = userInfo.getUserInfo();
  popupProfile.setInputValues(formData);
});


// Открытие попапа добавления карточки.
buttonAdd.addEventListener('click', () => {
  popupCards.open();
  formValidators['cards-form'].resetValidation();
});


// Лиснеры попапов.
popupProfile.setEventListeners();
popupCards.setEventListeners();
popupImage.setEventListeners();


// Валидация форм при помощи объекта валидаторов по атрибуту 'name'.
const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

formValidators['profile-form'].enableValidation();
formValidators['cards-form'].enableValidation();