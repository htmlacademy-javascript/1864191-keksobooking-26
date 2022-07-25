import { adForm } from './form-activate.js';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, false);

// Заголовок объявления

const title = adForm.querySelector('#title');

const TitleLength = {
  min: 30,
  max: 100,
};

function validateTitle (value) {
  return value.length >= TitleLength.min && value.length <= TitleLength.max;
}

function getTitleErrorMessage () {
  return `от ${TitleLength.min} до ${TitleLength.max} символов`;
}

pristine.addValidator(title, validateTitle, getTitleErrorMessage);

// Цена за ночь

const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const PriceRange = {
  min: {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
    hotel: 3000,
  },
  max: {
    palace: 100000,
    flat: 100000,
    house: 100000,
    bungalow: 100000,
    hotel: 100000,
  }
};

type.addEventListener('change', () => {
  price.placeholder = PriceRange.min[type.value];
  price.min = PriceRange.min[type.value];
  price.value = '';
});

function validatePrice (value) {
  return value <= PriceRange.max[type.value] && value >= PriceRange.min[type.value];
}

function getPriceErrorMessage () {
  return (price.value > PriceRange.max[type.value]) ? `Стоимость не более ${PriceRange.max[type.value]}р` : `Стоимость не менее ${PriceRange.min[type.value]}р`;
}

pristine.addValidator(price,validatePrice, getPriceErrorMessage);

// Количество комнат и количество мест

const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const GuestsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateCapacity = () => GuestsCapacity[rooms.value].includes(capacity.value);

const getCapacityErrorMessage = () => {
  if (rooms.value === '100') {
    return 'Не для гостей';
  }

  return capacity.value === '0' ? 'Это жилье для гостей' : 'Мало комнат';
};

pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
