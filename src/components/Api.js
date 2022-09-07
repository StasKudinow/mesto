export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getProfileData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

  setProfileData(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

}