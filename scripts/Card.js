import { popupImage, imagePopupCard, imagePopupCaption, openPopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._image = data.image;
    this._like = data.like;
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
    this._like.classList.toggle('element__like-button_active');
  }

  _handlebuttonTrash() {
    this._element.remove();
    this._element = null;
  }

  _handlePopupImage() {
    imagePopupCard.src = this._link;
    imagePopupCard.alt = `место ${this._name}`;
    imagePopupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.element__like-button');
    this._like.addEventListener('click', () => {
      this._handleLikeToggle();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handlebuttonTrash();
    });

    this._image.addEventListener('click', () => {
      openPopup(popupImage);
      this._handlePopupImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__photo');
    const titleEl = this._element.querySelector('.element__title');

    this._image.src = this._link;
    this._image.alt = `место ${this._name}`;
    titleEl.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
};
