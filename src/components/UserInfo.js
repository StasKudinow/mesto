export default class UserInfo {
  constructor({ profileNameSelector, profilejobSelector, profileAvatarSelector }, idUser) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profilejobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
    this._idUser = idUser;
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
  setUserInfo({ name, about, avatar, _id}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._idUser = _id;
  }
}