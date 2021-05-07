const openPopupEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit');
const closePopupEditButton = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const nameHtml = document.querySelector('.profile__title');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');

const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup-add');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const formAddElement = popupAdd.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('#popup-image');

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
const placeContainer = document.querySelector('.element');
const placeTemplate = document.querySelector('#place-template');
const addPlaceButton = document.querySelector('#popupAddForm');

function handleRemovePlace(evt) {
  evt.target.closest('.element').remove();
}

function openPopupImage(placeParagraph, placeLink) { 
  popupImage.querySelector('.cover__image').src = placeLink;
  popupImage.querySelector('.cover__description').textContent = placeParagraph;
  togglePopupImage();
}

function togglePopupImage() {
  popupImage.classList.toggle('cover_visible');
}

function removePopupFields() {
  formAddElement.querySelector('.popup__input_type_place').value = '';
  formAddElement.querySelector('.popup__input_type_link').value = '';
}

function toggleLikeOnCard (evt) {
  evt.target.classList.toggle('element__like_active');
}

initialCards.forEach(function(currentItem) {
  placesContainer.append(createTemplate(currentItem.name, currentItem.link));
});

function createTemplate (paragraph, link) {
  const newPlace = placeTemplate.content.querySelector('.element').cloneNode(true);
  const placeParagraph = newPlace.querySelector('.element__paragraph');
  const placeLink = newPlace.querySelector('#image');
  placeParagraph.textContent = paragraph;
  placeLink.src = link;
  newPlace.querySelector('.element__like').addEventListener('click', toggleLikeOnCard); //слушатель на лайк
  newPlace.querySelector('.element__delete').addEventListener('click', handleRemovePlace); //слушатель на помойку
  newPlace.querySelector('#image').addEventListener('click', () => openPopupImage(paragraph, link)); //слушатель на картинку
  document.querySelector('.cover__button-close').addEventListener('click', togglePopupImage);
  return newPlace;
}

addPlaceButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  placesContainer.prepend(createTemplate(placeInput.value, linkInput.value)); //добавление в хтмл шаблона
  removePopupFields(); //обнуление полей в попапе
  togglePopupAdd(); //закрытие попапа добавления карточки
});

function formCloseButton() {
  popupEdit.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameHtml.textContent = nameInput.value;
  descriptionHtml.textContent = descriptionInput.value;
  formCloseButton();
}

function formOpenButton() {
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
  formCloseButton();
}

function togglePopupAdd () {
  popupAdd.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
openPopupEditButton.addEventListener('click', formOpenButton);
closePopupEditButton.addEventListener('click', formCloseButton);

openPopupAddButton.addEventListener('click', togglePopupAdd);
closePopupAddButton.addEventListener('click', togglePopupAdd);