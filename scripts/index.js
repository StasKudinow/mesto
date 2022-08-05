import { settings, initialCards, cardContainer, popupProfile,
  popupCards, popups, profileForm,
  cardsForm, profileNameInput, profileJobInput,
  cardsNameInput, cardsLinkInput, buttonEdit,
  buttonAdd, profileName, profilejob,
  popupShow, imageShow, titleShow } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Создание экземпляра карточки.
const createCard = (item) => {
  const card = new Card(item, '.card-template', handleOpenPopup);
  const cardElement = card.generateCard();

  return cardElement;
};

// Добавление карточки в DOM.
const renderCard = (element) => {
  const cardNew = createCard(element);
  cardContainer.prepend(cardNew);
};

// Отрисовка изначального массива карточек.
const renderinitialCards = () => {
  initialCards.forEach((element) => {
    renderCard(element);
  });
};
renderinitialCards();

// Открытие full-screen попапа.
function handleOpenPopup(name, link) {
  imageShow.src = link;
  imageShow.alt = name;
  titleShow.textContent = name;
  openPopup(popupShow);
};

// Открытие попапа.
  function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

// Закрытие попапа.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Лиснеры кнопок.
buttonEdit.addEventListener('click', () => {openPopup(popupProfile)});
buttonAdd.addEventListener('click', () => {openPopup(popupCards)});

// Закрытие на оверлей и крестик.
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
});

// Закрытие на Esc.
function closePopupEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

// Функция сабмита эдит-попапа.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profilejob.textContent = profileJobInput.value;

  profileValidation.resetValidation();
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Функция сабмита эдд-попапа.
const handlerCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});

  closePopup(popupCards);
  evt.target.reset();
  newCardValidation.resetValidation();
};

cardsForm.addEventListener('submit', handlerCardFormSubmit);

// Валидация форм.
const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardsForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();
