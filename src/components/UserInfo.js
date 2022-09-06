export default class UserInfo {
  constructor({ profileNameSelector, profilejobSelector, profileAvatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profilejobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  // Возвращение данных пользователя.
  getUserInfo() {
    const userInfoObj = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return userInfoObj;
  }

  // Принятие новых данных пользователя.
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}