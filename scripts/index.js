// *SECTION POPUP Находим попап и кнопки
const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-icon');

// *SECTION POPUP Открываем и закрваем попап (заносим данные из профиля) 
const togglePopup = () => {
  if (popup.classList.contains('popup_opened')) {
    jobInput.value = titleJob.textContent;
    nameInput.value = titleName.textContent;
  }
  popup.classList.toggle('popup_opened');
}

openButton.addEventListener('click', togglePopup);

// *SECTION POPUP Добовляем fade out animation на закрытие popup
closeButton.addEventListener('click', () => {
  popup.setAttribute("closing", "");

  popup.addEventListener('animationend', () => {
    popup.removeAttribute("closing");
    togglePopup();
  }, { once: true });
});

// *SECTION POPUP Находим форму
const formElement = document.querySelector('.popup__form');
// *SECTION POPUP Находим поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
// *SECTION POPUP Находим поля для редактироания имени и профессии
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// *SECTION POPUP Обработчик «отправки» формы
function formSubmitHandler(evt) {
  // *SECTION POPUP Отменяем стандартную отправку формы
  evt.preventDefault();

  // *SECTION POPUP Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobeValue = jobInput.value;

  // *SECTION POPUP Выбираем и вставлям новые значения полей
  titleName.textContent = nameValue;
  titleJob.textContent = jobeValue;
  // *SECTION POPUP Дублируем fade out animation на Submit закрытие
  popup.setAttribute("closing", "");
  popup.addEventListener('animationend', () => {
    popup.removeAttribute("closing");
    togglePopup();
  }, { once: true });
}

// *SECTION POPUP Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// *SECTION ELEMENT Находим лайк
const likeButton = document.querySelector('.element__like-button');
// *SECTION ELEMENT Делаем лайк кликабельным
likeButton.addEventListener('click', () => {
  likeButton.classList.toggle('element__like-button_active');
})

likeButton.addEventListener('click', likeButton);

// *SECTION CARD Находим карточки и кнопки
const card = document.querySelector('.card');
const cardOpenButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.card__close-icon');

// *SECTION CARD Открываем и закрваем карточки (заносим данные из профиля) 
const toggleCard = () => {
  if (card.classList.contains('card_opened')) {
    false;
  }
  card.classList.toggle('card_opened');
}

cardOpenButton.addEventListener('click', toggleCard);

// *SECTION CARD Добовляем fade out animation на закрытие card
cardCloseButton.addEventListener('click', () => {
  card.setAttribute("closing", "");

  card.addEventListener('animationend', () => {
    card.removeAttribute("closing");
    toggleCard();
  }, { once: true });
});