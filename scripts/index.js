import Card from "./card.js";
import FormValidator from "./FormValidator.js";

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

const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
};

const cardsElements = document.querySelector(".elements");
const templateSelector = document.querySelector(".card-template");
const popupImage = document.querySelector(".popup_type_image");
const image = document.querySelector(".popup__element-image");
const popupSubtitle = document.querySelector(".popup__subtitle");
const popupAdding = document.querySelector(".popup_type_adding");
const formElementImage = popupAdding.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
const popups = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const nameFieldElement = document.querySelector(
  ".popup__input_place_field-name"
);
const profileSubtitle = document.querySelector(".profile__subtitle");
const descriptionFieldElement = document.querySelector(
  ".popup__input_place_field-description"
);
const formElementProfile = popupProfile.querySelector("#profile");
const imageName = document.querySelector(
  ".popup__input_place_field-image-name"
);
const imageLink = document.querySelector(".popup__input_place_field-link");
const popupFormAdding = document.querySelector(".popup__form-adding");
const popupFormProfile = document.querySelector(".popup_type_profile");

function handleOpenPopupImage(name, link) {
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  popupSubtitle.textContent = name;
  openPopup(popupImage);
}

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector, handleOpenPopupImage);
  cardsElements.prepend(card.render());
}

initialCards.forEach((item) => {
  createCard(item.name, item.link, templateSelector);
});

const formAdd = new FormValidator(settings, popupFormAdding);
formAdd.enableValidation();

const formProfile = new FormValidator(settings, popupFormProfile);
formProfile.enableValidation();

formElementImage.addEventListener("submit", function (e) {
  e.preventDefault();
  createCard(imageName.value, imageLink.value, templateSelector);
  formAdd.disableSubmitButton();

  formAdd.resetValidation();
  closePopup(popupAdding);
});

formElementProfile.addEventListener("submit", function (e) {
  e.preventDefault();

  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  formProfile.resetValidation();
  formProfile.disableSubmitButton();
  closePopup(popupProfile);
});

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup")) {
      closePopup(event.target);
    }
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
