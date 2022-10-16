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

// *SECTION POPUP Находим попап и кнопки
const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-icon');

// *SECTION POPUP Находим форму
const formElement = document.querySelector('.popup__form');

// *SECTION POPUP Находим поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// *SECTION POPUP Находим поля для редактироания имени и профессии
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// *SECTION CARD Находим карточки и кнопки
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const cardOpenButton = document.querySelector('.profile__add-button');
const buttonCloseProfile = document.querySelector('.popup__close-icon_type_profile');
const buttonCloseCard = document.querySelector('.popup__close-icon_type_card');

// *SECTION ELEMENT Находим лайк
const likeButton = document.querySelector('.element__like-button')



const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  if (popup === popupProfile) {
    addPopupText()
  }
}

const addPopupText = () => {
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}





// *SECTION POPUP Обработчик «отправки» формы
const formSubmitHandler = (evt) => {
  // *SECTION POPUP Отменяем стандартную отправку формы
  evt.preventDefault();

  // *SECTION POPUP Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobeValue = jobInput.value;

  // *SECTION POPUP Выбираем и вставлям новые значения полей
  titleName.textContent = nameValue;
  titleJob.textContent = jobeValue;

  closePopup(popupProfile)
}

// *SECTION ELEMENT Делаем лайк кликабельным
const toggleLikeButton = () => {
  likeButton.classList.toggle('element__like-button_active');
}

function addCard(imgValue, titleValue) {
  const template = document.querySelector('.element-template').content;
  const elementTemplate = template.querySelector('.element').cloneNode(true);

  const imgEL = elementTemplate.querySelector('.element__photo');
  const titleEl = elementTemplate.querySelector('.element__title');

  imgEL.src = imgValue
  titleEl.textContent = imgValue
}



openButton.addEventListener('click', () => {
  openPopup(popupProfile)
})
cardOpenButton.addEventListener('click', () => {
  openPopup(popupCard)
})

buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile)
})
buttonCloseCard.addEventListener('click', () => {
  closePopup(popupCard)
})

formElement.addEventListener('submit', formSubmitHandler);
likeButton.addEventListener('click', toggleLikeButton);