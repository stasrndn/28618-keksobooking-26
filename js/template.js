const getOfferType = (type) => {
  const offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель'
  };
  return offerTypes[type];
};

const createCard = (data) => {
  const cardTemplateContent = document.querySelector('#card').content;
  const cardTemplate = cardTemplateContent.cloneNode(true);

  const popup = cardTemplate.querySelector('.popup');
  const title = popup.querySelector('.popup__title');
  const address = popup.querySelector('.popup__text--address');
  const price = popup.querySelector('.popup__text--price');
  const type = popup.querySelector('.popup__type');
  const capacity = popup.querySelector('.popup__text--capacity');
  const time = popup.querySelector('.popup__text--time');
  const features = popup.querySelector('.popup__features');
  const description = popup.querySelector('.popup__description');
  const photos = popup.querySelector('.popup__photos');
  const avatar = popup.querySelector('.popup__avatar');

  const author = data.author;
  const offer = data.offer;

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = getOfferType(offer.type);
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (!offer.features.length) {
    features.remove();
  } else {
    const featuresList = popup.querySelectorAll('.popup__feature');
    const availableFeatures = offer.features.map((feature) => `popup__feature--${feature}`);
    featuresList.forEach((item) => {
      const isFeatureExist = Boolean([...item.classList].filter((x) => availableFeatures.includes(x)).length);
      if (!isFeatureExist) {
        item.remove();
      }
    });
  }

  if (!offer.description.length) {
    description.remove();
  } else {
    description.textContent = offer.description;
  }

  if (!offer.photos.length) {
    photos.remove();
  } else {
    const photosFragment = document.createDocumentFragment();
    const photoTemplate = photos.querySelector('.popup__photo');

    offer.photos.forEach((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      photosFragment.appendChild(photo);
    });

    photos.innerHTML = '';
    photos.appendChild(photosFragment);
  }

  avatar.src = author.avatar;

  return cardTemplate;
};

const render = (items) => {
  const map = document.querySelector('#map-canvas');
  const fragmentContainer = document.createDocumentFragment();

  items.forEach((item) => {
    const card = createCard(item);
    fragmentContainer.appendChild(card);
  });

  map.appendChild(fragmentContainer);
};

export {render};
