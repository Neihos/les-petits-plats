// Normalisations & utilitaires texte
export const normalize = (str) => str.toLocaleLowerCase().trim();

export const unique = (array) => [...new Set(array)];

export const capitalize = (str) =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
