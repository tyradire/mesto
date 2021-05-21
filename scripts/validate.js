const hideInputError = (formElement, inputElement, enableValidation) => {
  const { inputErrorClass, errorClass } = enableValidation;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, enableValidation) => {
  const { inputErrorClass, errorClass } = enableValidation;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const checkInputValidity = (formElement, inputElement, enableValidation) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, enableValidation);
  } else {
    showInputError(formElement, inputElement, enableValidation);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, enableValidation) => {
  const { inputSelector, submitButtonSelector, ...restEnableValidation } = enableValidation;
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restEnableValidation);
      toggleButtonState(buttonElement, inputList);
    })
  })
  toggleButtonState(buttonElement, inputList);
};

const enableValidation = (config) => {
  const { formSelector, ...restEnableValidation } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restEnableValidation);
  })
};