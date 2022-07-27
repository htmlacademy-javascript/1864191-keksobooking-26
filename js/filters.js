import {debounce} from './util.js';

const filtersContainer = document.querySelector('.map__filters');

const DEFAULT_VALUE = 'any';

const priceForFilter = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

let typeFilter;
let priceFilter;
let roomsFilter;
let guestsFilter;
let featuresFilter;

const filterByType = ({offer}) => typeFilter.value === DEFAULT_VALUE
  || offer.type === typeFilter.value;

const filterByPrice = ({offer}) => priceFilter.value === DEFAULT_VALUE
  || (offer.price >= priceForFilter[priceFilter.value].min && offer.price <= priceForFilter[priceFilter.value].max);

const filterByRooms = ({offer}) => roomsFilter.value === DEFAULT_VALUE
  || offer.rooms.toString() === roomsFilter.value;

const filterByGuests = ({offer}) => guestsFilter.value === DEFAULT_VALUE
  || offer.guests.toString() === guestsFilter.value;

const filterByFeatures = ({offer}) => {
  const checkedFilters = featuresFilter.querySelectorAll('input:checked');
  if (!checkedFilters) {
    return true;
  }
  if (offer.features){
    return Array.from(checkedFilters).every((feature) => offer.features.includes(feature.value));
  }
  return false;
};

const filterOffers = (element) =>
  filterByType(element)
  && filterByPrice(element)
  && filterByRooms(element)
  && filterByGuests(element)
  && filterByFeatures(element);

const applyFilters = (offers, cb) => {
  typeFilter = filtersContainer.querySelector('#housing-type');
  priceFilter = filtersContainer.querySelector('#housing-price');
  roomsFilter = filtersContainer.querySelector('#housing-rooms');
  guestsFilter = filtersContainer.querySelector('#housing-guests');
  featuresFilter = filtersContainer.querySelector('#housing-features');

  const onFiltersChange = (element) => () => {
    const filteredCards = element.filter(filterOffers);

    cb(filteredCards);
  };

  filtersContainer.addEventListener('change', debounce(onFiltersChange(offers)));
};

const resetFilters = () => {
  filtersContainer.reset();
};

export {applyFilters, resetFilters};
