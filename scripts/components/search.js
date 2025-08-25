import { normalize } from "../helpers/text.js";

// Main search bar component
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

// Search function
export function searchIn(list, cleanInSearchBar) {
  if (!cleanInSearchBar || cleanInSearchBar.length < 3) return list;

  const term = normalize(cleanInSearchBar);
  const out = [];

  list.forEach((r) => {
    // Name, description
    const hasText = [r?.name, r?.description].some((s) =>
      normalize(s || "").includes(term)
    );

    // ingredients
    const hasIng =
      Array.isArray(r?.ingredients) &&
      r.ingredients.some((ing) =>
        normalize(ing?.ingredient || "").includes(term)
      );

    if (hasText || hasIng) out.push(r);
  });

  return out;
}