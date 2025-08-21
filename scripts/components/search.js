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

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    let found = false;

    // 0: name, 1: appliance, 2: description, 3: ingredients, 4: ustensils
    for (let f = 0; f < 5 && !found; f++) {
      switch (f) {
        case 0: {
          const s = normalize(r?.name || "");
          if (s.indexOf(term) !== -1) found = true;
          break;
        }
        case 1: {
          const s = normalize(r?.appliance || "");
          if (s.indexOf(term) !== -1) found = true;
          break;
        }
        case 2: {
          const s = normalize(r?.description || "");
          if (s.indexOf(term) !== -1) found = true;
          break;
        }
        case 3: {
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
        case 4: {
          // ustensils
          const ust = r?.ustensils || [];
          for (let k = 0; k < ust.length; k++) {
            const s = normalize(ust[k] || "");
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