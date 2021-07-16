import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardText = this._popup.querySelector('.popup__description');
  }

  open(link, name) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardText.textContent = name;
    super.open();
  }
}