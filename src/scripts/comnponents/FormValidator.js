export default class FormValidator {
  constructor(validationConfig, formSelector) {
    this._validationConfig = validationConfig;
    this._formSelector = formSelector;
    this._formEl = document.querySelector(this._formSelector);
    this._inputList = Array.from(this._formEl.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonEl = this._formEl.querySelector(this._validationConfig.submitButtonSelector);
  }

  _toggleInputErrorState(inputEl) {
    const isInputElValid = inputEl.validity.valid;
    if (!isInputElValid) {
      const errorMesage = inputEl.validationMessage;
      this._showInputError(inputEl, errorMesage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _showInputError(inputEl, errorMesage) {
    const errorEl = this._formEl.querySelector(`.popup__error_type_${inputEl.id}`);
    inputEl.classList.add(this._validationConfig.inputErrorClass);
    errorEl.classList.add(this._validationConfig.errorClass);
    errorEl.textContent = errorMesage;
  }

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`.popup__error_type_${inputEl.id}`);
    inputEl.classList.remove(this._validationConfig.inputErrorClass);
    errorEl.classList.remove(this._validationConfig.errorClass);
    errorEl.textContent = '';
  }

  _toggleBtnState() {
    this._hasInvalidInput() ? this._disableBtnState() : this._enableBtnState();
  }

  _disableBtnState() {
    this._buttonEl.setAttribute('disabled', true);
    this._buttonEl.classList.add(this._validationConfig.inactiveButtonClass);
  }

  _enableBtnState = () => {
    this._buttonEl.removeAttribute('disabled');
    this._buttonEl.classList.remove(this._validationConfig.inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  checkBtnStateOpenPopup() {
    this._inputList.forEach((inmputEl) => {
      this._toggleBtnState();
      this._hideInputError(inmputEl);
    })
  }

  enableValidation() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._toggleInputErrorState(inputEl);
        this._toggleBtnState();
      });
    })
  }
};
