import {getAdCard} from './card.js';

// Значение зума по умолчанию
const ZOOM_DEFAULT = 10;

// 5 знаков после запятой в десятичных числах
const DECIMAL_PLACES = 5;

// Координаты по умолчанию
const CoordsDefault = {
  LAT: 35.68949,
  LNG: 139.69171
};

// Объект карты
const map = L.map('map-canvas');

// Настройки иконки большой метки на карте
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

// Настройки большой метки на карте
const mainPinMarker = L.marker(
  {
    lng: CoordsDefault.LNG,
    lat: CoordsDefault.LAT
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
);

// Координаты большой метки после
// её перемещения по карте
let mainPinMarkerCoords = {
  lat: CoordsDefault.LAT,
  lng: CoordsDefault.LNG
};

// Настройки иконки меток объектов на карте
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// Настройки картографии
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Слой для меток на карте
const markersGroup = L.layerGroup();

/**
 * Загрузить карту, вызвать колбек
 * и установить координаты карты по умолчанию
 * @param cb
 */
const addMapToCanvas = (cb) => {
  const getDefaultCoords = () => ({lat: CoordsDefault.LAT, lng: CoordsDefault.LNG});
  map
    .on('load', () => {
      cb();
    })
    .setView(getDefaultCoords(), ZOOM_DEFAULT);
};

/**
 * Добавить координаты большой метки
 * в узел с типом текст
 * @param node
 */
const setMainPinMarkerCoorsToNode = (node) => {
  if (node.type === 'text') {
    node.value = `${mainPinMarkerCoords.lat}, ${mainPinMarkerCoords.lng}`;
  }
};

/**
 * Добавить событие перемещения большой
 * метки по карте
 */
const addMoveEventMainPinMarker = (cb) => {
  mainPinMarker.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();
    mainPinMarkerCoords = {
      lat: coords.lat.toFixed(DECIMAL_PLACES),
      lng: coords.lng.toFixed(DECIMAL_PLACES)
    };
    cb();
  });
};

/**
 * Добавить большую метку на карту
 */
const addMainPinMarkerToMap = () => {
  mainPinMarker.addTo(map);
};

/**
 * Присвоить большой метке координаты по умолчанию
 */
const setMainPinMarkerDefaultCoords = () => {
  mainPinMarker.setLatLng(
    {
      lng: CoordsDefault.LNG,
      lat: CoordsDefault.LAT
    }
  );
};

/**
 * Установить карте координаты по умолчанию
 */
const setMapDefaultCoords = () => {
  map.setView(
    {
      lat: CoordsDefault.LAT,
      lng: CoordsDefault.LNG
    }
  );
};

/**
 * Добавить метки на карту
 */
const addMarkersToMap = (cards) => {
  cards.forEach((card) => {
    const cardBalloon = getAdCard(card.author, card.offer);
    const marker = L.marker(
      {
        lat: card.location.lat,
        lng: card.location.lng
      },
      {
        icon: pinIcon
      }
    );
    marker
      .addTo(markersGroup)
      .bindPopup(cardBalloon);
  });
  markersGroup.addTo(map);
};

/**
 * Убрать метки с карты
 */
const clearMarkersOnMap = () => {
  markersGroup.clearLayers();
};

export {
  addMapToCanvas,
  addMarkersToMap,
  addMainPinMarkerToMap,
  clearMarkersOnMap,
  addMoveEventMainPinMarker,
  setMainPinMarkerCoorsToNode,
  setMainPinMarkerDefaultCoords,
  setMapDefaultCoords,
};
