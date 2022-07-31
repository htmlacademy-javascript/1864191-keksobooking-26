import {renderFeatures, renderPhotos, createCapacityMessage} from './util.js';

const typesTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate  = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createCard = ({author, offer}) => {
  const card = cardTemplate.cloneNode(true);
  const featuresContainer = card.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = card.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = card.querySelector('.popup__description');
  const capacity = card.querySelector('.popup__text--capacity');

  if (offer.features) {
    renderFeatures(featuresList, offer.features);
  } else {
    featuresContainer.classList.add('hidden');
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

  capacity.textContent = createCapacityMessage(offer.rooms, offer.guests);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = typesTranslation[offer.type];
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return card;
};

export {createCard};
