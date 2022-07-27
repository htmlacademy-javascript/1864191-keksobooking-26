import {createCard} from './popup.js';
import {activateFilters, activateForm} from './form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';
import {applyFilters} from './filters.js';

const DEFAULT_COORDS = {
  lat: 35.68483,
  lng: 139.75248
};

const ZOOM_DEFAULT = 10;
const OFFERS_COUNT = 10;
const COORDS_DIGITS = 5;

const MAP_SETTINGS = {
  layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

const addressInput = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let map;
let mainMarker;
let markerGroup;

const setAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(COORDS_DIGITS)}, ${lng.toFixed(COORDS_DIGITS)}`;
};

const renderMarkers = (offers) => {
  markerGroup.clearLayers();

  offers
    .slice(0, OFFERS_COUNT)
    .forEach((offer) => {
      const {
        location: {
          lat,
          lng,
        } } = offer;

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: pinIcon,
        }
      );

      marker
        .addTo(markerGroup)
        .bindPopup(createCard(offer));
    });
};

const resetMap = () => {
  if (map) {
    map.setView(DEFAULT_COORDS, ZOOM_DEFAULT);
  }
  mainMarker.setLatLng(DEFAULT_COORDS);

  setTimeout(() => {
    setAddress(DEFAULT_COORDS);
  });
};

const onSuccessLoadOffers = (offers) => {
  renderMarkers(offers.slice(0, OFFERS_COUNT));
  applyFilters(offers, renderMarkers);
  activateFilters();
};

const onFailLoadOffers = (message) => {
  showAlert(message);
};

const initMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      setAddress(DEFAULT_COORDS);
      getData(onSuccessLoadOffers, onFailLoadOffers);
      activateForm();
    })
    .setView(DEFAULT_COORDS, ZOOM_DEFAULT);

  L.tileLayer(MAP_SETTINGS.layer, MAP_SETTINGS.attribution).addTo(map);

  markerGroup = L.layerGroup().addTo(map);

  mainMarker = L.marker(
    DEFAULT_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainMarker.addTo(map);

  mainMarker.on('move', ({target}) => {
    const newCoordinates = target.getLatLng();
    setAddress(newCoordinates);
  });

};

const resetMarkers = () => {
  getData(onSuccessLoadOffers, onFailLoadOffers);
};

export {initMap, resetMap, resetMarkers};
