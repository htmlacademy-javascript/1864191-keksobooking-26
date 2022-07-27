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

const createCapacityMessage = (tag, rooms, guest) => {
  if (rooms === 1 && guest === 1) {
    tag.textContent = `${rooms} комната для ${guest} гостя`;
  } else if (rooms === 1 && guest === 2) {
    tag.textContent = `${rooms} комната для ${guest} гостей`;
  } else if (rooms >=2 && rooms <=4 && guest === 1) {
    tag.textContent = `${rooms} комнаты для ${guest} гостя`;
  } else if (rooms >=2 && rooms <=4  && guest >= 2) {
    tag.textContent = `${rooms} комнаты для ${guest} гостей`;
  } else if (rooms >=5  && guest === 1) {
    tag.textContent = `${rooms} комнат для ${guest} гостя`;
  } else if (rooms >=5  && guest >= 2) {
    tag.textContent = `${rooms} комнат для ${guest} гостей`;
  }
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
