import {uploadAvatarFile, uploadHousePhoto} from './image-uploader.js';
import {sendData} from './api.js';
import {showMessage} from './popup-message.js';

const MAX_PRICE = 100000;
const NO_UI_SLIDER_STEP = 10;
const NO_UI_SLIDER_DECIMAL_PLACES = 0;
const MAX_ROOM_OPTION_VALUE = 100;
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const HousingTypeMinPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const HousingTypeNames = {
  bungalow: 'бунгало',
  flat: 'квартиры',
  hotel: 'отеля',
  house: 'дома',
  palace: 'дворца'
};
const RatioRoomsSeats = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');
const adFormSubmitButton = adForm.querySelector('[type="submit"]');
const adFormPriceField = adForm.querySelector('[name="price"]');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const adFormTypeField = adForm.querySelector('[name="type"]');
const adFormTimeInField = adForm.querySelector('[name="timein"]');
const adFormTimeOutField = adForm.querySelector('[name="timeout"]');
const adFormAddressField = adForm.querySelector('[name="address"]');
const adFormRoomsField = adForm.querySelector('[name="rooms"]');
const adFormCapacityField = adForm.querySelector('[name="capacity"]');
const adFormAvatarField = adForm.querySelector('.ad-form-header__preview img');
const adFormPhotoField = adForm.querySelector('.ad-form__photo');

Pristine.addValidator('min', () => true);
Pristine.addValidator('max', () => true);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element'
});

/**
 * Включение активного состояния формы отправки объявления
 */
const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldset.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

/**
 * Включение неактивного состояния формы отправки объявления
 */
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldset.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

/**
 * Включение активного состояния кнопки отправки формы
 */
const enableAdFormSubmitButton = () => {
  adFormSubmitButton.disabled = false;
};

/**
 * Включение неактивного состояния кнопки отправки формы
 */
const disableAdFormSubmitButton = () => {
  adFormSubmitButton.disabled = true;
};

/**
 * Восстанавливает стандартные значения всем элементам формы
 */
const resetAdForm = () => {
  adForm.reset();
};

/**
 * Добавляет валидацию для поля "Цена за ночь"
 */
const validateAdFormPriceField = () => {
  const validate = (value) => value <= MAX_PRICE && value >= HousingTypeMinPrices[adFormTypeField.value];
  const errorMessage = () => (adFormPriceField.value > MAX_PRICE)
    ? `Стоимость ${HousingTypeNames[adFormTypeField.value]} не более ${MAX_PRICE} руб.`
    : `Стоимость ${HousingTypeNames[adFormTypeField.value]} не менее ${HousingTypeMinPrices[adFormTypeField.value]}`;
  pristine.addValidator(adFormPriceField, validate, errorMessage);
};

/**
 * Устанавливает плейсхолдер поля "Цена за ночь"
 * в зависимости от выбранного значения поля "Тип жилья"
 * @param value
 */
const setValueAdFormPriceField = (value) => {
  adFormPriceField.setAttribute('placeholder', value);
};

/**
 * Добавляет обработчик изменения значения на поле "Цена за ночь"
 */
const addChangeEventAdFormPriceField = () => {
  const onChangeAdFormPriceField = () => {
    adFormSlider.noUiSlider.set(adFormPriceField.value);
  };
  adFormPriceField.addEventListener('change', onChangeAdFormPriceField);
};

/**
 * Добавляет слайдер выбора цены к полю "Цена за ночь"
 */
const addSliderToAdFormPriceField = () => {
  noUiSlider.create(
    adFormSlider,
    {
      range: {
        min: Number(adFormPriceField.min),
        max: Number(adFormPriceField.max)
      },
      start: HousingTypeMinPrices[adFormTypeField.value],
      step: NO_UI_SLIDER_STEP,
      connect: 'lower',
      format: {
        to: (value) => parseFloat(value).toFixed(NO_UI_SLIDER_DECIMAL_PLACES),
        from: (value) => parseFloat(value).toFixed(NO_UI_SLIDER_DECIMAL_PLACES)
      }
    }
  );
};

/**
 * Добавляет обработчик на изменение ползунка слайдера
 */
const addUpdateEventAdFormSlider = () => {
  const onUpdateAdFormSlider = () => {
    adFormPriceField.value = adFormSlider.noUiSlider.get();
  };
  adFormSlider.noUiSlider.on('update', onUpdateAdFormSlider);
};

