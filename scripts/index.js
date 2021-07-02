import Card from './Card.js';
import FormValidator from './FormValidator.js';

const openPopupEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const nameHtml = document.querySelector('.profile__title');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = popupEdit.querySelector('.popup__form');
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup-add');
const formAddElement = popupAdd.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('#popup-image');

const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const placesContainer = document.querySelector('.elements');
const addPlaceButton = document.querySelector('#popupAddForm');
const cardImage = document.querySelector('.popup__image');
const cardText = document.querySelector('.popup__description');

function createCard(item) {
  const card = new Card(item, '#place-template', handleOpenPopup);
  return card.generateCard();
}

addPlaceButton.addEventListener('submit', () => {
  const item = {
    name: placeInput.value,
    link: linkInput.value
  };
  placesContainer.prepend(createCard(item));
  closeAnyPopup(popupAdd);
});

initialCards.forEach((item) => {
  placesContainer.prepend(createCard(item));
});

function handleOpenPopup(name, link) {
  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;
  openAnyPopup(popupImage);
}

function openAnyPopup (popup) {
  popup.classList.add('popup_opened');
  document.myParam = popup;
  document.addEventListener('keydown', checkPressEsc);
  popup.addEventListener('mousedown', checkClickForClose);
}

const addCardValidation = new FormValidator(config, popupAdd);
addCardValidation.enableValidation();

const editCardValidation = new FormValidator(config, popupEdit);
editCardValidation.enableValidation();

const fieldInputPlace = formAddElement.querySelector('.popup__input_type_place');
const fieldInputLink = formAddElement.querySelector('.popup__input_type_link');

function removePopupFields() {
  fieldInputPlace.value = '';
  fieldInputLink.value = '';
}

function editProfileFields(evt) {
  evt.preventDefault();
  nameHtml.textContent = nameInput.value;
  descriptionHtml.textContent = descriptionInput.value;
  closeAnyPopup(popupEdit);
}

function openEditForm() {
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
  editCardValidation.hideErrorsAndToggleButton();
  openAnyPopup(popupEdit);
}

formElement.addEventListener('submit', editProfileFields);
openPopupEditButton.addEventListener('click', openEditForm);

openPopupAddButton.addEventListener('click', () => openPopupAddCard(popupAdd));

const openPopupAddCard = () => {
  removePopupFields();
  addCardValidation.hideErrorsAndToggleButton();
  openAnyPopup(popupAdd);
}

const checkPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    closeAnyPopup (document.myParam);
  };
}

function closeAnyPopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkPressEsc); 
  popup.removeEventListener('mousedown', checkClickForClose);
}

const checkClickForClose = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
      closeAnyPopup (evt.currentTarget);
  };
}