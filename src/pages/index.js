import "./../pages/index.css";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import {
  popupFormAvatar,
  avatarEditButton,
  settings,
  templateSelector,
  editButton,
  addButton,
  nameFieldElement,
  descriptionFieldElement,
  popupFormAdding,
  popupFormProfile,
  popupProfileSelector,
  popupAvatarSelector,
  popupAddingSelector,
  popupDeleteSelector,
  popupImageSelector,
  containerSelector,
} from "../utils/components.js";
const formProfile = new FormValidator(settings, popupFormProfile);
formProfile.enableValidation();
const formAddCard = new FormValidator(settings, popupFormAdding);
formAddCard.enableValidation();

const formAvatar = new FormValidator(settings, popupFormAvatar);
formAvatar.enableValidation();

const api = new Api({
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: "2b5dd042-b3e6-48bb-820c-257c3546a5a1",
});

let userId = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    userInfoProfile.setUserInfo(userInfo);
    userInfoProfile.setUserAvatar(userInfo);
    cards.reverse();
    cardsList.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
  });

const cardsList = new Section(
  {
    items: [],
    renderer: (data) => {
      cardsList.addItem(createCardFromServer(data));
    },
  },
  containerSelector
);

const userInfoProfile = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__image",
});

const popupTypeProfile = new PopupWithForm(popupProfileSelector, {
  submitHandle: (info) => {
    popupTypeProfile.renderLoad(true);
    api
      .updateUserInfo(info)
      .then((res) => {
        userInfoProfile.setUserInfo(res);
        popupTypeProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupTypeProfile.renderLoad(false);
      });
  },
});
popupTypeProfile.setEventListeners();

editButton.addEventListener("click", function () {
  const userProfile = userInfoProfile.getUserInfo();
  nameFieldElement.value = userProfile.name;
  descriptionFieldElement.value = userProfile.about;
  formProfile.resetValidation();
  popupTypeProfile.open();
});

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, {
  submitHandle: (data) => {
    popupEditAvatar.renderLoad(true);
    api
      .updateAvatar(data)
      .then((res) => {
        userInfoProfile.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupEditAvatar.renderLoad(false);
      });
  },
});
popupEditAvatar.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  formAvatar.resetValidation();
  popupEditAvatar.open();
});

const popupTypeAdding = new PopupWithForm(popupAddingSelector, {
  submitHandle: (info) => {
    popupTypeAdding.renderLoad(true);
    api
      .postCard(info)
      .then((info) => {
        const card = createCardFromServer(info);
        cardsList.addItem(card);
        popupTypeAdding.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupTypeAdding.renderLoad(false);
      });
  },
});
popupTypeAdding.setEventListeners();

addButton.addEventListener("click", function () {
  popupFormAdding.reset();
  formAddCard.resetValidation();
  popupTypeAdding.open();
});

const popupDelete = new PopupWithConfirm(popupDeleteSelector, {
  handleSubmit: (data) => {
    api
      .deleteCard(data)
      .then(() => {
        popupDelete.close();
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
popupDelete.setEventListeners();

const createCardFromServer = (data) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: () => {
        popupImage.open(data.name, data.link);
      },

      handleDelete: () => {
        popupDelete.open();
        popupDelete.handleSubmit(() => {
          api
            .deleteCard(card._id)
            .then(() => {
              card.deleteCard();
              popupDelete.close();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },

      handleLike: () => {
        if (card.isLiked()) {
          api
            .deleteLike(card._id)
            .then((data) => {
              card.deleteLike();
              card.setLike(data.likes);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          api
            .setLike(card._id)
            .then((data) => {
              card.addLike();
              card.setLike(data.likes);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    },
    templateSelector
  );
  const cardEl = card.render();
  return cardEl;
};

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();
