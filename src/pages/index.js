import "./../pages/index.css";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  settings,
  userData,
  templateSelector,
  editButton,
  addButton,
  nameFieldElement,
  descriptionFieldElement,
  popupFormAdding,
  popupFormProfile,
} from "../components/utils.js";

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
  formProfile.resetValidation();

  popupTypeProfile.open();
});

addButton.addEventListener("click", function () {
  popupFormAdding.reset();
  formAdd.resetValidation();
  popupTypeAdding.open();
});
