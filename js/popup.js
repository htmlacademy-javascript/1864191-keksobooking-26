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
  const cardElement = cardTemplate.cloneNode(true);
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = cardElement.querySelector('.popup__description');
  const capacity = cardElement.querySelector('.popup__text--capacity');

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

  createCapacityMessage(capacity, offer.rooms, offer.guests);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = typesTranslation[offer.type];
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return cardElement;
};

export {createCard};
