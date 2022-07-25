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

/**
 * Функция для устранения дребезга
 */
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  getDecOfNum,
  debounce,
};
