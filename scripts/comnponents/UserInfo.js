export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._jobUser = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      job: this._jobUser.textContent
    }
  }

  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._jobUser.textContent = data.job;
  }
}