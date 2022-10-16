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
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = document.querySelector('.popup__form_type_profile');
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-icon_type_profile');
const inputNameProfile = document.querySelector('.popup__input_type_profile-name');
const inputJobProfile = document.querySelector('.popup__input_type_profile-job');

const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// Попап карточки
const popupCard = document.querySelector('.popup_type_card');
const formCard = document.querySelector('.popup__form_type_card');
const buttonOpenCard = document.querySelector('.profile__add-button');
const buttonCloseCard = document.querySelector('.popup__close-icon_type_card');

const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard = document.querySelector('.popup__input_type_card-link');

// Попап картинки
const popupImage = document.querySelector('.popup_type_image');
const buttonCloseImage = document.querySelector('.popup__close-icon_type_image');

// Находим лайк
const likeButton = document.querySelector('.element__like-button');


// Открываем и закрываем Попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}


// Попап обработчик «отправки» формы
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();

  const nameValue = inputNameProfile.value;
  const jobeValue = inputJobProfile.value;

  titleName.textContent = nameValue;
  titleJob.textContent = jobeValue;

  closePopup(popupProfile);
}

// Попап карточек вносим данные
const formSubmitHandlerCard = (evt) => {
  evt.preventDefault();

  const elemData = {
    name: inputNameCard.value,
    link: inputLinkCard.value
  }

  const newCard = getCard(elemData)
  elementContainer.prepend(newCard)

  inputNameCard.value = '';
  inputLinkCard.value = '';

  closePopup(popupCard);
}

// Темплейт 
const getCard = (elemData) => {
  const template = document.querySelector('.element-template').content;
  const elementTemplate = template.querySelector('.element').cloneNode(true);

  const imgEl = elementTemplate.querySelector('.element__photo');
  const titleEl = elementTemplate.querySelector('.element__title');

  imgEl.src = elemData.link;
  imgEl.alt = `место ${elemData.name}`;
  titleEl.textContent = elemData.name;


  const buttonLike = elementTemplate.querySelector('.element__like-button');
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });


  const buttonTrash = elementTemplate.querySelector('.element__trash');
  buttonTrash.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  })

  imgEl.addEventListener('click', () => {
    openPopup(popupImage)

    const popupImg = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

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


buttonOpenProfile.addEventListener('click', () => {
  openPopup(popupProfile);

  inputNameProfile.value = titleName.textContent;
  inputJobProfile.value = titleJob.textContent;
})

buttonOpenCard.addEventListener('click', () => {
  openPopup(popupCard);
})

buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
})

buttonCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
})
buttonCloseImage.addEventListener('click', () => {
  closePopup(popupImage);
})

formProfile.addEventListener('submit', (evt) => {
  formSubmitHandlerProfile(evt)
});
formCard.addEventListener('submit', (evt) => {
  formSubmitHandlerCard(evt)
});

addCard();