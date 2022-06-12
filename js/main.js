/**
 * Функция, возвращающая случайной целое число из заданного диапазона
 * @param a - целое число
 * @param b - целое число
 * @returns {number}
 */
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.min(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/**
 * Функция, возвращающая случайной дробное число из заданного диапазона
 * @param a - дробное число
 * @param b - дробное число
 * @param digits - требуемое количество знаков после точки
 * @returns {number}
 */
function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}
