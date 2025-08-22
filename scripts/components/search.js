import { normalize } from "../helpers/text.js";

export function mainSearchBar(onSearch) {
  const form = document.querySelector(
    ".header-index_search-container_navbar form"
  );
  const input = document.querySelector(".input-search-bar");
  if (!form || !input) return;

  function update() {
    const inSearchBar = input.value || "";
    const cleanInSearchBar = normalize(inSearchBar);
    onSearch(cleanInSearchBar.length >= 3 ? cleanInSearchBar : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    update();
  });

  input.addEventListener("input", function (e) {
    update();
  });
}


export function searchIn(list, cleanInSearchBar) {
  if (!cleanInSearchBar || cleanInSearchBar.length < 3) return list;

  const term = normalize(cleanInSearchBar);
  const out = [];

  list.forEach((r) => {
    // Name, appliances, description
    const hasText = [r?.name, r?.appliance, r?.description].some((s) =>
      normalize(s || "").includes(term)
    );

    // ingredients
    const hasIng =
      Array.isArray(r?.ingredients) &&
      r.ingredients.some((ing) =>
        normalize(ing?.ingredient || "").includes(term)
      );

    // ustensils
    const hasUst =
      Array.isArray(r?.ustensils) &&
      r.ustensils.some((u) => normalize(u || "").includes(term));

    if (hasText || hasIng || hasUst) out.push(r);
  });

  return out;
}