export default function fetchCountries(inputValue) {
  return fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`).then(
    response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    },
  );
}
