import './index.css';

import { settings, buttonEdit, buttonAdd,
  profileAvatar, profileName, profileJob } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


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






const profileApi = new Api('https://nomoreparties.co/v1/cohort-49/users/me', {
  headers: {
    authorization:'776fa51b-f2c4-44dc-b3e7-060fea23d99a',
    'Content-Type': 'application/json'
  }
});

// profileApi.getData()
//   .then((data) => {
//     console.log(data);
//     profileName.textContent = data.name;
//     profileJob.textContent = data.about;
//     profileAvatar.src = data.avatar;
//   })
//   .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });

const cardsApi = new Api('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
  headers: {
    authorization:'776fa51b-f2c4-44dc-b3e7-060fea23d99a',
    'Content-Type': 'application/json'
  }
});

// cardsApi.getData()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });

Promise.all([profileApi.getProfileInfo(), cardsApi.getInitialCards()])
  .then(([profileData, cardsData]) => {
    console.log(profileData);
    profileName.textContent = profileData.name;
    profileJob.textContent = profileData.about;
    profileAvatar.src = profileData.avatar;

    console.log(cardsData);

    const renderInitialCards = new Section({
      items: cardsData,
      renderer: (item) => {
        const cardElement = createCard(item);
        renderInitialCards.addItem(cardElement);
      }
    },
    '.elements');
    
    renderInitialCards.renderitems();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });