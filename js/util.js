/**
 * Проверка клавиши Esc на событии
 * @param evt
 * @returns {boolean}
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Склонение числительных
 */
const getDecOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export {
  isEscapeKey,
  getDecOfNum,
};
