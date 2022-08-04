import { Card } from './Card.js';
import { settings, FormValidator } from './FormValidator.js'

// Константы:

// Попапы.
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popups = document.querySelectorAll('.popup');

// Формы.
const profileForm = document.querySelector('.popup__container_profile');
const cardsForm = document.querySelector('.popup__container_cards');

// Инпуты.
const profileNameInput = document.querySelector('.popup__input_profile_name');
const profileJobInput = document.querySelector('.popup__input_profile_job');
const cardsNameInput = document.querySelector('.popup__input_cards_name');
const cardsLinkInput = document.querySelector('.popup__input_cards_link');

// Кнопки.
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// Элементы профиля.
const profileName = document.querySelector('.profile__name');
const profilejob = document.querySelector('.profile__job');

// Изначальный массив карточек.
const initialCards = [
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

// Отрисовка экземпляра карточки.
const renderCard = (item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  document.querySelector('.elements').prepend(cardElement);
};

// Отрисовка изначального массива карточек.
const renderinitialCards = () => {
  initialCards.forEach((element) => {
    renderCard(element);
  });
};
renderinitialCards();

// Открытие попапа.
  export function openPopup(popup) {
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
  popup.addEventListener('click', (evt) => {
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
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Функция сабмита эдд-попапа.
const handlerCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});
  closePopup(popupCards);
  evt.target.reset();
  const buttonsInactive = document.querySelectorAll('.popup__button');
  buttonsInactive.forEach((button) => {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', true);
  });
};

cardsForm.addEventListener('submit', handlerCardFormSubmit);

// Получение массива форм.
const getForms = (settings) => {
  return Array.from(document.querySelectorAll(settings.formSelector));
};

const forms = getForms(settings);

// Проверка валидации экземпляров форм.
forms.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
});