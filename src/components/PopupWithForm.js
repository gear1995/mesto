import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandle }) {
    super(popupSelector);
    this._submitHandle = submitHandle;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._submitButton = this._popup.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  _getInputValues() {
    this._values = {};
    this._inputList.forEach((item) => {
      this._values[item.name] = item.value;
    });
    return this._values;
  }

  renderLoad(isLoad) {
    if (isLoad) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandle(this._getInputValues());
    });
  }
}
