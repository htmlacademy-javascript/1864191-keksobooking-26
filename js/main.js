function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//Module 4 Task 1

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

function getAvatarNumber (min, max) {
  const avatarIndex = getRandomPositiveInteger (min, max);
  return (avatarIndex < 10) ? `0${avatarIndex}` : avatarIndex;
}

const latitude = getRandomPositiveFloat (LATITUDE.min, LATITUDE.max);

const longitude = getRandomPositiveFloat (LONGITUDE.min, LONGITUDE.max);

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const getRandomList = (array) =>  {
  const result = [];
  const times = getRandomPositiveInteger(1, array.length - 1);

  for (let i = 0; i < times; i++) {
    result.push(array[getRandomPositiveInteger(0, array.length - 1)]);
  }
  return [...new Set(result)];
};

const createAd = () => {
  const ad = {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(1, 10)}.png`,
    },

    offer: {
      title: 'Снять жилье неподалеку',
      address: `${latitude}, ${longitude}`,
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

    location: {
      lat: latitude,
      lng: longitude,
    },
  };
  return ad;
};

const similarAds = Array.from({length: SIMILAR_ADS}, createAd);
similarAds;
