import "./../pages/index.css";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

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
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
};
const userData = {
  name: ".profile__title",
  description: ".profile__subtitle",
};
const templateSelector = document.querySelector(".card-template");
const popupAdding = document.querySelector(".popup_type_adding");
const formElementImage = popupAdding.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
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
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector, handleCardClick);
  const cardEl = card.render();
  return cardEl;
}

const insertCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      insertCard.addItem(createCard(item.name, item.link, templateSelector));
    },
  },
  ".elements"
);
insertCard.renderItems();

const formAdd = new FormValidator(settings, popupFormAdding);
formAdd.enableValidation();

const formProfile = new FormValidator(settings, popupFormProfile);
formProfile.enableValidation();

const userInfoProfile = new UserInfo(userData);

/*  formElementImage.addEventListener("submit", function (e) {
  e.preventDefault();
  createCard(imageName.value, imageLink.value, templateSelector);
  formAdd.disableSubmitButton();
  formAdd.resetValidation();
  popupTypeAdding.close();
});

formElementProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  const userProfile = userInfoProfile.setUserInfo(); //вынести в отдельную функцию с колбэком
  formProfile.resetValidation();
  formProfile.disableSubmitButton();
  popupTypeProfile.close();
}); */

const popupTypeProfile = new PopupWithForm(".popup_type_profile", {
  submitHandle: (info) => {
    userInfoProfile.setUserInfo(info);
    popupTypeProfile.close();
  },
});
popupTypeProfile.setEventListeners();

const popupTypeAdding = new PopupWithForm(".popup_type_adding", {
  submitHandle: (info) => {
    insertCard.addItem(createCard(info.name, info.link, templateSelector));
    popupTypeAdding.close();
  },
});
popupTypeAdding.setEventListeners();

editButton.addEventListener("click", function () {
  const userProfile = userInfoProfile.getUserInfo();
  nameFieldElement.value = userProfile.name;
  descriptionFieldElement.value = userProfile.description;
  formProfile.disableSubmitButton();
  formProfile.resetValidation();
  popupTypeProfile.open();
});

addButton.addEventListener("click", function () {
  formAdd.disableSubmitButton();
  formAdd.resetValidation();
  popupTypeAdding.open();
});
