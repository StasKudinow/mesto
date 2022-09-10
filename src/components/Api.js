import { data } from "autoprefixer";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfileData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setProfileData(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  putLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(this._checkResponse)
  }
}