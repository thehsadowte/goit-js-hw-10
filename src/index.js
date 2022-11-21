import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryMarkup from './templates/country-markup.hbs';
import listOfCountries from './templates/list-of-countries.hbs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const searchValue = event.target.value.trim();
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  if (!event.target.value) {
    return;
  }

  fetchCountries(searchValue).then(renderCountryList).catch(onFetchError);
}

function renderCountryList(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length >= 2 && countries.length <= 10) {
    countryList.innerHTML = listOfCountries(countries);
  }

  if (countries.length === 1) {
    countryInfo.innerHTML = countryMarkup(countries);
  }
}

function onFetchError(error) {
  console.log(error);
  Notify.failure('Oops, there is no country with that name');
}
