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
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add");

const profileTitle = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(
  ".popup__input_place_field-name"
);

const profileSubtitle = document.querySelector(".profile__subtitle");
const descriptionFieldElement = document.querySelector(
  ".popup__input_place_field-description"
);

const formElement = document.querySelector(".popup__form");

function popupIsOpen() {
  popup.classList.add("popup_opened");
}

function popupIsClose() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  popupIsOpen();
  nameFieldElement.value = profileTitle.textContent;
  descriptionFieldElement.value = profileSubtitle.textContent;
});

editButton.addEventListener("click", function () {
  popupIsOpen();
});

closePopupButton.addEventListener("click", function () {
  popupIsClose();
});

formElement.addEventListener("submit", function (Event) {
  Event.preventDefault();
  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  popupIsClose();
});

/* function detectClickOutside(event) {
  console.log(event.target);
  console.log(event.target.classList);
  if (event.target.classList.contains("popup")) {
    popup.classList.remove("popup_opened");
  }
} */
