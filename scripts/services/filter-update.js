import { normalize } from "../helpers/text.js";

// update the available options in the dropdown menus
export function updateAvailableOptions(list, refs, activeItemTags) {
  const ing = new Set(),
    ust = new Set(),
    app = new Set();

  for (let i = 0; i < list.length; i++) {
    const r = list[i];

    const ings = r.ingredients || [];
    for (let j = 0; j < ings.length; j++) {
      ing.add(normalize(ings[j]?.ingredient || ""));
    }

    const u = r.ustensils || [];
    for (let k = 0; k < u.length; k++) {
      ust.add(normalize(u[k] || ""));
    }

    app.add(normalize(r.appliance || ""));
  }

  toggle(refs.ingredientsFilter, ing, "ingredients", activeItemTags);
  toggle(refs.ustensilsFilter, ust, "ustensils", activeItemTags);
  toggle(refs.applianceFilter, app, "appliance", activeItemTags);
}

function toggle(wrapper, set, category, activeItemTags) {
  if (!wrapper) return;
  const menu = wrapper.querySelector("ul.dropdown-menu");
  if (!menu) return;

  const items = menu.querySelectorAll("li[data-filter-item]");
  for (let i = 0; i < items.length; i++) {
    const li = items[i];
    const val = li.dataset.value;
    const selected =
      (activeItemTags[category] || []).includes(val) || li.hidden;
    if (selected) continue;

    const available = set.has(val);
    li.dataset.available = available ? "1" : "0";
    li.style.display = available ? "" : "none";
  }
}
