const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
const popups = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const popupAdding = document.querySelector(".popup_type_adding");
const profileTitle = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(
  ".popup__input_place_field-name"
);
const profileSubtitle = document.querySelector(".profile__subtitle");
const descriptionFieldElement = document.querySelector(
  ".popup__input_place_field-description"
);
const formElement = document.querySelector(".popup__form");
const imageButton = document.querySelector(".element__image");
const popupImage = document.querySelector(".popup_type_image");

function openPopup(element) {
  element.classList.add("popup_opened");
}

function closePopup(element) {
  element.classList.remove("popup_opened");
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

editButton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameFieldElement.value = profileTitle.textContent;
  descriptionFieldElement.value = profileSubtitle.textContent;
});

addButton.addEventListener("click", function () {
  openPopup(popupAdding);
});

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  closePopup(popupProfile);
});

const cardsTemplateElement = document.querySelector(".card-template");
const cardsElements = document.querySelector(".elements");
const formElementImage = popupAdding.querySelector(".popup__form");

function addCardListeners(cardElement) {
  cardElement
    .querySelector(".popup__delete")
    .addEventListener("click", handleDelete);
  cardElement
    .querySelector(".like-button")
    .addEventListener("click", handleLike);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleOpenPopupImage);
}

function handleOpenPopupImage(e) {
  const src = e.currentTarget.getAttribute("src");
  const parentElement = e.currentTarget.closest(".element");
  const titleElement = parentElement.querySelector(".element__title");
  const image = document.querySelector(".popup__element-image");
  const popupSubtitle = document.querySelector(".popup__subtitle");
  image.setAttribute("src", src);
  image.setAttribute("alt", titleElement.textContent);
  popupSubtitle.textContent = titleElement.textContent;
  openPopup(popupImage);
}

function createCard(elementInfo) {
  const cardElement = cardsTemplateElement.content.cloneNode(true);
  cardElement.querySelector(".element__image").src = elementInfo.link;
  cardElement.querySelector(".element__image").alt = elementInfo.name;
  cardElement.querySelector(".element__title").textContent = elementInfo.name;
  addCardListeners(cardElement);
  return cardElement;
}

const addcard = (cardItem) => {
  const card = createCard(cardItem);
  cardsElements.prepend(card);
};

initialCards.forEach(addcard);

function handleDelete(e) {
  const cardElement = e.currentTarget.closest(".element");
  cardElement.remove();
}

function handleLike(e) {
  const like = e.currentTarget;
  like.classList.toggle("like-button_active");
}

const imageName = document.querySelector(
  ".popup__input_place_field-image-name"
);
const imageLink = document.querySelector(".popup__input_place_field-link");
const formAdding = document.querySelector(".popup__form-adding");

function createCardForm() {
  const cardElement = cardsTemplateElement.content.cloneNode(true);
  cardElement.querySelector(".element__image").src = imageLink.value;
  cardElement.querySelector(".element__image").alt = imageName.value;
  cardElement.querySelector(".element__title").textContent = imageName.value;
  addCardListeners(cardElement);
  return cardElement;
}

function addCardForm() {
  cardsElements.prepend(createCardForm());
}

formElementImage.addEventListener("submit", function (e) {
  e.preventDefault();
  addCardForm();
  formAdding.reset();
  closePopup(popupAdding);
});
