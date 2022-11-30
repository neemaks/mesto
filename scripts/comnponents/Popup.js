export default class Popup {
  constructor(popupSelector) {
    this._popupType = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupType.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    evt.key == 'Escape'
      ? this.close()
      : false;
  }

  _handleOverlayClose(evt) {
    evt.target === evt.currentTarget
      ? this.close()
      : false;
  }

  setEventListeners() {
    this._popupType.querySelector(".popup__close-icon").addEventListener("mousedown", () => this.close());
    this._popupType.addEventListener("mousedown", (evt) => this._handleOverlayClose(evt));
  }
}