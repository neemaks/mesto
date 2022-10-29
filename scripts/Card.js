import { popupImage, openPopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeToggle() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handlebuttonTrash() {
    this._element.remove();
  }

  _handlePopupImage() {
    const popupImg = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

    popupImg.src = this._link;
    popupImg.alt = `место ${this._name}`;

    popupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeToggle();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handlebuttonTrash();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      openPopup(popupImage);
      this._handlePopupImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const imgEl = this._element.querySelector('.element__photo');
    const titleEl = this._element.querySelector('.element__title');

    imgEl.src = this._link;
    imgEl.alt = `место ${this._name}`;
    titleEl.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
};
