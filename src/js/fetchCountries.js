export default function fetchCountries(value) {
  const baseUrl = 'https://restcountries.eu/rest/v2/name/';
  const countriesData = '?fields=name;capital;population;languages;flag';

  return fetch(baseUrl + value + countriesData)
    .then(result => result.json())
    .catch(console.log('Country not found'));
}
