import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  config,
  popupEdit,
  popupAdd,
  popupEditAvatar,
  openPopupEditButton,
  openPopupAddButton,
  openPopupEditAvatar,
  nameInput,
  descriptionInput,
  placeTemplate,
  popupImageSelector,
  popupEditSelector,
  popupAddSelector,
  popupEditAvatarSelector,
  popupDeleteCardSelector,
  elementsContainerSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'f2403b1e-b069-4c41-a72d-caa156ab74c7',
    'Content-Type': 'application/json'
  }
});
//61002a8de12f5500f2659bfa
const imagePopup = new PopupWithImage(popupImageSelector);
const editPopup = new PopupWithForm(popupEditSelector, callbackEditSubmit);
const addPopup = new PopupWithForm(popupAddSelector, callbackAddSubmit);
const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, callbackEditAvatarSubmit);
const deleteCardPopup = new PopupWithSubmit(popupDeleteCardSelector);

const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  infoSelector: profileSubtitleSelector,
  avatarSelector: profileAvatarSelector
});

const newSection = new Section({
  renderer: addGeneratedCard
}, elementsContainerSelector);

function catchError(err) {
  console.log(err);
}

let idOwner;
const loadingPagePromises = [api.getInitialCards(), api.getUserInfo()];
Promise.all(loadingPagePromises)
  .then(results => {
    idOwner = results[1]._id;
    newSection.addItems(results[0]);
    newSection.renderItems();
    userInfo.setUserInfo(results[1].name, results[1].about, results[1].avatar);
  })
  .catch(err => catchError(err))

function addGeneratedCard(item) {
  const card = new Card(item, placeTemplate, idOwner, handleOpenPopup, handleDeleteIconClick, handleLikeIconClick);
  newSection.addItem(card.generateCard()); //SECTION
}

function handleLikeIconClick(isLiked, idCard, card) {
  if (!isLiked) {
    api.putLikeCard(idCard)
    .then(res => {
      card.updateLikes(res.likes.length);
  })
    .catch(err => catchError(err))
  } else {
    api.deleteLikeCard(idCard)
    .then(res => {
      card.updateLikes(res.likes.length);
    })
    .catch(err => catchError(err))
  }
}

function callbackEditAvatarSubmit(formValues) {
  editAvatarPopup.setLoadingButton(true);
  api.editUserAvatar(formValues.avatar)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    editAvatarPopup.close();
  })
  .catch(err => catchError(err))
  .finally(() => {
    editAvatarPopup.setLoadingButton(false)
  });
}

function callbackEditSubmit(formValues) {
  editPopup.setLoadingButton(true);
  api.editUserInfo(formValues.name, formValues.description)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    editPopup.close();
  })
  .catch(err => catchError(err))
  .finally(() => {
    editPopup.setLoadingButton(false)
  });
}

function callbackAddSubmit(formValues) {
  addPopup.setLoadingButton(true);
  api.postNewCard(formValues.place, formValues.link)
  .then(res => {
    addGeneratedCard(res);
    addPopup.close();
  })
  .catch(err => catchError(err))
  .finally(() => {
    addPopup.setLoadingButton(false)
  });
}

function handleDeleteIconClick(idCard, card) {
  deleteCardPopup.setReactionSubmit(() => {
    deleteCardPopup.setLoadingButton(true);
    api.deleteCard(idCard)
    .then(res => {
    card.deleteCard();
    deleteCardPopup.close();
  })
    .catch(err => catchError(err))
    .finally(() => {
      deleteCardPopup.setLoadingButton(false)
    })
  });
  deleteCardPopup.open();
}

function handleOpenPopup(link, name) {
  imagePopup.open(link, name);
}

const addCardValidation = new FormValidator(config, popupAdd);
addCardValidation.enableValidation();

const editCardValidation = new FormValidator(config, popupEdit);
editCardValidation.enableValidation();

const editAvatarValidation = new FormValidator(config, popupEditAvatar);
editAvatarValidation.enableValidation();

function openEditPopupForm() {
  editAvatarValidation.hideErrorsAndToggleButton();
  editAvatarPopup.open();
}

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
openPopupEditAvatar.addEventListener('click', openEditPopupForm);