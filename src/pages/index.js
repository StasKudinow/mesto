import './index.css';

import { settings, buttonEdit, buttonAdd } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


// Экземпляры классов.
const popupImage = new PopupWithImage('.popup_show');
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profilejobSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
});
const api = new Api(
  'https://nomoreparties.co/v1/cohort-49/',
  '776fa51b-f2c4-44dc-b3e7-060fea23d99a'
);


// Создание экземпляра карточки.
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupImage.open(item.name, item.link);
    },
    handleCardDelete: (idCard, cardElement) => {
      popupConfirm.open(idCard, cardElement);
      console.log(idCard);
    },
    handleLike: (idCard) => {
      if(card.isLiked()) {
        api.deleteLike(idCard)
          .then((res) => {
            console.log('не лайк', res)
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.putLike(idCard)
          .then((res) => {
            console.log('лайк', res)
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      };
    }
  },
  '.card-template');

  const cardElement = card.generateCard();
  return cardElement;
};

popupImage.setEventListeners();


// Отрисовка карточек.
const renderCards = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    renderCards.renderAppendItems(cardElement);
  }
},
'.elements');


// Промисы данных профиля и изначального массива карточек.
Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([profileData, cardsData]) => {
    console.log(profileData);
    userInfo.setUserInfo(profileData);

    console.log(cardsData);
    renderCards.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// Сабмит и закрытие попапа профиля.
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (formData) => {
    api.setProfileData(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

popupProfile.setEventListeners();


// Сабмит и закрытие попапа добавления карточки.
const popupCards = new PopupWithForm({
  popupSelector: '.popup_cards',
  handleFormSubmit: (formData) => {
    api.addCard(formData)
      .then((item) => {
        // console.log(item)
        const cardElement = createCard(item);
        renderCards.addItem(cardElement);
        popupCards.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

popupCards.setEventListeners();


// Сабмит и закрытие попапа подтверждения удаления карточки.
const popupConfirm = new PopupWithConfirmation({
  popupSelector: '.popup_delete',
  handleDelete: (idCard, cardElement) => {
    api.deleteCard(idCard)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

popupConfirm.setEventListeners();


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
