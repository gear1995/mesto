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
const formElementProfile = popupProfile.querySelector("#profile");
const popupImage = document.querySelector(".popup_type_image");
const imageName = document.querySelector(
  ".popup__input_place_field-image-name"
);
const imageLink = document.querySelector(".popup__input_place_field-link");
const formAdding = document.querySelector(".popup__form-adding");
const cardsTemplateElement = document.querySelector(".card-template");
const cardsElements = document.querySelector(".elements");
const formElementImage = popupAdding.querySelector(".popup__form");
const image = document.querySelector(".popup__element-image");
const popupSubtitle = document.querySelector(".popup__subtitle");
const submitButtonSelector = document.querySelector("#create");

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
}

const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

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

formElementProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  closePopup(popupProfile);
});

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
  image.setAttribute("src", src);
  image.setAttribute("alt", titleElement.textContent);
  popupSubtitle.textContent = titleElement.textContent;
  openPopup(popupImage);
}
function createCard(link, name) {
  const cardElement = cardsTemplateElement.content.cloneNode(true);
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = name;
  cardElement.querySelector(".element__title").textContent = name;

  addCardListeners(cardElement);
  return cardElement;
}

const addСard = (link, name) => {
  const card = createCard(link, name);
  cardsElements.prepend(card);
};

initialCards.forEach((item, i) => {
  link = initialCards[i].link;
  name = initialCards[i].name;
  addСard(link, name);
});

function handleDelete(e) {
  const cardElement = e.currentTarget.closest(".element");
  cardElement.remove();
}

function handleLike(e) {
  const like = e.currentTarget;
  like.classList.toggle("like-button_active");
}

formElementImage.addEventListener("submit", function (e) {
  e.preventDefault();
  addСard(imageLink.value, imageName.value);
  formAdding.reset();
  closePopup(popupAdding);
  submitButtonSelector.disabled = true;
  submitButtonSelector.classList.add("popup__button_disabled");
});
