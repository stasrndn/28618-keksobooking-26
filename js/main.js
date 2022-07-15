import {makeAdvertisements} from './data.js';
import {render} from './template.js';
import {disableActiveState} from './form.js';
import {addValidateForm} from './user-form.js';

const SIMILAR_ADV_COUNT = 1;
const similarAdvertisements = makeAdvertisements(SIMILAR_ADV_COUNT);

render(similarAdvertisements);
disableActiveState();
addValidateForm();
