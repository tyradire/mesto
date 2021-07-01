export default class FormValidator {
  constructor(config, validateForm) {
    this._config = config;
    this._validateForm = validateForm;
  }

  enableValidation () {
    this._setEventListeners(this._validateForm, this._config);
  }

  _setEventListeners = (formElement, enableValidation) => {
    const { inputSelector, submitButtonSelector, ...restEnableValidation } = enableValidation;
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, restEnableValidation);
        this._toggleButtonState(buttonElement, inputList);
      })
    })
    this._toggleButtonState(buttonElement, inputList);
  };

  _checkInputValidity = (formElement, inputElement, enableValidation) => {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, enableValidation);
    } else {
      this._showInputError(formElement, inputElement, enableValidation);
    };
  };

  _toggleButtonState = (buttonElement, inputList) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  hideErrorsAndToggleButton = () => {
    const { inputSelector, submitButtonSelector, ...restEnableValidation } = this._config;
    const inputList = Array.from(this._validateForm.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(this._validateForm, inputElement, restEnableValidation);
      this._toggleButtonState (this._validateForm.querySelector(submitButtonSelector), inputList);
  })
  };

  _hideInputError = (formElement, inputElement, enableValidation) => {
    const { inputErrorClass, errorClass } = enableValidation;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _showInputError = (formElement, inputElement, enableValidation) => {
    const { inputErrorClass, errorClass } = enableValidation;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }
}