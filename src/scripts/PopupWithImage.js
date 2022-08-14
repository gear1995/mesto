import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__element-image");
    this._popupSubtitle = this._popup.querySelector(".popup__subtitle");
  }

  open(name, link) {
    this._image.setAttribute("src", link);
    this._image.setAttribute("alt", name);
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
