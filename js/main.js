import './card.js';
import {getData} from './api.js';
import {showMessage} from './popup-message.js';
import {applyCardsFilter} from './filter.js';
import {debounce} from './util.js';
import {enableAdForm, disableAdForm, addAdFormSubmitListener, adFormAddressField} from './ad-form.js';
import {enableFilterForm, disableFilterForm, addChangeEventFilterForm, resetFilterForm} from './filter-form.js';
import {
  addMapToCanvas,
  addMarkersToMap,
  addMainPinMarkerToMap,
  addMoveEventMainPinMarker,
  setMainPinMarkerCoorsToNode,
  clearMarkersOnMap,
  setMainPinMarkerDefaultCoords,
  setMapDefaultCoords,
} from './map.js';


disableAdForm();
disableFilterForm();

addMapToCanvas(() => {
  enableAdForm();
  enableFilterForm();
  addAdFormSubmitListener(() => {
    setMainPinMarkerDefaultCoords();
    setMapDefaultCoords();
    resetFilterForm();
    clearMarkersOnMap();
  });
});

getData((cards) => {
  addMarkersToMap(applyCardsFilter(cards));
  addMainPinMarkerToMap();
  addMoveEventMainPinMarker(() => setMainPinMarkerCoorsToNode(adFormAddressField));
  addChangeEventFilterForm(debounce(() => {
    clearMarkersOnMap();
    addMarkersToMap(applyCardsFilter(cards));
  }));
}, () => showMessage('error', 'Не удалось загрузить данные. Перезагрузите страницу'));
