import {isEscapeKey} from './util.js';

/**
 * Показать сообщение пользователю
 * @param type [success, error]
 */
const showMessage = (type, message) => {
  const templateNode = document.querySelector(`#${type}`).content;
  const messageNode = templateNode.cloneNode(true).querySelector(`.${type}`);
  const titleMessage = messageNode.querySelector(`.${type}__message`);
  let eventListeners = [];

  titleMessage.textContent = message;

  const clearEventListeners = () => {
    eventListeners.map((eventListener) => {
      document.removeEventListener(eventListener.type, eventListener.handler);
    });
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      messageNode.remove();
      clearEventListeners();
    }
  };

  const onDocumentClick = () => {
    messageNode.remove();
    clearEventListeners();
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  eventListeners = [
    {type: 'click', handler: onDocumentClick},
    {type: 'keydown', handler: onDocumentKeydown},
  ];

  document.body.append(messageNode);
};

export {
  showMessage
};
