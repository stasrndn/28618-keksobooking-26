import {makeAdvertisements} from './data.js';

const renderAdvertisements = (count) => {
  const mapCanvas = document.querySelector('#map-canvas');
  const similarAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarAdvertFragment = document.createDocumentFragment();

  const similarAdvertisements = makeAdvertisements(count);

  const offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель'
  };

  similarAdvertisements.forEach(({author, offer}) => {
    const similarAdvertElement = similarAdvertTemplate.cloneNode(true);
    const featuresContainer = similarAdvertElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    const photosContainer = similarAdvertElement.querySelector('.popup__photos');

    similarAdvertElement.querySelector('.popup__title').textContent = offer.title;
    similarAdvertElement.querySelector('.popup__text--address').textContent = offer.address;
    similarAdvertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    similarAdvertElement.querySelector('.popup__type').textContent = offerTypes[offer.type];
    similarAdvertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    similarAdvertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    featuresList.forEach((featureItem) => {
      const modifier = featureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureItem.remove();
      }
    });

    if (offer.description.length) {
      similarAdvertElement.querySelector('.popup__description').textContent = offer.description;
    } else {
      similarAdvertElement.querySelector('.popup__description').classList.add('hidden');
    }

    if (offer.photos.length) {
      const photoItemTemplate = photosContainer.querySelector('.popup__photo');
      const photoItemFragment = document.createDocumentFragment();

      offer.photos.forEach((src) => {
        const photoItem = photoItemTemplate.cloneNode(true);
        photoItem.src = src;
        photoItemFragment.appendChild(photoItem);
      });

      photosContainer.innerHTML = '';
      photosContainer.appendChild(photoItemFragment);

    } else {
      photosContainer.classList.add('hidden');
    }

    similarAdvertElement.querySelector('.popup__avatar').src = author.avatar;

    similarAdvertFragment.appendChild(similarAdvertElement);
  });

  mapCanvas.appendChild(similarAdvertFragment);
};

export {renderAdvertisements};
