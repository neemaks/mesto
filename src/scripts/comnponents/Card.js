export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _getLikeElement() {
    this._element
      .querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _getRemoveElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        this._handleCardClick(this._data);
      });

    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', () => this._getLikeElement());

    this._element
      .querySelector('.element__trash')
      .addEventListener('click', () => this._getRemoveElement());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__photo');
    this._caption = this._element.querySelector(".element__title");
    this._image.src = this._link;
    this._image.alt = `место ${this._name}`;
    this._caption.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
};