import {getDecOfNum} from './util.js';

// Типы объектов на карточках
const cardTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

/**
 * Собирает карточку из верстки и данных
 * и возвращает её
 */
const getAdCard = (author, offer) => {
  const cardTemplateContent = document.querySelector('#card').content;
  const cardTemplate = cardTemplateContent.cloneNode(true);
  const card = cardTemplate.querySelector('.popup');
  const title = card.querySelector('.popup__title');
  const address = card.querySelector('.popup__text--address');
  const price = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const capacity = card.querySelector('.popup__text--capacity');
  const time = card.querySelector('.popup__text--time');
  const features = card.querySelector('.popup__features');
  const description = card.querySelector('.popup__description');
  const photos = card.querySelector('.popup__photos');
  const avatar = card.querySelector('.popup__avatar');

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = cardTypes[offer.type];
  capacity.textContent = `${offer.rooms} ${getDecOfNum(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getDecOfNum(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features && offer.features.length) {
    const featuresList = card.querySelectorAll('.popup__feature');
    const availableFeatures = offer.features.map((feature) => `popup__feature--${feature}`);
    featuresList.forEach((item) => {
      const isFeatureExist = Boolean([...item.classList].filter((x) => availableFeatures.includes(x)).length);
      if (!isFeatureExist) {
        item.remove();
      }
    });
  } else {
    features.remove();
  }

  if (!offer.description) {
    description.remove();
  } else {
    description.textContent = offer.description;
  }

  if (offer.photos && offer.photos.length) {
    const photosFragment = document.createDocumentFragment();
    const photoTemplate = photos.querySelector('.popup__photo');
    offer.photos.forEach((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      photosFragment.appendChild(photo);
    });
    photos.innerHTML = '';
    photos.appendChild(photosFragment);
  } else {
    photos.remove();
  }

  avatar.src = author.avatar;

  return card;
};

export {
  getAdCard,
};
