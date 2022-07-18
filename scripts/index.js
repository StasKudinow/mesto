// константы
// попапы
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popupShow = document.querySelector('.popup_show');
const popups = document.querySelectorAll('.popup');
// формы
const profileForm = document.querySelector('.popup__container_profile');
const cardsForm = document.querySelector('.popup__container_cards');
// крестик закрытия
const closeButtons = document.querySelectorAll('.popup__close-button');
// инпуты
const profileNameInput = document.querySelector('.popup__input_profile_name');
const profileJobInput = document.querySelector('.popup__input_profile_job');
const cardsNameInput = document.querySelector('.popup__input_cards_name');
const cardsLinkInput = document.querySelector('.popup__input_cards_link');
// фуллскрин элементы
const showImage = document.querySelector('.popup__show-image');
const showTitle = document.querySelector('.popup__show-title');
// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// элементы профиля
const profileName = document.querySelector('.profile__name');
const profilejob = document.querySelector('.profile__job');
// отрисовка карточки
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

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


// функция отрисовки карточки
const renderCards = () => {
  initialCards.forEach(renderCard);
};

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__image');
  const cardElementName = cardElement.querySelector('.elements__name');
  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElementName.textContent = item.name;

  // кнопка лайка
  cardElement.querySelector('.elements__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button_active');
  });

  // кнопка удаления
  cardElement.querySelector('.elements__trash').addEventListener('click', function(evt) {
    evt.target.closest('.elements__card').remove();
  });

  //функция вызова фуллскрин попапа
  function openPopupShow () {
    openPopup(popupShow);
    showImage.src = item.link;
    showImage.alt = item.name;
    showTitle.textContent = item.name;
  };

  cardElementImage.addEventListener('click', openPopupShow);

  return cardElement;
};

// добавление в DOM
const renderCard = (element) => {
  const elementsCard = createCard(element)
  cardsContainer.prepend(elementsCard);
};

renderCards();

// открытие/закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', () => {openPopup(popupProfile)});
addButton.addEventListener('click', () => {openPopup(popupCards)});

//закрытие на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие на оверлей
popups.forEach((overlay) => {
  const popup = overlay.closest('.popup');
  overlay.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

//закрытие на Esc
function closePopupEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
    document.removeEventListener('keydown', closePopupEsc);
  };
};


// функция сабмита эдит-попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profilejob.textContent = profileJobInput.value;
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

//функция сабмита эдд-попапа
const handlerCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});
  closePopup(popupCards);
  evt.target.reset();
};

cardsForm.addEventListener('submit', handlerCardFormSubmit);
