import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit.bind(this);
    this._callbackWithInput = this._callbackWithInput.bind(this);
    this._submitButton = this._popup.querySelector('.popup__button');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach(input => {
      this.formValues[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._callbackWithInput);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._submitButton.removeEventListener('click', this._callbackWithInput);
  }

  _callbackWithInput() {
    this._getInputValues();
    this._callbackSubmit();
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._clearInputs();
  }

  _clearInputs() {
    this._inputList.forEach(input => {
      input.value = '';
    });
  }
}