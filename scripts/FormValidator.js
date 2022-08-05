import { settings } from "./constants.js";

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);
  }

  // Функция показа ошибок инпутов.
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  // Функция скрытия ошибок инпутов.
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  // Условная конструкция для ошибок инпутов.
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }


  // Установка лиснеров инпутов.
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Подтверждение валидности.
  enableValidation() {
    this._inputList.forEach(() => {
      this._setEventListeners();
    });
  }


  // Проверка на валидность.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Управление кнопкой сабмита.
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    };
  }

  // Очистка ошибок + управление кнопкой.
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
