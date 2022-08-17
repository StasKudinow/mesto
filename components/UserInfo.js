export default class UserInfo {
  constructor({ profileNameSelector, profilejobSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profilejobSelector = profilejobSelector;
  }

  // Возвращение данных пользователя.
  getUserInfo() {
    const userInfoObj = {name: this._profileNameSelector.textContent, job: this._profilejobSelector.textContent};
    return userInfoObj;
  }

  // Принятие новых данных пользователя.
  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profilejobSelector.textContent = data.job;
  }
}