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
 * 
 * @param {*} list 
 * @param {*} inSearchBarNormalized 
 * @returns 
 */
export function searchIn(list, inSearchBarNormalized) {
  if (!inSearchBarNormalized || inSearchBarNormalized.length < 3) return list;

  const term = normalize(inSearchBarNormalized);
  const out = [];

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    let found = false;

    // 0: name, 1: description, 2: ingredients
    for (let f = 0; f < 3 && !found; f++) {
      switch (f) {
        case 0: {
          const s = normalize(r?.name || "");
          if (s.indexOf(term) !== -1) found = true;
          break;
        }
        case 1: {
          const s = normalize(r?.description || "");
          if (s.indexOf(term) !== -1) found = true;
          break;
        }
        case 2: {
          // ingredients
          const ings = r?.ingredients || [];
          for (let j = 0; j < ings.length; j++) {
            const s = normalize(ings[j]?.ingredient || "");
            if (s.indexOf(term) !== -1) {
              found = true;
              break;
            }
          }
          break;
        }
      }
    }

    if (found) out[out.length] = r;
  }

  return out;
}