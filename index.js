const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-icon');
const closeSubmit = document.querySelector('.popup__submit');

// Открываем и закрваем Попап
const togglePopup = () => {
  popup.classList.toggle('popup__opened');
}

openButton.addEventListener('click', () => {
  togglePopup();
})

closeButton.addEventListener('click', () => {
  togglePopup();
})

closeSubmit.addEventListener('click', () => {
  togglePopup();
})

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__imput-name', 'жак');
const jobInput = document.querySelector('.popup__imput-profession');
// Находим поля для замены
const titleName = document.querySelector('.profile__title');
const titleJob = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  // Отменяем стандартную отправку формы.
  evt.preventDefault();

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobeValue = jobInput.value;

  // Выбираем и вставлям новые значения полей
  titleName.textContent = nameValue; 
  titleJob.textContent = jobeValue;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 