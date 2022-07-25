// Дефолтное значение селектов
const DEFAULT_SELECT_VALUE = 'any';

// Минимальное и максимальное значения
// поля стоимости
const housingPriceOptions = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 49999
  },
  high: {
    min: 50000,
    max: 100000
  }
};

const filterForm = document.querySelector('.map__filters');
const filterFormChildren = filterForm.children;
const filterFormHousingType = filterForm.querySelector('[name="housing-type"]');
const filterFormHousingPrice = filterForm.querySelector('[name="housing-price"]');
const filterFormHousingRooms = filterForm.querySelector('[name="housing-rooms"]');
const filterFormHousingGuests = filterForm.querySelector('[name="housing-guests"]');

/**
 * Включение активного состояния формы фильтрации объявлений
 */
const enableFilterForm = () => {
  filterForm.classList.remove('ad-form--disabled');
  for (const child of filterFormChildren) {
    child.disabled = false;
  }
};

/**
 * Включение неактивного состояния формы фильтрации объявлений
 */
const disableFilterForm = () => {
  filterForm.classList.add('ad-form--disabled');
  for (const child of filterFormChildren) {
    child.disabled = true;
  }
};

/**
 * Восстанавливает стандартные значения всем элементам формы фильтрации
 */
const resetFilterForm = () => {
  filterForm.reset();
};

/**
 * Добавляет обработчик на изменение полей формы фильтрации
 */
const addChangeEventFilterForm = (cb) => {
  const onChangeFilterForm = () => {
    cb();
  };
  filterForm.addEventListener('change', onChangeFilterForm);
};

/**
 * Вернуть значение минимальной цены
 */
const getHousingMinPrice = () => housingPriceOptions[filterFormHousingPrice.value].min;

/**
 * Вернуть значение максимальной цены
 */
const getHousingMaxPrice = () => housingPriceOptions[filterFormHousingPrice.value].max;

/**
 * Проверка по типу жилья
 */
const isHousingTypeCondPassed = (item) => filterFormHousingType.value === DEFAULT_SELECT_VALUE
  || item.offer.type === filterFormHousingType.value;

/**
 * Проверка по стоимости объекта
 */
const isHousingPriceCondPassed = (item) => filterFormHousingPrice.value === DEFAULT_SELECT_VALUE
  || (item.offer.price >= getHousingMinPrice() && item.offer.price <= getHousingMaxPrice());

/**
 * Проверка на количество комнат
 */
const isHousingRoomsCondPassed = (item) => filterFormHousingRooms.value === DEFAULT_SELECT_VALUE
  || item.offer.rooms === +filterFormHousingRooms.value;

/**
 * Проверка по количеству гостей
 */
const isHousingGuestsCondPassed = (item) => filterFormHousingGuests.value === DEFAULT_SELECT_VALUE
  || item.offer.guests === +filterFormHousingGuests.value;

/**
 * Проверка по наличию удобств
 */
const isHousingFeaturesCondPassed = (item) => {
  const housingFeatures = Array.from(filterForm.querySelectorAll('[name="features"]:checked')).map((el) => el.value);

  if (item.offer.features) {
    return housingFeatures.every((el) => item.offer.features.includes(el));
  }

  return false;
};

/**
 * Все условия фильтра выполнены
 */
const isFilterPassed = (card) =>
  isHousingTypeCondPassed(card)
  && isHousingPriceCondPassed(card)
  && isHousingRoomsCondPassed(card)
  && isHousingGuestsCondPassed(card)
  && isHousingFeaturesCondPassed(card);

export {
  enableFilterForm,
  disableFilterForm,
  resetFilterForm,
  addChangeEventFilterForm,
  isFilterPassed,
};
