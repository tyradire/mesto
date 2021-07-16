import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  config,
  popupEdit,
  popupAdd,
  openPopupEditButton,
  openPopupAddButton,
  nameInput,
  descriptionInput,
  placeTemplate,
  popupImageSelector,
  popupEditSelector,
  popupAddSelector,
  elementsContainerSelector,
  profileTitleSelector,
  profileSubtitleSelector
} from '../utils/constants.js';

const newSection = new Section({
  items: initialCards,
  renderer: addGeneratedCard
}, elementsContainerSelector);

newSection.renderItems();

const imagePopup = new PopupWithImage(popupImageSelector);
const editPopup = new PopupWithForm(popupEditSelector, callbackEditSubmit);
const addPopup = new PopupWithForm(popupAddSelector, callbackAddSubmit);

const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  infoSelector: profileSubtitleSelector
});

function addGeneratedCard(item) {
  const card = new Card(item, placeTemplate, handleOpenPopup);
  newSection.addItem(card.generateCard());
}

function callbackEditSubmit(formValues) {
  userInfo.setUserInfo(formValues.name, formValues.description);
  editPopup.close();
}

function callbackAddSubmit(formValues) {
  const item = {
    name: formValues.place,
    link: formValues.link
  };
  addGeneratedCard(item);
  addPopup.close();
}

function handleOpenPopup(link, name) {
  imagePopup.open(link, name);
}

const addCardValidation = new FormValidator(config, popupAdd);
addCardValidation.enableValidation();

const editCardValidation = new FormValidator(config, popupEdit);
editCardValidation.enableValidation();

function openEditForm() {
  setPopupEditInputs(userInfo.getUserInfo());
  editCardValidation.hideErrorsAndToggleButton();
  editPopup.open();
}

function setPopupEditInputs({name, info}) {
  nameInput.value = name;
  descriptionInput.value = info;
}

const openPopupAddCard = () => {
  addCardValidation.hideErrorsAndToggleButton();
  addPopup.open();
}

openPopupEditButton.addEventListener('click', openEditForm);
openPopupAddButton.addEventListener('click', openPopupAddCard);