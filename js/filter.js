import {isFilterPassed} from './filter-form.js';

const MAX_CARDS = 10;

/**
 * Фильтрация карточек объявлений
 */
const applyCardsFilter = (cards) => {
  const filteredCards = [];

  for (const card of cards) {
    if (isFilterPassed(card)) {
      filteredCards.push(card);
    }
    if (filteredCards.length >= MAX_CARDS) {
      break;
    }
  }
  return filteredCards;
};

export {
  applyCardsFilter,
};
