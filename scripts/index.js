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

// Карточка с местами
const elementContainer = document.querySelector('.elements');

// Попап профайл
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = document.querySelector('.popup__form_type_profile');
const buttonOpenProfile = document.querySelector('.profile__edit-button');

const inputNameProfile = document.querySelector('.popup__input_type_profile-name');
const inputJobProfile = document.querySelector('.popup__input_type_profile-job');

const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// Попап карточки
const popupCard = document.querySelector('.popup_type_card');
const formCard = document.querySelector('.popup__form_type_card');
const buttonOpenCard = document.querySelector('.profile__add-button');

const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard = document.querySelector('.popup__input_type_card-link');

// Попап картинки
const popupImage = document.querySelector('.popup_type_image');
const popupImg = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// Template
const template = document.querySelector('.element-template').content;
const likeButton = document.querySelector('.element__like-button');

// Открываем и закрываем Попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Слушатель на попап для закрытия по клику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closeByClick(evt, popup);
  });
});

// Закрытие клавишей Еск
const closeByEsc = (evt) => {
  const currentPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(currentPopup);
    formCard.reset();
  }
}

// Закрытие попап на клик
const closeByClick = (evt, popupType) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-icon')) {
    closePopup(popupType);
    formCard.reset();
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

// Попап карточек вносим данные
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const elemData = {
    name: inputNameCard.value,
    link: inputLinkCard.value
  }

  const newCard = getCard(elemData);
  elementContainer.prepend(newCard);

  formCard.reset();

  closePopup(popupCard);
}

// Темплейт 
const getCard = (elemData) => {
  const elementTemplate = template.querySelector('.element').cloneNode(true);
  const imgEl = elementTemplate.querySelector('.element__photo');
  const titleEl = elementTemplate.querySelector('.element__title');

  imgEl.src = elemData.link;
  imgEl.alt = `место ${elemData.name}`;
  titleEl.textContent = elemData.name;

  // Тогл лайка
  const buttonLike = elementTemplate.querySelector('.element__like-button');
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  // Удаление карточки по корзине
  const buttonTrash = elementTemplate.querySelector('.element__trash');
  buttonTrash.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  // Открытие попап фото по клику 
  imgEl.addEventListener('click', () => {
    openPopup(popupImage);

    popupImg.src = elemData.link;
    popupImg.alt = elemData.name;

    popupCaption.textContent = elemData.name;
  });

  return elementTemplate;
}

// Добовляем в контейнер
const addCard = () => {
  const newCard = initialCards.map(getCard);
  elementContainer.append(...newCard);
}

// Слушатель открытия попапа с текстовой формой
buttonOpenProfile.addEventListener('click', () => {
  openPopup(popupProfile);

  inputNameProfile.value = titleName.textContent;
  inputJobProfile.value = titleJob.textContent;

  checkBtnStateOpenPopup(popupProfile, validationConfig);
})

// Слушатель на открытие попапа карт
buttonOpenCard.addEventListener('click', () => {
  openPopup(popupCard);
  checkBtnStateOpenPopup(popupCard, validationConfig);
})

// Слушатель на сабмит профайла
formProfile.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
});

// Слушатель на сабмит карты
formCard.addEventListener('submit', (evt) => {
  handleCardFormSubmit(evt);
});

addCard();