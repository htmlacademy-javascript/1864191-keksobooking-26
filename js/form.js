import {sendData} from './api.js';
import {resetMap, resetMarkers} from './map.js';
import {resetFilters} from './filters.js';
import {showSubmitSuccessMessage, showSubmitErrorMessage} from './form-alerts.js';
import {resetAllPhotos} from './avatar.js';

const TYPES_MAX_PRICE = 100000;
const MAX_ROOMS_VALUE = 100;
const NO_GUESTS_VALUE = 0;

const adForm = document.querySelector('.ad-form');
const adFormContainer = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersContainer = mapFilters.children;
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const price = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');
const type = adForm.querySelector('#type');
const timeFieldset = adForm.querySelector('.ad-form__element--time');
const times = timeFieldset.querySelectorAll('select');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const TypesMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, false);

const guestsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const validateCapacity = () => guestsCapacity[rooms.value].includes(capacity.value);

const capacityErrorMessage = () => {
  if (rooms.value === MAX_ROOMS_VALUE) {
    return 'Не для гостей';
  }

  return capacity.value === NO_GUESTS_VALUE ? 'Это жилье для гостей' : 'Мало комнат';
};

const validatePrice = (value) => value <= TYPES_MAX_PRICE && value >= TypesMinPrice[type.value];

const priceErrorMessage = () => `Минимальная цена: ${TypesMinPrice[type.value]}, максимальная цена: ${TYPES_MAX_PRICE}`;

const onTypeChange = () => {
  price.placeholder = TypesMinPrice[type.value];
  pristine.validate(price);
};

const onTimeChange = (evt) => {
  for (const time of times) {
    if (time !== evt.target) {
      time.value = evt.target.value;
    }
  }
};

const onRoomsChange = () => {
  pristine.validate(capacity);
};

const onPriceChange = () => {
  pristine.validate(price);
};

const resetForm = () => {
  adForm.reset();
  resetMap();

  price.placeholder = TypesMinPrice[type.value];
  priceSlider.noUiSlider.set(TypesMinPrice[type.value]);
};

const onFormReset = () => {
  resetForm();
  resetFilters();
  resetMarkers();
  resetAllPhotos();
  pristine.reset();
};

const toggleSubmitButtonState = (boolean) => {
  submitButton.disabled = boolean;
};

const onSuccessSendForm = () => {
  toggleSubmitButtonState(false);

  onFormReset();
  showSubmitSuccessMessage();
};

const onFailSendForm = () => {
  toggleSubmitButtonState(false);

  showSubmitErrorMessage();
};

const initPriceSlider = () => {
  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: TYPES_MAX_PRICE,
    },
    start: TypesMinPrice.flat,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  priceSlider.noUiSlider.on('update', () => {
    price.value = priceSlider.noUiSlider.get();
  });

  priceSlider.noUiSlider.on('change', onPriceChange);
};

const toggleElement = (elementsList, value) => {
  for (const element of elementsList) {
    element.disabled = value;
  }
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  toggleElement(adFormContainer, true);
  toggleElement(mapFiltersContainer, true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');

  toggleElement(adFormContainer, false);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');

  toggleElement(mapFiltersContainer, false);
};

const initValidation = () => {
  pristine.addValidator(capacity, validateCapacity, capacityErrorMessage);
  pristine.addValidator(price, validatePrice, priceErrorMessage);

  type.addEventListener('change', onTypeChange);
  timeFieldset.addEventListener('change', onTimeChange);
  capacity.addEventListener('change', onRoomsChange);
  rooms.addEventListener('change', onRoomsChange);
  price.addEventListener('change', onPriceChange);
  resetButton.addEventListener('click', onFormReset);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitButtonState(true);

      sendData(
        onSuccessSendForm,
        onFailSendForm,
        new FormData(evt.target)
      );
    }
  });
};

export {
  disableForm,
  activateForm,
  activateFilters,
  initValidation,
  initPriceSlider
};
