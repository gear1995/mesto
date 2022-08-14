export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );

    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        this._errorElement
      );
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableSubmitButton = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enableButton = () => {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._enableButton();
    }
  };

  /*   resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  } */

  _setEventListeners() {
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();

    this._formElement.addEventListener("reset", () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
