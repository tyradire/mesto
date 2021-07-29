import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._reactionSubmit = this._reactionSubmit.bind(this);
    this._button = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach(input => {
      this.formValues[input.name] = input.value;
    });
    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._reactionSubmit);
  }

  setLoadingButton(isDel) {
    if (isDel) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = 'Сохранить'
    }
  }

  _reactionSubmit (evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
  }


  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener('submit', this._reactionSubmit);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}