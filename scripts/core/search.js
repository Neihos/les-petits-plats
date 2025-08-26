import { normalize } from "../helpers/text.js";

/**
 * Main search bar component
 * @param {Function} onSearch - Callback function to handle search input
 **/
export function mainSearchBar(onSearch) {
  const form = document.querySelector(
    ".header-index_search-container_navbar form"
  );
  const input = document.querySelector(".input-search-bar");
  if (!form || !input) return;

  function update() {
    const inSearchBar = input.value || "";
    const inSearchBarNormalized = normalize(inSearchBar);
    onSearch(inSearchBarNormalized.length >= 3 ? inSearchBarNormalized : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    update();
  });

  input.addEventListener("input", function (e) {
    update();
  });
}

/**
 * Search function
 * @param {*} list 
 * @param {*} inSearchBarNormalized 
 * @returns 
 */
export function searchIn(list, inSearchBarNormalized) {
  if (!inSearchBarNormalized || inSearchBarNormalized.length < 3) return list;

  const term = normalize(inSearchBarNormalized);
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