import './index.css';

import { initialCards, validationConfig, } from '../utils/constants.js';
import Card from '../comnponents/Card.js';
import Section from '../comnponents/Section.js';
import FormValidator from '../comnponents/FormValidator.js';
import PopupWithImage from '../comnponents/PopupWithImage.js';
import PopupWithForm from '../comnponents/PopupWithForm.js';
import UserInfo from '../comnponents/UserInfo.js';

const elementContainer = document.querySelector('.elements');
const buttonOpenCard = document.querySelector('.profile__add-button');
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const inputNameProfile = document
  .querySelector('.popup__form_type_profile')
  .querySelector('.popup__input_type_profile-name');
const inputJobProfile = document
  .querySelector('.popup__form_type_profile')
  .querySelector('.popup__input_type_profile-job');
const popupImage = new PopupWithImage('.popup_type_image');

const addInitialCards = new Section({
  itemsArray: initialCards,
  renderer: (item) => {
    addInitialCards.addItem(addCards(item));
  },
},
  elementContainer
);

const addCards = (item) => {
  return new Card(item, '.element-template', (data) => {
    popupImage.open(data);
  }).generateCard()
};

addInitialCards.renderItems();
popupImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupProfile.close();
  },
});
popupProfile.setEventListeners();


const popupMesto = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (item) => {
    addCards(item);
    popupMesto.close();
    addInitialCards.addItem(addCards(item));
  },
});
popupMesto.setEventListeners();

const formProfileValidator = new FormValidator(validationConfig, '.popup__form_type_profile');
formProfileValidator.enableValidation();
const formProfileCard = new FormValidator(validationConfig, '.popup__form_type_card');
formProfileCard.enableValidation();

buttonOpenProfile.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo()
  inputNameProfile.value = name;
  inputJobProfile.value = job;
  popupProfile.open();
  formProfileValidator.checkBtnStateOpenPopup();
});

buttonOpenCard.addEventListener("click", () => {
  popupMesto.open();
  formProfileCard.checkBtnStateOpenPopup();
});