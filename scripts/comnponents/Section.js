export default class Section {
  constructor({ itemsArray, renderer }, containerSelector) {
    this._itemsArray = itemsArray;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._itemsArray.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}