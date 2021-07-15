import Popup from './Popup.js';
import {
  cardImage,
  cardText
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {

  open(link, name) {
    cardImage.src = link;
    cardImage.alt = name;
    cardText.textContent = name;
    super.open();
  }
}