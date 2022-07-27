const FILE_EXT = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const avatarDefault = previewAvatar.src;
const filePhotoHousing = document.querySelector('.ad-form__input');
const previewPhotoHousing = document.querySelector('.ad-form__photo');

const PhotoSize = {
  width: '70px',
  height: '70px',
};

const uploadFileAvatar = () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_EXT.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
};

const uploadFileHousing = () => {
  const file = filePhotoHousing.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_EXT.some((it) => fileName.endsWith(it));

  if (matches) {
    const photo = document.createElement('img');
    photo.style.width = PhotoSize.width;
    photo.style.height = PhotoSize.height;
    photo.src = URL.createObjectURL(file);
    previewPhotoHousing.appendChild(photo);
  }
};

const uploadAllPhotos = () => {
  fileAvatar.addEventListener('change', uploadFileAvatar);
  filePhotoHousing.addEventListener('change', uploadFileHousing);
};

const resetAllPhotos = () => {
  previewAvatar.src = avatarDefault;
  previewPhotoHousing.innerHTML = '';
};

export {uploadAllPhotos, resetAllPhotos};
