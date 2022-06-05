function getRandomInt(min, max) {
  if (max <= min) {
    return 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomDecimal(min, max, decimalPlaces) {
  if (max <= min) {
    return 0;
  }
  return +(Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

getRandomInt(1, 10);
getRandomDecimal(1.5, 5.78, 2);
