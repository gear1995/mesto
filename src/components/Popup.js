export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector(".popup__close");
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  setEventListeners() {
    this._popupButtonClose.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
