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
  /*   {
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
  }, */
];

const cardsTemplateElement = document.querySelector(".card-template");
const cardsElements = document.querySelector(".elements");

function createCard(element) {
  const cardItem = cardsTemplateElement.content.cloneNode(true);
  cardItem.querySelector(".element__image").src = element.link;
  cardItem.querySelector(".element__title").textContent = element.name;
  cardsElements.prepend(cardItem);
}

initialCards.forEach(createCard);

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

formElement.addEventListener("submit", function (Event) {
  Event.preventDefault();
  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  closePopup(popupProfile);
});
