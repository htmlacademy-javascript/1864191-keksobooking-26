function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


function getRandomPositiveFloat (a, b, digits = 1) {

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

const SIMILAR_ADS = 10;

function getAvatarNumber (min, max) {
  const avatarIndex = getRandomPositiveInteger (min, max);
  return (avatarIndex < 10) ? `0${avatarIndex}` : avatarIndex;
}

const latitude = getRandomPositiveFloat (35.65000, 35.70000, 5);

const longitude = getRandomPositiveFloat (139.70000, 139.80000, 5);

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const createAd = () => {
  const ad = {
    author: {
      avatar: `img/avatars/user${getAvatarNumber(1, 10)}.png`,
    },

    offer: {
      title: "Снять жилье неподалеку",
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger (1, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger (1, 20),
      guests: getRandomPositiveInteger (1, 20),
      checkin: getRandomArrayElement(CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKINS_CHECKOUTS),
      features: FEATURES.slice(0, getRandomPositiveInteger(1, 6)),
      description: "Лучшее соотношение цены и качества",
      photos: PHOTOS.slice(0, getRandomPositiveInteger(1, 3)),
    },

    location: {
      lat: latitude,
      lng: longitude,
    },
  };
  return ad;
};

const similarAds = Array.from({length: SIMILAR_ADS}, createAd);
