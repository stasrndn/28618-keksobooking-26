/**
 * Функция, возвращающая случайной целое число из заданного диапазона
 * @param a
 * @param b
 * @returns {number}
 */
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
 * Функция, возвращающая случайной дробное число из заданного диапазона
 * @param a - дробное число
 * @param b - дробное число
 * @param digits - требуемое количество знаков после точки
 * @returns {number}
 */
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

/**
 * Функция, возвращающая случайный элемент массива
 * @param array
 * @returns {*}
 */
const getRandomValueFromArray = (array) => {
  const index = getRandomPositiveInteger(0, array.length - 1);
  return array[index];
};

/**
 * Функция, возвращающая массив случайной длины из переданного массива
 * @param array
 * @returns {*}
 */
const getRandomLengthArray = (array) => array.slice(getRandomPositiveInteger(0, array.length));

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomValueFromArray,
  getRandomLengthArray
};
