const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = mapFilters.children;

const disableActiveState = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilters.classList.add('ad-form--disabled');
  for (const child of mapFiltersChildren) {
    child.disabled = true;
  }
};

const enableActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilters.classList.remove('ad-form--disabled');
  for (const child of mapFiltersChildren) {
    child.disabled = false;
  }
};

export {disableActiveState, enableActiveState};
