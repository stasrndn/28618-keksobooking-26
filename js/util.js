const SUCCESS_MESSAGE_TIME_DISPLAY = 3000;
const POPUP_BUTTON_TEXT = 'Закрыть окно';

const body = document.querySelector('body');
const successPopupTemplate = document.querySelector('#success').content;
const errorPopupTemplate = document.querySelector('#error').content;

let popupContainer = null;
let popupMessage = null;
let popupButton = null;

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isClick = (evt) => evt.type === 'click';

const onDocumentPopup = (evt) => {
  if (isEscapeKey(evt)) {
    unBindDocumentEvents();
    hidePopup();
  } else if (isClick(evt)) {
    unBindDocumentEvents();
    hidePopup();
  }
};

function bindDocumentEvents () {
  document.addEventListener('click', onDocumentPopup);
  document.addEventListener('keydown', onDocumentPopup);
}

function unBindDocumentEvents() {
  document.removeEventListener('click', onDocumentPopup);
  document.removeEventListener('keydown', onDocumentPopup);
}

function showPopup (element) {
  body.appendChild(element);
  bindDocumentEvents();
}

function hidePopup () {
  body.removeChild(popupContainer);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const showSuccess = () => {
  popupContainer = successPopupTemplate.cloneNode(true).querySelector('.success');
  setTimeout(() => {
    hidePopup();
  }, SUCCESS_MESSAGE_TIME_DISPLAY);

  showPopup(popupContainer);
};

const showError = (message) => {
  popupContainer = errorPopupTemplate.cloneNode(true).querySelector('.error');
  popupMessage = popupContainer.querySelector('.error__message');
  popupButton = popupContainer.querySelector('.error__button');

  popupMessage.textContent = message;
  popupButton.textContent = POPUP_BUTTON_TEXT;

  showPopup(popupContainer);
};

export {
  showError,
  showSuccess,
  debounce,
  throttle
};
