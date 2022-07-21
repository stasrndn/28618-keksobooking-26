const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = mapFilters.children;

const changeStateAdForm = (isActiveState) => {
  if (isActiveState) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.disabled = false;
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.disabled = true;
    });

    mapFilters.classList.add('ad-form--disabled');
    for (const child of mapFiltersChildren) {
      child.disabled = true;
    }
  }
};

const changeStateMapFilterForm = (isActiveState) => {
  if (isActiveState) {
    mapFilters.classList.remove('ad-form--disabled');
    for (const child of mapFiltersChildren) {
      child.disabled = false;
    }
  } else {
    mapFilters.classList.add('ad-form--disabled');
    for (const child of mapFiltersChildren) {
      child.disabled = true;
    }
  }
};

const resetMapFilterForm = () => {
  mapFilters.reset();
};

export {
  changeStateAdForm,
  changeStateMapFilterForm,
  resetMapFilterForm
};
