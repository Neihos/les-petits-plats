import { createTagElement } from "../templates/create-tags.js";

/**
 * Get the label for a filter item
 * @param {string} category - The category of the filter (ingredients, ustensils, appliance)
 * @param {string} normVal - The normalized value of the filter item
 * @returns {string} - The label for the filter item
 */
function getLabel(category, normVal) {
  const li = document.querySelector(
    `li[data-filter-item][data-category="${category}"][data-value="${normVal}"]`
  );
  return li?.querySelector(".dropdown-item")?.textContent || normVal;
}

/**
 * Display the tags UI based on active filters
 * @param {Object} refs - The references to the UI elements
 * @param {Object} activeItemTags - The active tags for each filter category
 * @param {Function} applyFilters - The function to apply filters
 */
export function displayTags(refs, activeItemTags, applyFilters) {
  const { tagsContainer, ingredientsFilter, ustensilsFilter, applianceFilter } =
    refs;

  // Display the tags based on active filters
  const addTagGlobal = createTagElement(
    tagsContainer,
    activeItemTags,
    applyFilters
  );

  // Global tags
  activeItemTags.ingredients.forEach((v) =>
    addTagGlobal("ingredients", getLabel("ingredients", v))
  );
  activeItemTags.ustensils.forEach((v) =>
    addTagGlobal("ustensils", getLabel("ustensils", v))
  );
  activeItemTags.appliance.forEach((v) =>
    addTagGlobal("appliance", getLabel("appliance", v))
  );

  // Tags in each dropdown
  const ingMenu = ingredientsFilter.querySelector("ul.dropdown-menu");
  const ustMenu = ustensilsFilter.querySelector("ul.dropdown-menu");
  const appMenu = applianceFilter.querySelector("ul.dropdown-menu");

  const addTagIngr = createTagElement(ingMenu, activeItemTags, applyFilters);
  const addTagUst = createTagElement(ustMenu, activeItemTags, applyFilters);
  const addTagApp = createTagElement(appMenu, activeItemTags, applyFilters);

  activeItemTags.ingredients.forEach((v) =>
    addTagIngr("ingredients", getLabel("ingredients", v))
  );
  activeItemTags.ustensils.forEach((v) =>
    addTagUst("ustensils", getLabel("ustensils", v))
  );
  activeItemTags.appliance.forEach((v) =>
    addTagApp("appliance", getLabel("appliance", v))
  );
}
