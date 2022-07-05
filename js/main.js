/* eslint-disable no-unused-vars */
const SIMILAR_ADV_COUNT = 10;

const PRICE_MIN = 100000;
const PRICE_MAX = 10000000;

const ROOMS_MIN = 1;
const ROOMS_MAX = 8;

const GUEST_MIN = 2;
const GUEST_MAX = 14;

const LOCATION = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
  DIGITS: 5,
};

const TIME_VALUES = ['12:00', '13:00', '14:00'];

const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const OFFER_TITLES = [
  'Вестминстерский роппонги',
  'Кита',
  'Парк Особняк Чидоригафучи',
  'бриллия маре ариаке',
  'Усадьба Ногидзака',
  'Гордый Акасака Хикава Чо',
  'веллит дайканьяма саругакучо 2 F',
  'Гранд Архи Охори 1 Чо Ме Резиденция (3 А)',
  'Лесная башня Мотоазабу Хиллз',
  'Городская башня Таканава',
];
const OFFER_DESCRIPTIONS = [
  'Этот отель расположен в одном из лучших мест Токио. Он окружен Роппонги-Хиллз, отелем Grand Hyatt, множеством ресторанов, магазинов, международных школ и многого другого.',
  'Люкс из частных резиденций роскошных домов Kengo KumaThirteen, спроектированных известным японским архитектором Кенго Кума, расположенным в самом центре Токио.',
  'Обзор недвижимостиПраво: FreeholdАдрес: 2-1-16, Кудамминами, Тиёда-ку, Токио. Доступ: пешком 8 минут от станции «Куданшита». (Линия Хандзомон Токийского метрополитена, линия Токийского метро Тодзай).',
  'Справа: Свободный доступ: 5 мин. пешком от «Ariake Tennis no Mori» (линия Yurikamome), 8 минут ходьбы от «Кокусай Тэндзи-Дзё» (линия Ринкай)',
  'Обзор недвижимостиПраво: Срочный срок аренды земли Срок аренды: 2038/05/24 Доступ: пешком 3 минуты от станции «Ногидзака».',
  'Обзор недвижимости Право: FreeholdАдрес: 6-19-35, Акасака, Минато-ку, Токио. Доступ: пешком 6 минут от станции «Роппонги».',
  'Адрес обзора недвижимости: Саругаку-чо, Сибуя-ку, Токио Справа: свободный доступ: пешком 5 минут от станции «Дайканьяма».',
  'Обзор недвижимости Справа: FreeHold Адрес: Охори, Чуо-ку, Фукуока, Фукуока, Япония. Доступ: Прогулка в 9 минутах от станции «Роппоннмацу».',
  'Мотоазабу в Минато-ку — это район с давней историей как очень восхищенный жилой район. Motoazabu Hill — это крупномасштабный жилой проект в районе, разработанный компанией Mori Building.',
  'Обзор недвижимости Справа: Freehold Адрес: 1-23-23, Таканава, Минато-ку, Токио, 108-0074, Япония Доступ: прогулка 6 минут от улицы «Сироканэ Таканава». ',
];

/**
 * Функция, возвращающая случайной целое число из заданного диапазона
 * @param a - целое число
 * @param b - целое число
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
 * Функция, возвращающая массив случайной длины из переданного массива
 * @param array - массив
 * @returns {*}
 */
const getRandomLengthArray = (array) => array.slice(getRandomPositiveInteger(0, array.length));

/**
 * Функция, возвращающая случайный элемент массива.
 * Если второй аргумент true, то найденный элемент будет возвращен,
 * а также удален из массива
 * @param array - массив, откуда выбирается элемент
 * @param remove - флаг удаления выбираемого элемента из переданного массива
 * @returns {*|null|T}
 */
const getRandomElementFromArray = (array, remove = false) => {
  if (!array.length) {
    return null;
  }
  if (array.length === 1) {
    return array.pop();
  }

  const index = getRandomPositiveInteger(0, array.length - 1);
  const result = array[index];

  if (remove) {
    array.splice(index, 1);
  }

  return result;
};

/**
 * Функция, возвращающая URL-адрес аватара
 * @param k
 * @param v
 * @returns {`img/avatars/user${string}.png`}
 */
const avatarUrlCallback = (k, v) => `img/avatars/user${String(v + 1).padStart(2, '0')}.png`;

const AVATAR_URLS = Array.from({length: SIMILAR_ADV_COUNT}, avatarUrlCallback);

/**
 * Функция, возвращающая новый объект объявления
 * @returns {{offer: {features: *, rooms: number, address: string, checkin: (*|T|null), price: number,
 * guests: number, description: (*|T|null), title: (*|T|null), type: (*|T|null), checkout: (*|T|null), photos: *},
 * author: {avatar: (*|T|null)}, location: {lng: number, lat: number}}}
 */
const createAdvertisement = () => {
  const locationLat = getRandomPositiveFloat(LOCATION.LAT.MIN, LOCATION.LAT.MAX, LOCATION.DIGITS);
  const locationLng = getRandomPositiveFloat(LOCATION.LNG.MIN, LOCATION.LNG.MAX, LOCATION.DIGITS);

  return {
    'author': {
      'avatar': getRandomElementFromArray(AVATAR_URLS, true)
    },
    'offer': {
      'title': getRandomElementFromArray(OFFER_TITLES, true),
      'address': `${locationLat}, ${locationLng}`,
      'price': getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
      'type': getRandomElementFromArray(OFFER_TYPE),
      'rooms': getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomPositiveInteger(GUEST_MIN, GUEST_MAX),
      'checkin': getRandomElementFromArray(TIME_VALUES),
      'checkout': getRandomElementFromArray(TIME_VALUES),
      'features': getRandomLengthArray(OFFER_FEATURES),
      'description': getRandomElementFromArray(OFFER_DESCRIPTIONS, true),
      'photos': getRandomLengthArray(OFFER_PHOTOS)
    },
    'location': {
      'lat': locationLat,
      'lng': locationLng
    }
  };
};

const similarAdvertisements = Array.from({length: SIMILAR_ADV_COUNT}, createAdvertisement);
