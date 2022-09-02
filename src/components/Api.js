export default class Api {
  constructor(baseUrl, { headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfileInfo() {
    return fetch(this._baseUrl, { headers: this._headers })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

  getInitialCards() {
    return fetch(this._baseUrl, { headers: this._headers })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
  }

}