/**
 * Добавляет обработчик на изменение поля "Тип жилья"
 * для запуска валидации поля "Цена за ночь"
 */
const addChangeEventAdFormTypeField = () => {
  adFormTypeField.addEventListener('change', () => {
    setValueAdFormPriceField(HousingTypeMinPrices[adFormTypeField.value]);
    pristine.validate();
  });
};

/**
 * Добавляет обработчик на изменение поля "Время заезда"
 */
const addChangeEventAdFormTimeInField = () => {
  adFormTimeInField.addEventListener('change', () => {
    adFormTimeOutField.value = adFormTimeInField.value;
  });
};

/**
 * Добавляет обработчик на изменение поля "Время выезда"
 */
const addChangeEventAdFormTimeOutField = () => {
  adFormTimeOutField.addEventListener('change', () => {
    adFormTimeInField.value = adFormTimeOutField.value;
  });
};

/**
 * Добавляет валидацию для поля "Количество комнат"
 */
const validateAdFormRoomsField = () => {
  const validate = (value) => RatioRoomsSeats[value].includes(+adFormCapacityField.value);
  const errorMessage = () => (+adFormRoomsField.value === MAX_ROOM_OPTION_VALUE)
    ? 'Не для размещения гостей'
    : 'Нельзя поселить столько гостей';
  pristine.addValidator(adFormRoomsField, validate, errorMessage);
};

/**
 * Добавляет обработчик на изменение поля "Количество комнат"
 */
const addChangeEventAdFormRoomsField = () => {
  adFormRoomsField.addEventListener('change', pristine.validate);
};

/**
 * Добавляет валидацию для поля "Количество мест"
 */
const validateAdFormCapacityField = () => {
  const validate = (value) => RatioRoomsSeats[adFormRoomsField.value].includes(+value);
  const errorMessage = () => (+adFormRoomsField.value === MAX_ROOM_OPTION_VALUE)
    ? 'Нельзя размещать гостей'
    : 'Слишком мало комнат';
  pristine.addValidator(adFormCapacityField, validate, errorMessage);
};

/**
 * Добавляет обработчик на изменение поля "Количество мест"
 */
const addChangeEventAdFormCapacityField = () => {
  adFormCapacityField.addEventListener('change', pristine.validate);
};

/**
 * Добавляет обработчик сбрасывания формы добавления объявления
 */
const addAdFormResetListener = () => {
  const onResetAdForm = () => {
    adFormAvatarField.src = DEFAULT_AVATAR_URL;
    adFormPhotoField.innerHTML = '';
  };
  adForm.addEventListener('reset', onResetAdForm);
};

/**
 * Добавляет функционал загрузки аватара пользователя
 */
const addAvatarUploader = () => {
  uploadAvatarFile();
};

/**
 * Добавляет функционал загрузки фотографии жилья
 */
const addHousePhotoUploader = () => {
  uploadHousePhoto();
};

validateAdFormPriceField();
validateAdFormRoomsField();
validateAdFormCapacityField();
addChangeEventAdFormTypeField();
addSliderToAdFormPriceField();
setValueAdFormPriceField(HousingTypeMinPrices[adFormTypeField.value]);
addChangeEventAdFormTimeInField();
addChangeEventAdFormTimeOutField();
addChangeEventAdFormRoomsField();
addChangeEventAdFormCapacityField();
addChangeEventAdFormPriceField();
addUpdateEventAdFormSlider();
addAdFormResetListener();
addAvatarUploader();
addHousePhotoUploader();

/**
 * Добавляет слушатель и обработчик события отправки формы
 */
const addAdFormSubmitListener = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidated = pristine.validate();
    if (isValidated) {
      const formData = new FormData(evt.target);
      disableAdFormSubmitButton();
      sendData(
        () => {
          enableAdFormSubmitButton();
          showMessage('success', 'Данные успешно отправлены');
          resetAdForm();
        },
        () => {
          showMessage('error', 'Не удалось отправить форму. Попробуйте ещё раз');
        },
        formData
      );
      cb();
    }
  });
};

export {
  enableAdForm,
  disableAdForm,
  enableAdFormSubmitButton,
  disableAdFormSubmitButton,
  resetAdForm,
  addAdFormSubmitListener,
  adFormAddressField
};
