export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    };
  }
}






















// селекторы и классы для валидации
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_error',
//   errorClass: 'popup__error'
// });

// // функция показа ошибок инпута
// const showInputError = (formElement, inputElement, errorMessage, settings) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(settings.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(settings.errorClass);
// };

// // функция скрытия ошибок инпута
// const hideInputError = (formElement, inputElement, settings) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(settings.inputErrorClass);
//   errorElement.classList.remove(settings.errorClass);
//   errorElement.textContent = '';
// };

// // функция проверки на валидность
// const checkInputValidity = (formElement, inputElement, settings) => {
//   if(!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//   } else {
//     hideInputError(formElement, inputElement, settings);
//   };
// };

// // установка слушателей для инпутов
// const setEventListeners = (formElement, settings) => {
//   const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//   const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, settings);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// };

// // присвоение слушателей инпутов для форм
// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, settings);
//   });
// };

// // проверка на валидность для инпутов
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// // функция активации/дизактивации кнопки сабмита
// const toggleButtonState = (inputList, buttonElement, settings) => {
//   if(hasInvalidInput(inputList)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled', true);
//   };
// };