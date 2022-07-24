const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

/**
 * Выполняет загрузку фотографии и устанавливает ее в узел
 */
const uploadAvatarFile = () => {
  const avatarChooser = document.querySelector('[name="avatar"]');
  const avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

/**
 * Выполняет загрузку фотографии, чистит родительский узел
 * и добавляет фотографию в родителя
 */
const uploadHousePhoto = () => {
  const housePhotoChooser = document.querySelector('[name="images"]');
  const adFormPhotoContainer = document.querySelector('.ad-form__photo');

  housePhotoChooser.addEventListener('change', () => {
    const file = housePhotoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const photo = document.createElement('img');
      photo.src = URL.createObjectURL(file);
      photo.style.width = '70px';
      photo.style.height = '70px';
      adFormPhotoContainer.innerHTML = '';
      adFormPhotoContainer.appendChild(photo);
    }
  });
};

export {
  uploadAvatarFile,
  uploadHousePhoto
};
