export default class UserInfo {
  constructor({ profileNameSelector, profilejobSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profilejobSelector);
  }

  // Возвращение данных пользователя.
  getUserInfo() {
    const userInfoObj = {name: this._name.textContent, job: this._job.textContent};
    return userInfoObj;
  }

  // Принятие новых данных пользователя.
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}