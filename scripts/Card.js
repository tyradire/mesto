export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#place-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('#image').src = this._link;
    this._element.querySelector('#image').alt = this._name;
    this._element.querySelector('.element__paragraph').textContent = this._name;

    return this._element;
  }

  _deleteCard() {
    if (this._element) {
      this._element.remove();
    }
  }

  _likeCard() {
    if (this._element) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
  }

  _setEventListeners() {
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

  }
}