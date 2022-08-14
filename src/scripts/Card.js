export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    console.log(this._templateSelector);
    const cardElement =
      this._templateSelector.content.cloneNode(true).children[0];
    return cardElement;
  }

  _addEventListeners() {
    this._cardDelete = this._view.querySelector(".popup__delete");
    this._likeButton = this._view.querySelector(".like-button");
    this._elementImage = this._view.querySelector(".element__image");

    this._cardDelete.addEventListener("click", this._handleDelete);

    this._likeButton.addEventListener("click", this._handleLike);

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleDelete = (e) => {
    e.preventDefault();
    this._view.remove();
  };

  _handleLike = (e) => {
    e.preventDefault();
    this._likeButton.classList.toggle("like-button_active");
  };

  render() {
    this._view = this._getTemplate();
    this._elementTitle = this._view.querySelector(".element__title");
    this._elementImage = this._view.querySelector(".element__image");

    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;

    this._addEventListeners();
    return this._view;
  }
}
