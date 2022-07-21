const URL_GET_DATA = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://26.javascript.pages.academy/keksobooking';
const ITEMS_PER_PORTION = 10;

const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => response.json())
    .then((items) => {
      onSuccess(items);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные. Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, formData) => {
  fetch(
    URL_SEND_DATA,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

const prepareData = (items) => items.slice(0, ITEMS_PER_PORTION);

export {
  getData,
  sendData,
  prepareData
};
