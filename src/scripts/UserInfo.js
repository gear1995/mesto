export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    console.log(this._name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    //console.log(this._name.textContent);
    //console.log(userInfo);
    return userInfo;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
