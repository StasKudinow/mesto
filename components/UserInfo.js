export default class UserInfo {
  constructor({ profileNameSelector, profilejobSelector}) {
    this._profileNameSelector = profileNameSelector;
    this._profilejobSelector = profilejobSelector;
  }

  getUserInfo() {
    const userInfo = {name: this._profileNameSelector.textContent, job: this._profilejobSelector.textContent};
    return userInfo;
  }

  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profilejobSelector.textContent = data.job;
  }
}