import {similarAds} from './data.js';
import {generatePopup} from './popup.js';

const mapCanvas = document.querySelector('#map-canvas');
const ads = similarAds();
const popup = generatePopup(ads[0]);

mapCanvas.appendChild(popup);
