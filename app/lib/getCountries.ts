import countries from "world-countries";

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region,
}));

/**
 * Returns an object with two functions: gelAllCountries and getCountryByValue.
 *
 * gelAllCountries: Returns an array of objects representing all countries. Each object contains the following properties:
 *   - value: The country's cca2 code.
 *   - label: The country's common name.
 *   - flag: The country's flag.
 *   - latLang: The country's latitude and longitude.
 *   - region: The country's region.
 *
 * getCountryByValue: Returns the country object that matches the given value.
 *
 * @returns {Object} An object with two functions: gelAllCountries and getCountryByValue.
 */
export const useCountries = () => {
  const gelAllCountries = () => countriesFormatted;

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };
  return {
    gelAllCountries,
    getCountryByValue,
  };
};
