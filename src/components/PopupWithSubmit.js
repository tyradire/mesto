import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button');
  }

  setReactionSubmit(reactionSubmit) {
    this._reactionSubmit = reactionSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button').addEventListener('click', this._reactionSubmit);
  }

  setLoadingButton(isDel) {
    if (isDel) {
      this._button.textContent = 'Удаление...'
    } else {
      this._button.textContent = 'Да'
    }
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popup.querySelector('.popup__button').removeEventListener('click', this._reactionSubmit);
  }

}