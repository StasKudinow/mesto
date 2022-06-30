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

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
let formElementCards = document.querySelector('.popup__container_cards');
let cardsNameInput = document.querySelector('.popup__field_cards_name');
let cardsLinkInput = document.querySelector('.popup__field_cards_link');

const renderCards = () => {
  initialCards.forEach(renderCard);
};

const renderCard = (element) => {
  const elementsCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
  elementsCard.querySelector('.elements__image').src = element.link;
  elementsCard.querySelector('.elements__image').alt = element.name;
  elementsCard.querySelector('.elements__name').textContent = element.name;

  elementsCard.querySelector('.elements__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button_active');
  });

  cardsContainer.prepend(elementsCard);
};

const cardHandlerSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name:cardsNameInput.value, link:cardsLinkInput.value});
  popupCloseCards(evt);
}

formElementCards.addEventListener('submit', cardHandlerSubmit);

renderCards();

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_job');
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  popupClose(evt);
};

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupAreaClose);
formElement.addEventListener('submit', formSubmitHandler);


const addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const closeButtonCards = document.querySelector('.popup__close-button_cards');


function popupOpenCards (evt) {
  evt.preventDefault();
  popupCards.classList.add('popup_opened');
}

function popupCloseCards (evt) {
  evt.preventDefault();
  popupCards.classList.remove('popup_opened');
}

addButton.addEventListener('click', popupOpenCards);
closeButtonCards.addEventListener('click', popupCloseCards);
popupCards.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    popupCards.classList.remove('popup_opened');
  };
});
