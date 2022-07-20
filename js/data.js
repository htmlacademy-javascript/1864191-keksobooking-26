import {getRandomArrayElement, getRandomList, getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PRICE = {
  min: 0,
  max: 100000,
};

const ROOMS = {
  min: 1,
  max: 20,
};

const GUESTS = {
  min: 1,
  max: 20,
};

const LATITUDE = {
  min: 35.65000,
  max: 35.70000,
};

const LONGITUDE = {
  min: 139.70000,
  max: 139.80000,
};

const SIMILAR_ADS = 10;

const getAvatarNumber = (min, max) => {
  const avatarIndex = getRandomPositiveInteger (min, max);
  return (avatarIndex < 10) ? `0${avatarIndex}` : avatarIndex;
}

const createAd = () => {
  const location = {
    lat: getRandomPositiveFloat (LATITUDE.min, LATITUDE.max),
    lng: getRandomPositiveFloat (LONGITUDE.min, LONGITUDE.max),
  };

  return {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(1, 10)}.png`,
    },

    offer: {
      title: 'Снять жилье неподалеку',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger (PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger (ROOMS.min, ROOMS.max),
      guests: getRandomPositiveInteger (GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKINS_CHECKOUTS),
      features: getRandomList(FEATURES),
      description: 'Лучшее соотношение цены и качества',
      photos: getRandomList(PHOTOS),
    },

    location
  };
};

const similarAds = () => Array.from({length: SIMILAR_ADS}, createAd);

export {similarAds};
