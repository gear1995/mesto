export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDelete, handleLike },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateElement = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateElement)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _addEventListeners() {
    this._cardDelete = this._view.querySelector(".popup__delete");
    this._likeButton = this._view.querySelector(".like-button");
    this._cardDelete.addEventListener("click", () => {
      this._handleDelete();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  deleteCard = () => {
    this._view.remove();
    this._view = null;
  };

  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._cardDelete.remove();
    }
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId);
  }

  _checkOwnLike() {
    this.isLiked() ? this.addLike() : this.deleteLike();
  }

  setLike() {
    this._likeCounter.textContent = this._likes.length;
  }

  addLike = () => {
    this._likeButton.classList.add("like-button_active");
  };

  deleteLike = () => {
    this._likeButton.classList.remove("like-button_active");
  };

  render() {
    this._view = this._getTemplate();
    this._elementTitle = this._view.querySelector(".element__title");
    this._elementImage = this._view.querySelector(".element__image");
    this._likeCounter = this._view.querySelector(".like-container__counter");
    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._addEventListeners();
    this._hideDeleteButton();
    this.setLike(this._likes);
    this._checkOwnLike();
    return this._view;
  }
}
