import {clearMarkerGroup} from './map.js';

const MAX_ITEMS_COUNT = 10;
const DEFAULT_SELECT_VALUE = 'any';

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

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('[name="housing-type"]');
const housingPrice = mapFilters.querySelector('[name="housing-price"]');
const housingRooms = mapFilters.querySelector('[name="housing-rooms"]');
const housingGuests = mapFilters.querySelector('[name="housing-guests"]');

const getHousingMinPrice = () => housingPriceOptions[housingPrice.value].min;
const getHousingMaxPrice = () => housingPriceOptions[housingPrice.value].max;

const housingTypeCondPassed = (item) => housingType.value === DEFAULT_SELECT_VALUE
  || item.offer.type === housingType.value;

const housingPriceCondPassed = (item) => housingPrice.value === DEFAULT_SELECT_VALUE
  || (item.offer.price >= getHousingMinPrice() && item.offer.price <= getHousingMaxPrice());

const housingRoomsCondPassed = (item) => housingRooms.value === DEFAULT_SELECT_VALUE
  || item.offer.rooms === +housingRooms.value;

const housingGuestsCondPassed = (item) => housingGuests.value === DEFAULT_SELECT_VALUE
  || item.offer.guests === +housingGuests.value;

const housingFeaturesCondPassed = (item) => {
  const housingFeatures = Array.from(mapFilters.querySelectorAll('[name="features"]:checked')).map((el) => el.value);

  if (item.offer.features) {
    return housingFeatures.every((el) => item.offer.features.includes(el));
  }

  return false;
};

const filterCondsPassed = (item) =>
  housingTypeCondPassed(item)
  && housingPriceCondPassed(item)
  && housingRoomsCondPassed(item)
  && housingGuestsCondPassed(item)
  && housingFeaturesCondPassed(item);

const applyFilter = (items) => {
  const filteredItems = [];

  for (let i = 0; i < items.length; i++) {
    if (filterCondsPassed(items[i])) {
      filteredItems.push(items[i]);
    }
    if (filteredItems.length >= MAX_ITEMS_COUNT) {
      break;
    }
  }

  return filteredItems;
};

const bindFormFilter = (cb) => {
  mapFilters.addEventListener('change', () => {
    clearMarkerGroup();
    cb();
  });
};

export {
  applyFilter,
  bindFormFilter
};
