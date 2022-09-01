export default class Api {
  constructor(obj) {
    this._host = obj.host;
    this._token = obj.token;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Ошибка при загрузке данных");
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "content-type": "application/json",
    };
  }

  postCard(data) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJsonOrError);
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  updateAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._getJsonOrError);
  }

  updateUserInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._getJsonOrError);
  }

  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  setLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  deleteLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }
}
