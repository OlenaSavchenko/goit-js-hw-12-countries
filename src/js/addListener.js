import refs from './refs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import renderCountries from './countriesMarkup';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyAnimate';

refs.searchForm.addEventListener('input', debounce(onFormInput, 500));

function onFormInput(event) {
  event.preventDefault();
  refs.countriesList.innerHTML = '';
  const inputValue = event.target.value;

  fetchCountries(inputValue).then(result => {
    if (result.length >= 1 && result.length <= 10) {
      renderCountries(result);
            PNotify.success({
        title: 'Success!',
        text: 'Great! We found information!',
      });
    } else if (result.length > 10) {
      PNotify.error({
        text: 'Too many mathes found. Please enter a more specific query!',
      });
      console.log('more than 10');
    } else if (result.status === 404) {
      PNotify.error({
        title: 'Oh No!',
        text: 'It seems there are no such country! Try again!',
      });
    }
  });
}
