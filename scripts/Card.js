export default class Card {
  constructor(name, link, templateSelector, handleOpenPopupImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }

  _getTemplate() {
    const cardElement =
      this._templateSelector.content.cloneNode(true).children[0];
    return cardElement;
  }

  _addEventListeners() {
    this._view
      .querySelector(".popup__delete")
      .addEventListener("click", this._handleDelete);
    this._view
      .querySelector(".like-button")
      .addEventListener("click", this._handleLike);

    this._view
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopupImage(this._name, this._link);
      });
  }

  _handleDelete = (e) => {
    e.preventDefault();
    this._view.remove();
  };

  _handleLike = (e) => {
    e.preventDefault();
    this._view
      .querySelector(".like-button")
      .classList.toggle("like-button_active");
  };

  render(cardsElements) {
    this._view = this._getTemplate();
    const elementTitle = this._view.querySelector(".element__title");
    const elementImage = this._view.querySelector(".element__image");

    elementTitle.textContent = this._name;
    elementImage.alt = this._name;
    elementImage.src = this._link;

    this._addEventListeners();
    cardsElements.prepend(this._view);
  }
}
