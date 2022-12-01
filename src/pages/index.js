import './index.css';

import { 
  initialCards, 
  validationConfig,
  elementContainer,
  buttonOpenCard,
  buttonOpenProfile,
  inputNameProfile,
  inputJobProfile } from '../scripts/utils/constants.js';
import Card from '../scripts/comnponents/Card.js';
import Section from '../scripts/comnponents/Section.js';
import FormValidator from '../scripts/comnponents/FormValidator.js';
import PopupWithImage from '../scripts/comnponents/PopupWithImage.js';
import PopupWithForm from '../scripts/comnponents/PopupWithForm.js';
import UserInfo from '../scripts/comnponents/UserInfo.js';
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
  const getUserInfo = userInfo.getUserInfo();
  inputNameProfile.value = getUserInfo.name;
  inputJobProfile.value = getUserInfo.job;
  popupProfile.open();
  formProfileValidator.checkBtnStateOpenPopup();
});

buttonOpenCard.addEventListener("click", () => {
  popupMesto.open();
  formProfileCard.checkBtnStateOpenPopup();
});