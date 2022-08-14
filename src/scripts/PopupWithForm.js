import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandle }) {
    super(popupSelector);
    this._submitHandle = submitHandle;
    this._formElement = this._popup.querySelector(".popup__form");
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  _getInputValues() {
    this._values = {};
    const inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    inputList.forEach((item) => {
      this._values[item.name] = item.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandle(this._getInputValues());
    });
  }
}
