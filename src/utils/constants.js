export const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

export const popupEdit = document.querySelector('#popup-edit');
export const popupAdd = document.querySelector('#popup-add');
export const popupEditAvatar = document.querySelector('#popup-update');

export const popupImageSelector = '#popup-image';
export const popupEditSelector = '#popup-edit';
export const popupAddSelector = '#popup-add';
export const popupEditAvatarSelector = '#popup-update';
export const popupDeleteCardSelector = '#popup-confirm';

export const elementsContainerSelector = '.elements';
export const profileTitleSelector = '.profile__title';
export const profileSubtitleSelector = '.profile__subtitle';
export const profileAvatarSelector = '.profile__avatar';

export const openPopupEditButton = document.querySelector('.profile__edit-button');
export const openPopupAddButton = document.querySelector('.profile__add-button');
export const openPopupEditAvatar = document.querySelector('.profile__avatar-cover');

export const nameInput = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');

export const placeTemplate = '#place-template';