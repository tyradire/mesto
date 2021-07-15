export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._checkClickForClose = this._checkClickForClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _checkClickForClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._checkClickForClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._checkClickForClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}