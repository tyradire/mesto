let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__field_name');
let nameHtml = document.querySelector('.profile__title');
let descriptionInput = document.querySelector('.popup__field_description');
let descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form'); 

function formSubmitHandler(event) {
  event.preventDefault();
  nameHtml.textContent = nameInput.value;
  descriptionHtml.textContent = descriptionInput.value;
  popup.classList.toggle('popup_opened');
}

function formOpenButton() {
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
  popup.classList.toggle('popup_opened');
}

function formCloseButton() {
  popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', formOpenButton);
closePopupButton.addEventListener('click', formCloseButton);