export const initialCards = [
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

export const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

export const popupEdit = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');

export const popupImageSelector = '#popup-image';
export const popupEditSelector = '#popup-edit';
export const popupAddSelector = '#popup-add';

export const openPopupEditButton = document.querySelector('.profile__edit-button');
export const openPopupAddButton = document.querySelector('.profile__add-button');

export const cardImage = document.querySelector('.popup__image');
export const cardText = document.querySelector('.popup__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');

export const placeTemplate = '#place-template';