const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

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

const createCapacityMessage = (rooms, guest) => {

  const capacity_rooms = {
    '1': '1 комната',
    '2': '2 комнаты',
    '3': '3 комнаты',
    '0': '0 комнат'
  }

  const capacity_guests = {
    '1': 'для 1 гостя',
    '2': 'для 2 гостей',
    '3': 'для 3 гостей',
    '0': 'не для гостей'
  }

  let roomsText = capacity_rooms[rooms];
  let guests = capacity_guests[guest];

  return `${roomsText} ${guests}`;
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  showAlert,
  isEscapeKey,
  renderFeatures,
  renderPhotos,
  createCapacityMessage,
  debounce
};
