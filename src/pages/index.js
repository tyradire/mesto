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
  editAvatarInput,
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

api.getInitialCards()
.then(res => {
  console.log(res);
  newSection.addItems(res);
  newSection.renderItems();
})

let idOwner;

api.getUserInfo()
.then(res => {
  idOwner = res._id;
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserAvatar(res.avatar);
})

function addGeneratedCard(item) {
  const card = new Card(item, placeTemplate, idOwner, handleOpenPopup, handleDeleteIconClick, handleLikeIconClick);
  newSection.addItem(card.generateCard()); //SECTION
}

function handleLikeIconClick(isLiked, idCard) {
  if (!isLiked) {
    api.putLikeCard(idCard)
  .then(res => {
    this.setLikesAmount(res.likes.length);
    this.likeCard();
    this.setNewLike();
  })
  } else {
    api.deleteLikeCard(idCard)
    .then(res => {
      this.setLikesAmount(res.likes.length);
      this.likeCard();
      this.setNewLike();
    })
  }
}

function callbackEditAvatarSubmit(formValues) {
  editAvatarPopup.setLoadingButton(true);
  api.editUserAvatar(formValues.avatar)
  .then(res => {
    userInfo.setUserAvatar(res.avatar);
    editAvatarPopup.close();
  })
  .finally(() => {
    editAvatarPopup.setLoadingButton(false)
  });
}

function callbackEditSubmit(formValues) {
  editPopup.setLoadingButton(true);
  api.editUserInfo(formValues.name, formValues.description)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    editPopup.close();
  })
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
  .finally(() => {
    addPopup.setLoadingButton(false)
  });
}

function handleDeleteIconClick(idCard) {
  deleteCardPopup.setReactionSubmit(() => {
    deleteCardPopup.setLoadingButton(true);
    api.deleteCard(idCard)
    .then(res => {
    this.deleteCard();
    deleteCardPopup.close();
  })
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
  setEditAvatarInput(userInfo.getUserAvatar());
  editAvatarValidation.hideErrorsAndToggleButton();
  editAvatarPopup.open();
}

function openEditForm() {
  setPopupEditInputs(userInfo.getUserInfo());
  editCardValidation.hideErrorsAndToggleButton();
  editPopup.open();
}

function setEditAvatarInput({avatar}) {
  editAvatarInput.value = avatar;
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