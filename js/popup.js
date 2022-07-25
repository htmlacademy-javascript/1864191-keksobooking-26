const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const typesTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderFeatures = (block, features) => {
  block.forEach((featureListItem) => {
    const isNecessary = features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const renderPhotos = (block, item, photos) => {
  photos.forEach((picture) => {
    const photoTemplate = item.cloneNode(true);
    photoTemplate.src = picture;
    block.appendChild(photoTemplate);
  });
};

const generatePopup = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = cardElement.querySelector('.popup__description');

  if (offer.features.length > 0) {
    renderFeatures(featuresList, offer.features);
  } else {
    featuresList.classList.add('hidden');
  }

  if (offer.photos) {
    renderPhotos(photosContainer, photoItem, offer.photos);
  } else {
    photosContainer.classList.add('hidden');
  }
  photoItem.remove();

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add('hidden');
  }

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesTranslation[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

export {generatePopup};
