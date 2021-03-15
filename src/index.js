import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');
// import { debounce } from 'lodash';
import './styles.css';
import countryone from './countryone.hbs';
import countriesCard from './countries.hbs';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputEll = document.querySelector('#request');
const resultEll = document.querySelector('.result');
const getCountry = debounce(function () {
  getCountries();
}, 1000);

inputEll.addEventListener('input', getCountry);

function getCountries() {
  fetchCountrys().then(renderCountry).catch(errorCountry);
}

function fetchCountrys() {
  return fetch(`https://restcountries.eu/rest/v2/name/${inputEll.value}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    },
  );
}

function renderCountry(countries) {
  if (countries.length === 1) {
    return (resultEll.innerHTML = countryone(countries));
  } else if (countries.length <= 10) {
    return (resultEll.innerHTML = countriesCard(countries));
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
