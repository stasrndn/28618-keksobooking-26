const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('[name="price"]');
const typeField = adForm.querySelector('[name="type"]');
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

const MAX_PRICE = 100000;
const NON_RESIDENTIAL_VALUE = 100;
const NOT_FOR_GUESTS = 100;

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const objectNames = {
  bungalow: 'бунгало',
  flat: 'квартиры',
  hotel: 'отеля',
  house: 'дома',
  palace: 'дворца'
};

const maxCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

Pristine.addValidator('min', () => true);
Pristine.addValidator('max', () => true);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const onPristineValidate = (evt) => {
  evt.preventDefault();
  pristine.validate();
};


const validatePriceField = () => {
  const validate = (value) => value <= MAX_PRICE && value >= minPrices[typeField.value];
  const priceFieldErrorMessage = () => (priceField.value > MAX_PRICE)
    ? `Стоимость ${objectNames[typeField.value]} не более ${MAX_PRICE} руб.`
    : `Стоимость ${objectNames[typeField.value]} не менее ${minPrices[typeField.value]}`;
  pristine.addValidator(priceField, validate, priceFieldErrorMessage);
};


const validateRoomNumberField = () => {
  const validate = (value) => maxCapacity[value].includes(+capacityField.value);
  const roomNumberErrorMessage = () => (+roomNumberField.value === NON_RESIDENTIAL_VALUE)
    ? 'Не для гостей' : 'Слишком много гостей';
  pristine.addValidator(roomNumberField, validate, roomNumberErrorMessage);
};


const validateCapacityField = () => {
  const validate = (value) => maxCapacity[roomNumberField.value].includes(+value);
  const capacityFieldErrorMessage = () => (+capacityField.value === NOT_FOR_GUESTS)
    ? 'Нельзя размещать гостей'
    : 'Слишком мало комнат';
  pristine.addValidator(capacityField, validate, capacityFieldErrorMessage);
};


const addValidateForm = () => {
  validatePriceField();
  validateRoomNumberField();
  validateCapacityField();

  roomNumberField.addEventListener('change', onPristineValidate);
  capacityField.addEventListener('change', onPristineValidate);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {addValidateForm};
