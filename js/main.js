import {showError, debounce} from './util.js';
import {changeStateAdForm, changeStateMapFilterForm} from './form-state.js';
import {initUserForm} from './user-form.js';
import {createMap, renderOnMap} from './map.js';
import {getData} from './api.js';
import {applyFilter, bindFormFilter} from './filter.js';
import {uploadAvatarFile, uploadHousePhoto} from './image-uploader.js';

const RERENDER_DELAY = 500;

changeStateAdForm(false);
initUserForm();
createMap();

getData((items) => {
  renderOnMap(applyFilter(items));
  changeStateMapFilterForm(true);
  bindFormFilter(debounce(() => renderOnMap(applyFilter(items)), RERENDER_DELAY));
}, showError);

uploadAvatarFile();
uploadHousePhoto();
