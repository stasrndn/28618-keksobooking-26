const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('[name="price"]');
const typeField = adForm.querySelector('[name="type"]');
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const timeinField = adForm.querySelector('[name="timein"]');
const timeoutField = adForm.querySelector('[name="timeout"]');
const adFormSlider = adForm.querySelector('.ad-form__slider');

const MAX_PRICE = 100000;
const NON_RESIDENTIAL_VALUE = 100;
const NOT_FOR_GUESTS = 100;
const SLIDER_STEP = 10;

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


const onTypeFieldSelectChange = (evt) => {
  evt.preventDefault();
  priceField.setAttribute('placeholder', minPrices[evt.target.value]);
};


const onTimeFieldsSynchronize = (evt) => {
  evt.preventDefault();
  if (evt.target.getAttribute('name') === 'timein') {
    timeoutField.value = evt.target.value;
  } else {
    timeinField.value = evt.target.value;
  }
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


const createPriceSlider = () => {
  noUiSlider.create(adFormSlider, {
    range: {
      min: Number(priceField.min),
      max: Number(priceField.max)
    },
    start: Number(priceField.min),
    step: SLIDER_STEP,
    connect: 'lower',
    format: {
      to: (value) => parseFloat(value).toFixed(0),
      from: (value) => parseFloat(value).toFixed(0)
    }
  });

  adFormSlider.noUiSlider.on('update', () => {
    priceField.value = adFormSlider.noUiSlider.get();
  });

  priceField.addEventListener('change', (evt) => {
    evt.preventDefault();
    adFormSlider.noUiSlider.set(evt.target.value);
  });
};


const addValidateForm = () => {
  priceField.setAttribute('placeholder', minPrices[typeField.value]);

  validatePriceField();
  validateRoomNumberField();
  validateCapacityField();
  createPriceSlider();

  roomNumberField.addEventListener('change', onPristineValidate);
  capacityField.addEventListener('change', onPristineValidate);
  typeField.addEventListener('change', onTypeFieldSelectChange);
  timeinField.addEventListener('change', onTimeFieldsSynchronize);
  timeoutField.addEventListener('change', onTimeFieldsSynchronize);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {addValidateForm};
