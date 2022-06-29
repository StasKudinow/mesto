const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements');

const renderCards = () => {
  initialCards.forEach(renderCard);
};

const renderCard = (element) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const elementsCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
  elementsCard.querySelector('.elements__image').src = element.link;
  elementsCard.querySelector('.elements__image').alt = element.name;
  elementsCard.querySelector('.elements__name').textContent = element.name;

  elementsCard.querySelector('.elements__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button_active');
  });

  cardsContainer.append(elementsCard);
};

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