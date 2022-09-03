import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._setEvent = this._setEvent.bind(this);
  }

  handleSubmit(submit) {
    this._handleSubmit = submit;
  }

  _setEvent(e) {
    e.preventDefault();
    this._handleSubmit();
  }

  open() {
    super.open();
    this._formElement.addEventListener("submit", this._setEvent);
  }

  close() {
    super.close();
    this._formElement.removeEventListener("submit", this._setEvent);
  }
}
