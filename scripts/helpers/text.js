/**
 * Normalize a string by removing diacritics and trimming whitespace.
 * @param {string} str - The string to normalize.
 * @returns {string} - The normalized string.
 */
export const normalize = (str) =>
  str
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

/**
 * Get unique values from an array.
 * @param {Array} array - The array to process.
 * @returns {Array} - A new array with unique values.
 */
export const unique = (array) => [...new Set(array)];

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalize = (str) =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
