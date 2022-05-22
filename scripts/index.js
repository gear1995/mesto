const editButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(".popup__input_name");

const profileSubtitle = document.querySelector(".profile__subtitle");
const descriptionFieldElement = document.querySelector(
  ".popup__input_description"
);

const formElement = document.querySelector(".popup__form");

editButton.addEventListener("click", function () {
  popup.classList.add("popup__opened");
  nameFieldElement.value = profileTitle.textContent;
  descriptionFieldElement.value = profileSubtitle.textContent;
});

editButton.addEventListener("click", function () {
  popup.classList.add("popup__opened");
});

closePopupButton.addEventListener("click", function () {
  popup.classList.remove("popup__opened");
});

formElement.addEventListener("submit", function (Event) {
  Event.preventDefault();
  profileTitle.textContent = nameFieldElement.value;
  profileSubtitle.textContent = descriptionFieldElement.value;
  popup.classList.remove("popup__opened");
});

/* function detectClickOutside(event) {
  console.log(event.target);
  console.log(event.target.classList);
  if (event.target.classList.contains("popup")) {
    popup.classList.remove("popup__opened");
  }
} */
