const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formEl) => {
    setEventListeners(formEl, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  })
}

const setEventListeners = (formEl, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  const inputsList = Array.from(formEl.querySelectorAll(inputSelector));
  const buttonEl = formEl.querySelector(submitButtonSelector);
  inputsList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      toggleInputErrorState(formEl, inputEl, inputErrorClass, errorClass);
      toggleBtnState(inputsList, buttonEl, inactiveButtonClass);
    });
  });
  toggleBtnState(inputsList, buttonEl, inactiveButtonClass);
}

const toggleInputErrorState = (formEl, inputEl, inputErrorClass, errorClass) => {
  const isInputElvalid = inputEl.validity.valid;
  if (!isInputElvalid) {
    const errorMesage = inputEl.validationMessage;
    showInputError(formEl, inputEl, errorMesage, inputErrorClass, errorClass);
  } else {
    hideInputError(formEl, inputEl, inputErrorClass, errorClass);
  }
}

const showInputError = (formEl, inputEl, errorMesage, inputErrorClass, errorClass) => {
  const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.id}`);
  inputEl.classList.add(inputErrorClass);
  errorEl.classList.add(errorClass);
  errorEl.textContent = errorMesage;
}

const hideInputError = (formEl, inputEl, inputErrorClass, errorClass) => {
  const errorEl = formEl.querySelector(`.popup__error_type_${inputEl.id}`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = '';
}

const toggleBtnState = (inputsList, buttonEl, inactiveButtonClass) => {
  hasInvalidInput(inputsList) ? disableBtnState(buttonEl, inactiveButtonClass) : enableBtnState(buttonEl, inactiveButtonClass);
}

const disableBtnState = (buttonEl, inactiveButtonClass) => {
  buttonEl.setAttribute('disabled', true);
  buttonEl.classList.add(inactiveButtonClass);
}

const enableBtnState = (buttonEl, inactiveButtonClass) => {
  buttonEl.removeAttribute('disabled');
  buttonEl.classList.remove(inactiveButtonClass);
}

const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const checkBtnStateOpenPopup = (popup, { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formEl = popup.querySelector(formSelector);
  const inputsList = Array.from(popup.querySelectorAll(inputSelector));
  const buttonEl = popup.querySelector(submitButtonSelector);
  inputsList.forEach((inputEl) => {
    toggleBtnState(inputsList, buttonEl, inactiveButtonClass);
    hideInputError(formEl, inputEl, inputErrorClass, errorClass);
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
}

enableValidation(validationConfig);