import { settings, initialCards, cardContainer, popupProfile,
  popupCards, popups, profileForm,
  cardsForm, profileNameInput, profileJobInput,
  cardsNameInput, cardsLinkInput, buttonEdit,
  buttonAdd, profileName, profilejob,
  popupShow, imageShow, titleShow } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

// Создание карточек.
const renderinitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const newPopupWithImage = new PopupWithImage(popupShow);
        newPopupWithImage.open(item.name, item.link);
        newPopupWithImage.setEventListeners();
      }
    },
    '.card-template');

    const cardElement = card.generateCard();

    renderinitialCards.addItem(cardElement);
  }
},
cardContainer);

renderinitialCards.renderitems();

const profilePopupWithForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: () => {
    profileName.textContent = profileNameInput.value;
    profilejob.textContent = profileJobInput.value;

    profilePopupWithForm.close();
    profileValidation.resetValidation();
  }
});
profilePopupWithForm.setEventListeners();

const cardsPopupWithForm = new PopupWithForm({
  popupSelector: popupCards,
  handleFormSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const newPopupWithImage = new PopupWithImage(popupShow);
        newPopupWithImage.open(item.name, item.link);
        newPopupWithImage.setEventListeners();
      }
    },
    '.card-template');

    const cardElement = card.generateCard();

    renderinitialCards.addItem(cardElement);

    cardsPopupWithForm.close();
    newCardValidation.resetValidation();
  }
});
cardsPopupWithForm.setEventListeners();

// Открытие/закрытие попапа профиля.
const newPopupProfile = new Popup(popupProfile);
buttonEdit.addEventListener('click', () => {
  newPopupProfile.open();
  newPopupProfile.setEventListeners();
});

// Открытие/закрытие попапа добавления карточки.
const newPopupCards = new Popup(popupCards);
buttonAdd.addEventListener('click', () => {
  newPopupCards.open();
  newPopupCards.setEventListeners();
});

// Валидация форм.
const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardsForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();








// // Создание экземпляра карточки.
// const createCard = (item) => {
//   const card = new Card(item, '.card-template', handleOpenPopup);
//   const cardElement = card.generateCard();

//   return cardElement;
// };

// // Добавление карточки в DOM.
// const renderCard = (element) => {
//   const cardNew = createCard(element);
//   cardContainer.prepend(cardNew);
// };

// // Отрисовка изначального массива карточек.
// const renderinitialCards = () => {
//   initialCards.forEach((element) => {
//     renderCard(element);
//   });
// };
// renderinitialCards();

// // Открытие full-screen попапа.
// function handleOpenPopup(name, link) {
//   imageShow.src = link;
//   imageShow.alt = name;
//   titleShow.textContent = name;
//   openPopup(popupShow);
// };

// // Открытие попапа.
//   function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEsc);
// };

// // Закрытие попапа.
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEsc);
// };

// // Закрытие на оверлей и крестик.
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     };
//   });
// });

// // Закрытие на Esc.
// function closePopupEsc (evt) {
//   if(evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   };
// };

// // Функция сабмита эдит-попапа.
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profilejob.textContent = profileJobInput.value;

//   profileValidation.resetValidation();
//   closePopup(popupProfile);
// };

// profileForm.addEventListener('submit', handleProfileFormSubmit);

// Функция сабмита эдд-попапа.
// const handlerCardFormSubmit = (evt) => {
//   evt.preventDefault();
//   renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});

//   closePopup(popupCards);
//   evt.target.reset();
//   newCardValidation.resetValidation();
// };

// cardsForm.addEventListener('submit', handlerCardFormSubmit);
