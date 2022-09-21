// Находим попап и кнопки
const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-icon');

// Открываем и закрваем попап (заносим данные из профиля) 
const togglePopup = () => {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = titleName.textContent;
    jobInput.value = titleJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

// Находим форму
const formElement = document.querySelector('.popup__form');
// Находим поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
// Находим поля для редактироания имени и профессии
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobeValue = jobInput.value;

  // Выбираем и вставлям новые значения полей
  titleName.textContent = nameValue;
  titleJob.textContent = jobeValue;
  togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);