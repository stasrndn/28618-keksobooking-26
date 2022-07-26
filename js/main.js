import './card.js';
import {getData} from './api.js';
import {showMessage} from './popup-message.js';
import {applyCardsFilter} from './filter.js';
import {debounce} from './util.js';
import {setStateFilterForm, addChangeEventFilterForm, resetFilterForm} from './filter-form.js';
import {
  addAdFormSubmitListener,
  addAdFormResetListener,
  adFormAddressField,
  setStateAdForm
} from './ad-form.js';
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

const RERENDER_DELAY = 500;

setStateAdForm('disabled');
setStateFilterForm('disabled');

addMapToCanvas(() => {
  setStateAdForm();
  setStateFilterForm();
});

getData((cards) => {
  addMarkersToMap(applyCardsFilter(cards));
  addMainPinMarkerToMap();
  addMoveEventMainPinMarker(() => setMainPinMarkerCoorsToNode(adFormAddressField));
  addChangeEventFilterForm(debounce(() => {
    clearMarkersOnMap();
    addMarkersToMap(applyCardsFilter(cards));
  }, RERENDER_DELAY));
  addAdFormSubmitListener(() => {
    setMainPinMarkerDefaultCoords();
    setMapDefaultCoords();
    resetFilterForm(debounce(() => {
      clearMarkersOnMap();
      addMarkersToMap(applyCardsFilter(cards));
    }, RERENDER_DELAY));
    clearMarkersOnMap();
  });
  addAdFormResetListener(() => {
    setMainPinMarkerDefaultCoords();
    setMapDefaultCoords();
    resetFilterForm(debounce(() => {
      clearMarkersOnMap();
      addMarkersToMap(applyCardsFilter(cards));
    }, RERENDER_DELAY));
    clearMarkersOnMap();
  });
}, () => showMessage('error', 'Не удалось загрузить данные. Перезагрузите страницу'));
