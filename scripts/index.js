const openPopupEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit');
const closePopupEditButton = popupEdit.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const nameHtml = document.querySelector('.profile__title');
const descriptionInput = document.querySelector('.popup__input_type_description');
const descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = popupEdit.querySelector('.popup__form');

const openPopupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup-add');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const formAddElement = popupAdd.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('#popup-image');
const closePopupImageButton = popupImage.querySelector('.popup__close');

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

function removeCard(evt) {
  evt.target.closest('.element').remove();
}

const imgPopupImage = popupImage.querySelector('.popup__image');
const descriptionPopupImage = popupImage.querySelector('.popup__description');

function openPopupImage(placeParagraph, placeLink) { 
  imgPopupImage.src = placeLink;
  imgPopupImage.alt = placeParagraph;
  descriptionPopupImage.textContent = placeParagraph;
  togglePopup(popupImage);
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
  const cardImage = newPlace.querySelector('#image');
  placeParagraph.textContent = paragraph;
  cardImage.src = link;
  cardImage.alt = paragraph;
  newPlace.querySelector('.element__like').addEventListener('click', toggleLikeOnCard); //слушатель на лайк
  newPlace.querySelector('.element__delete').addEventListener('click', removeCard); //слушатель на помойку
  cardImage.addEventListener('click', () => openPopupImage(paragraph, link)); //слушатель на картинку
  return newPlace;
}

addPlaceButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  placesContainer.prepend(createTemplate(placeInput.value, linkInput.value)); //добавление в хтмл шаблона
  removePopupFields(); //обнуление полей в попапе
  togglePopup(popupAdd); //закрытие попапа добавления карточки
});

function editProfileFields(evt) {
  evt.preventDefault();
  nameHtml.textContent = nameInput.value;
  descriptionHtml.textContent = descriptionInput.value;
  togglePopup(popupEdit);
}

function openEditForm() {
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
  togglePopup(popupEdit);
}

formElement.addEventListener('submit', editProfileFields);
openPopupEditButton.addEventListener('click', openEditForm);
closePopupEditButton.addEventListener('click', () => togglePopup(popupEdit));

openPopupAddButton.addEventListener('click', () => togglePopup(popupAdd));
closePopupAddButton.addEventListener('click', closePopupAdd);

function closePopupAdd() {
  removePopupFields();
  togglePopup(popupAdd);
}

function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
}

closePopupImageButton.addEventListener('click', () => togglePopup(popupImage));