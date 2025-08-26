import { recipes } from "../../data/recipes.js";
import { unique } from "../helpers/text.js";
import { displayTags } from "../services/tags-ui.js";
import { createFilter } from "../templates/create-filters.js";
import { mainSearchBar, searchIn } from "./search.js";
import { updateAvailableOptions } from "../services/filter-update.js";
import { renderRecipes } from "../templates/renderer.js";
import { updateAlertBox } from "../services/alert.js";
import { filterByTags } from "../services/filtering.js";


export function getFilters() {
  // Get a unique list of ingredients, ustensils and appliances
  const ingredients = unique(
    recipes.flatMap((recipe) => recipe.ingredients.map((ing) => ing.ingredient))
  );

  const ustensils = unique(recipes.flatMap((recipe) => recipe.ustensils));

  const appliance = unique(recipes.map((recipe) => recipe.appliance));

  // Select HTML elements
  const ingredientsFilter = document.querySelector("#btn-ingredients");
  const ustensilsFilter = document.querySelector("#btn-ustensils");
  const applianceFilter = document.querySelector("#btn-appliances");
  const tagsContainer = document.querySelector("#tags-container");
  let currentQuery = "";

  // Active tags
  const activeItemTags = {
    ingredients: [],
    ustensils: [],
    appliance: [],
  };

  const applyFilters = () => {
    // Filter the recipes based on active tags and search query
    let filtered = filterByTags(recipes, activeItemTags);

    if (currentQuery && currentQuery.length >= 3) {
      filtered = searchIn(filtered, currentQuery);
    }

    // Update the available options in the filters
    updateAvailableOptions(
      filtered,
      { ingredientsFilter, ustensilsFilter, applianceFilter },
      activeItemTags
    );

    // Render the recipes
    renderRecipes(filtered);

    // Update the alert box
    updateAlertBox(currentQuery, filtered.length);

    // Display the tags UI
    displayTags(
      { tagsContainer, ingredientsFilter, ustensilsFilter, applianceFilter },
      activeItemTags,
      applyFilters
    );
  };

  // Render all filters
  createFilter(
    activeItemTags,
    ingredients,
    ingredientsFilter,
    "ingredients",
    applyFilters
  );
  createFilter(
    activeItemTags,
    ustensils,
    ustensilsFilter,
    "ustensils",
    applyFilters
  );
  createFilter(
    activeItemTags,
    appliance,
    applianceFilter,
    "appliance",
    applyFilters
  );

  // Initial render of recipes
  mainSearchBar(function (inSearchBarNormalized) {
    currentQuery = inSearchBarNormalized;
    applyFilters();
  });
}
