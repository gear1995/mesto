export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._about.textContent = data.about;
    }
  }

  setUserAvatar(data) {
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
  }
}
