export function updateAlertBox(currentQuery, count) {
  const alert = document.getElementById("alert");
  if (!alert) return;
  alert.textContent =
    count === 0 && currentQuery && currentQuery.length >= 3
      ? `Aucune recette ne contient « ${currentQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`
      : "";
}
