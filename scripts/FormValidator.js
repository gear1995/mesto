export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
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
    this._formElement.querySelector(this._submitButtonSelector).disabled = true;
    this._formElement
      .querySelector(this._submitButtonSelector)
      .classList.add(this._inactiveButtonClass);
  };

  _enableButton = () => {
    this._formElement.querySelector(
      this._submitButtonSelector
    ).disabled = false;
    this._formElement
      .querySelector(this._submitButtonSelector)
      .classList.remove(this._inactiveButtonClass);
  };

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this.disableSubmitButton(buttonElement);
    } else {
      // иначе сделай кнопку активной
      this._enableButton(buttonElement);
    }
  };

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
