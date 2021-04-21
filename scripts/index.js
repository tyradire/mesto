const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__name');
let nameHtml = document.querySelector('.profile__title');
let descriptionInput = document.querySelector('.popup__description');
let descriptionHtml = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form'); 

openPopupButton.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameHtml.textContent;
  descriptionInput.value = descriptionHtml.textContent;
})

closePopupButton.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
})

function formSubmitHandler(event) {
  event.preventDefault();
  nameHtml.textContent = nameInput.value;
  nameHtml.insertAdjacentElement('beforeend', openPopupButton);
  descriptionHtml.textContent = descriptionInput.value;
  popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);