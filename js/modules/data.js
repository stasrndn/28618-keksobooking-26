import {
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  getRandomValueFromArray,
  getRandomLengthArray
} from './util.js';

const PRICE = {
  MIN: 100000,
  MAX: 10000000
};

const ROOMS = {
  MIN: 1,
  MAX: 8
};

const GUEST = {
  MIN: 2,
  MAX: 14
};

const DIGITS = 5;

const LOCATION = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000
  }
};

const TIME_VALUES = [
  '12:00',
  '13:00',
  '14:00'
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

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
 * Функция, возвращающая новый объект объявления
 * @param index
 * @returns {{offer: {features: *, rooms: number, address: string, checkin: *, price: number, guests: number, description: *, title: string, type: *, checkout: *, photos: *}, author: {avatar: string}, location: {lng: number, lat: number}}}
 */
const createAdvertisement = (index) => {
  const locationLat = getRandomPositiveFloat(LOCATION.LAT.MIN, LOCATION.LAT.MAX, DIGITS);
  const locationLng = getRandomPositiveFloat(LOCATION.LNG.MIN, LOCATION.LNG.MAX, DIGITS);

  return {
    author: {
      avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`
    },
    offer: {
      title: OFFER_TITLES[index],
      address: `${locationLat}, ${locationLng}`,
      price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
      type: getRandomValueFromArray(OFFER_TYPES),
      rooms: getRandomPositiveInteger(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomPositiveInteger(GUEST.MIN, GUEST.MAX),
      checkin: getRandomValueFromArray(TIME_VALUES),
      checkout: getRandomValueFromArray(TIME_VALUES),
      features: getRandomLengthArray(OFFER_FEATURES),
      description: getRandomValueFromArray(OFFER_DESCRIPTIONS),
      photos: getRandomLengthArray(OFFER_PHOTOS)
    },
    location: {
      lat: locationLat,
      lng: locationLng
    }
  };
};

/**
 * Функция, создающая список объявлений
 * @param count
 * @returns {{offer: {features: *, rooms: number, address: string, checkin: *, price: number, guests: number, description: *, title: string, type: *, checkout: *, photos: *}, author: {avatar: string}}[]}
 */
const makeAdvertisements = (count) => Array.from(
  {length: count}, (_, index) => createAdvertisement(index)
);

export {makeAdvertisements};
