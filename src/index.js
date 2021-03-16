import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');
// import { debounce } from 'lodash';
import './styles.css';
import fetchCountries from './fetchCountries';
import countryone from './templates/countryone.hbs';
import countriesCard from './templates/countries.hbs';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputEll = document.querySelector('#request');
const resultEll = document.querySelector('.result');

inputEll.addEventListener('input', debounce(getCountries, 1000));

function getCountries(ev) {
  const inputValue = ev.target.value;
  resultEll.innerHTML = '';
  if (!inputValue) return;
  fetchCountries(inputValue).then(renderCountry).catch(errorCountry);
}

function renderCountry(countries) {
  if (countries.length === 1) {
    resultEll.innerHTML = countryone(countries);
    return;
  } else if (countries.length <= 10) {
    resultEll.innerHTML = countriesCard(countries);
    return;
  }
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}

function errorCountry() {
  alert({
    text: 'Сountry with such a set was not found!',
  });
}
