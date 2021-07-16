export default class Card {

  constructor(data, cardSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('#image');
    this._elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__paragraph').textContent = this._name;

    return this._element;
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._elementLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup(this._link, this._name);
    })
  }
}