let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__input_type_name');
let nameHtml = document.querySelector('.profile__title');
let descriptionInput = document.querySelector('.popup__input_type_description');
let descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form'); 

function formCloseButton() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  nameHtml.textContent = nameInput.value;
  descriptionHtml.textContent = descriptionInput.value;
  formCloseButton();
}

function formOpenButton() {
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
  formCloseButton();
}

formElement.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', formOpenButton);
closePopupButton.addEventListener('click', formCloseButton);