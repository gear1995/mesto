const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (buttonElement, buttonDisabled) => {
  buttonElement.classList.add(buttonDisabled);
  buttonElement.disabled = true;
};
const enableButton = (buttonElement, buttonDisabled) => {
  buttonElement.classList.remove(buttonDisabled);
  buttonElement.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  const buttonDisabled = document.querySelector(settings.inactiveButtonClass);
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonElement, buttonDisabled);
  } else {
    // иначе сделай кнопку активной
    enableButton(buttonElement, buttonDisabled);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  });
};

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
};

enableValidation(settings);
