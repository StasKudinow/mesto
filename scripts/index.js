const editButton = document.querySelector('.profile__edit_button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const likeButton = document.querySelector('.elements__button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
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

function likeActive(evt) {
  evt.preventDefault(evt);
  likeButton.classList.toggle('elements__button_active');
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
likeButton.addEventListener('click', likeActive);
formElement.addEventListener('submit', formSubmitHandler);