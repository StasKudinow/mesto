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


// логика отрисовки карточек
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

const renderCards = () => {
  initialCards.forEach(renderCard);
};

// функция отрисовки карточки
const renderCard = (element) => {
  const elementsCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
  elementsCard.querySelector('.elements__image').src = element.link;
  elementsCard.querySelector('.elements__image').alt = element.name;
  elementsCard.querySelector('.elements__name').textContent = element.name;

  // кнопка лайка
  elementsCard.querySelector('.elements__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button_active');
  });

  // кнопка удаления
  elementsCard.querySelector('.elements__trash').addEventListener('click', function(evt) {
    evt.target.closest('.elements__card').remove();
  });

  cardsContainer.prepend(elementsCard);

  // логика фуллскрин попапа
  const popupShow = document.querySelector('.popup_show');
  const imageButton = elementsCard.querySelector('.elements__image');
  const closeButtonShow = document.querySelector('.popup__close-button_show');
  const showImage = document.querySelector('.popup-show__image');
  const showTitle = document.querySelector('.popup-show__title')

  function popupOpenShow (evt) {
    evt.preventDefault();
    popupShow.classList.add('popup_opened');
    showImage.src = evt.target.src;
    showTitle.textContent = evt.target.closest('.elements__card').textContent;
  };

  function popupCloseShow (evt) {
    evt.preventDefault();
    popupShow.classList.remove('popup_opened');
  };

  // лиснеры фуллскрин попапа
  imageButton.addEventListener('click', popupOpenShow);
  closeButtonShow.addEventListener('click', popupCloseShow);
  popupShow.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      popupShow.classList.remove('popup_opened');
    };
  });
};

renderCards();

// логика эдит-попапа
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const profileName = document.querySelector('.profile__name');
const profilejob = document.querySelector('.profile__job');

function popupOpen(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
};

function popupClose(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
};

function popupAreaClose(evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(evt);
  };
};

// функция сабмита эдит-попапа
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  popupClose(evt);
};


// лиснеры эдит-попапа
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupAreaClose);
formElement.addEventListener('submit', formSubmitHandler);

// логика эдд-попапа
const addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const closeButtonCards = document.querySelector('.popup__close-button_cards');
const formElementCards = document.querySelector('.popup__container_cards');
const cardsNameInput = document.querySelector('.popup__field_cards_name');
const cardsLinkInput = document.querySelector('.popup__field_cards_link');


function popupOpenCards (evt) {
  evt.preventDefault();
  popupCards.classList.add('popup_opened');
};

function popupCloseCards (evt) {
  evt.preventDefault();
  popupCards.classList.remove('popup_opened');
};


// функция сабмита эдд-попапа
const cardHandlerSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});
  popupCloseCards(evt);
};

// лиснеры эдд-попапа
addButton.addEventListener('click', popupOpenCards);
closeButtonCards.addEventListener('click', popupCloseCards);
popupCards.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    popupCards.classList.remove('popup_opened');
  };
});
formElementCards.addEventListener('submit', cardHandlerSubmit);
