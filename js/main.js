import {SETTINGS} from './config/settings.js';
import {makeAdvertisements} from './modules/data.js';

// eslint-disable-next-line no-unused-vars
const similarAdvertisements = makeAdvertisements(SETTINGS.SIMILAR_ADV_COUNT);
