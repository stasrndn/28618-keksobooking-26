import {showError} from './util.js';
import {changeStateAdForm, changeStateMapFilterForm} from './form-state.js';
import {initUserForm} from './user-form.js';
import {createMap, renderOnMap} from './map.js';
import {getData, prepareData} from './api.js';

changeStateAdForm(false);
initUserForm();
createMap();

getData((items) => {
  const similarAdvertisements = prepareData(items);
  renderOnMap(similarAdvertisements);
  changeStateMapFilterForm(true);
}, showError);


