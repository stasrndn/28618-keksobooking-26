import {makeAdvertisements} from './data.js';
import {render} from './template.js';

const SIMILAR_ADV_COUNT = 1;
const similarAdvertisements = makeAdvertisements(SIMILAR_ADV_COUNT);

render(similarAdvertisements);
