export default class Card {

  constructor(data, cardSelector, idOwner, handleOpenPopup, handleDeleteIconClick, handleLikeIconClick) {
    this._name = data.name;
    this._link = data.link;
    this._idOwnerCard = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._idCard = data._id;
    this._handleDeleteIconClick = handleDeleteIconClick.bind(this);
    this._likes = data.likes;
    this._isLiked = false;
    this._handleLikeIconClick = handleLikeIconClick.bind(this);
    this._idOwner = idOwner;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _setLikesAmount(amount) {
    this._likeAmount.textContent = amount;
  }

  updateLikes(likesAmount) {
    this._setLikesAmount(likesAmount);
    this._likeCard();
    this._setNewLike();
  }

  generateCard() {
    this._element = this._getTemplate();
    if (this._idOwnerCard !== this._idOwner) {
      this._element.querySelector('.element__delete').classList.add('element__delete_hidden');
    }
    this._likeAmount = this._element.querySelector('.element__like-amount');
    this._setLikesAmount(this._likes.length);
    
    this._cardImage = this._element.querySelector('#image');
    this._elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();
    if (this._likes.some(likeOwner => likeOwner._id === this._idOwner)) {
      this._isLiked = true;
      this._likeCard();
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__paragraph').textContent = this._name;

    return this._element;
  }

  deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _setNewLike() {
    this._isLiked = !this._isLiked;
  }

  _setEventListeners() {
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this._idCard, this);
    });

    this._elementLike.addEventListener('click', () => {
      this._handleLikeIconClick(this._isLiked, this._idCard, this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup(this._link, this._name);
    })
  }
}