import Card from './Card.js';
import FormValidator from './FormValidator.js';
export { popupImage, openPopup };

// Карточки при загрузке
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Валидации всех форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
}

// Карточка с местами
const elementContainer = document.querySelector('.elements');

// Попапы
const popups = document.querySelectorAll('.popup');

// Попап прфайл
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = document.querySelector('.popup__form_type_profile');
const buttonOpenProfile = document.querySelector('.profile__edit-button');

// Импуты профайла
const inputNameProfile = document.querySelector('.popup__input_type_profile-name');
const inputJobProfile = document.querySelector('.popup__input_type_profile-job');

// Содержимое имени и профессии на странице в профиле
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');


// Попап карточки
const popupCard = document.querySelector('.popup_type_card');
const formCard = document.querySelector('.popup__form_type_card');
const buttonOpenCard = document.querySelector('.profile__add-button');

// Попап новой карточки - импуты
const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard = document.querySelector('.popup__input_type_card-link');

// Попап картинки карточки
const popupImage = document.querySelector('.popup_type_image');


// Открываем и закрываем Попапы (плюс слушатель на клавишу ESC)
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция закрытия клавишей ESC
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// Функция закрытия на клик вне Папапов
const closeByClick = (evt) => {
  const currentPopup = evt.currentTarget;
  if (evt.target === currentPopup || evt.target.classList.contains('popup__close-icon')) {
    closePopup(currentPopup);
  }
}

// Попап обработчик «отправки» формы
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const nameValue = inputNameProfile.value;
  const jobeValue = inputJobProfile.value;

  titleName.textContent = nameValue;
  titleJob.textContent = jobeValue;

  closePopup(popupProfile);
}

// Попап обработчик создания карточки 
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const elemData = {
    name: inputNameCard.value,
    link: inputLinkCard.value
  };

  // Карточка из класса Card
  const newCard = new Card(elemData, '.element-template').generateCard();
  elementContainer.prepend(newCard);

  closePopup(popupCard);
}

// Добавляем в контейнер карточек при загрузке
const addInitialCards = () => {
  initialCards.map((item) => {
    const newCard = new Card(item, '.element-template').generateCard();
    elementContainer.append(newCard);
  });
}

// Валидация форм из класса FormValidator
const formProfileValidator = new FormValidator(validationConfig, '.popup__form_type_profile');
formProfileValidator.enableValidation();
const formProfileCard = new FormValidator(validationConfig, '.popup__form_type_card');
formProfileCard.enableValidation();

// Слушатель открытия Попапа профайл с текстовой формой 
buttonOpenProfile.addEventListener('click', () => {
  openPopup(popupProfile);

  inputNameProfile.value = titleName.textContent;
  inputJobProfile.value = titleJob.textContent;

  formProfileValidator.checkBtnStateOpenPopup();
});

// Слушатель на кнопку сохранить Попапа профайла
formProfile.addEventListener('submit', handleProfileFormSubmit);

// Слушатель на открытие Попапа карточки
buttonOpenCard.addEventListener('click', () => {
  formCard.reset();
  openPopup(popupCard);
  formProfileCard.checkBtnStateOpenPopup();
});

// Слушатель на кнопку создать Попапа карточки
formCard.addEventListener('submit', handleCardFormSubmit);

// Слушатель для закрытия вне Попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closeByClick(evt);
  });
});

// Объявлякм контейнер карточек при загрузке
addInitialCards();