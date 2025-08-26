import { normalize } from "../helpers/text.js";

/**
 * Filters a list of recipes according to active tags.
 * @param {Array} list
 * @param {{ingredients:string[], ustensils:string[], appliance:string[]}} activeItemTags
 * @returns {Array}
 */
export function filterByTags(list, activeItemTags) {
  let out = list;

  // Ingredients
  if (activeItemTags.ingredients.length) {
    out = out.filter((r) => {
      const ingList = r.ingredients.map((i) => normalize(i.ingredient));
      return activeItemTags.ingredients.every((tag) => ingList.includes(tag));
    });
  }

  // Ustensils
  if (activeItemTags.ustensils.length) {
    out = out.filter((r) => {
      const ustList = r.ustensils.map((u) => normalize(u));
      return activeItemTags.ustensils.every((tag) => ustList.includes(tag));
    });
  }

  // Appliances (string or array)
  if (activeItemTags.appliance.length) {
    out = out.filter((r) => {
      const appList = Array.isArray(r.appliance)
        ? r.appliance.map((a) => normalize(a))
        : [normalize(r.appliance)];
      return activeItemTags.appliance.every((tag) => appList.includes(tag));
    });
  }

  return out;
}
