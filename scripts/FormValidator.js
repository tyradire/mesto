export default class FormValidator {
  constructor(config, validateForm) {
    this._config = config;
    this._validateForm = validateForm;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._validateForm.querySelectorAll(this._inputSelector));
    this._buttonElement = this._validateForm.querySelector(this._submitButtonSelector);
  }

  enableValidation () {
    this._setEventListeners(this._config);
  }

  _setEventListeners = () => {
    this._validateForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
    this._toggleButtonState();
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  };

  hideErrorsAndToggleButton = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState (this._validateForm.querySelector(this._submitButtonSelector));
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._validateForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _showInputError = (inputElement) => {
    const errorElement = this._validateForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }
}