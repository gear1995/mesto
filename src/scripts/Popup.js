export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector(".popup__close");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  setEventListeners() {
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
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
