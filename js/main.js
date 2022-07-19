import {makeAdvertisements} from './data.js';
import {disableActiveState} from './form.js';
import {addValidateForm} from './user-form.js';
import {createMap, renderOnMap} from './map.js';

const SIMILAR_ADV_COUNT = 3;
const similarAdvertisements = makeAdvertisements(SIMILAR_ADV_COUNT);


disableActiveState();
addValidateForm();

createMap();
renderOnMap(similarAdvertisements);
