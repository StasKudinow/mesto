import './index.css';

import { settings, buttonEdit, buttonAdd, buttonAvatar } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let idUser = null;


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
    idUser,
    handleCardClick: () => {
      popupImage.open(item.name, item.link);
    },
    handleCardDelete: (idCard, cardElement) => {
      popupConfirm.open(idCard, cardElement);
    },
    handleLike: (idCard) => {
      if(card.isLiked()) {
        api.deleteLike(idCard)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.putLike(idCard)
          .then((res) => {
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
    idUser = profileData._id;
    userInfo.setUserInfo(profileData);

    renderCards.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// Сабмит и закрытие попапа профиля.
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (formData) => {
    popupProfile.changeButtonText('Сохранить');
    api.setProfileData(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfile.changeButtonText('Сохранить');
      })
  }
});

popupProfile.setEventListeners();


// Сабмит и закрытие попапа добавления карточки.
const popupCards = new PopupWithForm({
  popupSelector: '.popup_cards',
  handleFormSubmit: (formData) => {
    popupCards.changeButtonText('Создать');
    api.addCard(formData)
      .then((item) => {
        const cardElement = createCard(item);
        renderCards.addItem(cardElement);
        popupCards.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupCards.changeButtonText('Создать');
      })
  }
});

popupCards.setEventListeners();


// Сабмит и закрытие попапа редактирования аватара пользователя.
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup__avatar',
  handleFormSubmit: (formData) => {
    popupAvatar.changeButtonText('Сохранить');
    api.setAvatar(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatar.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.changeButtonText('Сохранить');
      })
  }
});

popupAvatar.setEventListeners();


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


//Открытие попапа редактирования аватара пользователя.
buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  formValidators['avatar-form'].resetValidation();
})


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
