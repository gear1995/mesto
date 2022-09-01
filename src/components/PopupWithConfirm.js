import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._setEvt = this._setEvt.bind(this);
  }

  handleSubmitConfirm(submitConfirm) {
    this._handleSubmit = submitConfirm;
  }

  _setEvt(e) {
    e.preventDefault();
    this._handleSubmit();
  }

  open() {
    super.open();
    this._popup.addEventListener("submit", this._setEvt);
  }

  close() {
    super.close();
    this._popup.removeEventListener("submit", this._setEvt);
  }
}
