import { recipes } from "../../data/recipes.js";
import { unique, normalize } from "../helpers/text.js";
import { displayTags } from "../services/tags-ui.js";
import { createFilter } from "../templates/create-filters.js";
import { mainSearchBar, searchIn } from "./search.js";
import { updateAvailableOptions } from "../services/filter-update.js";
import { renderRecipes } from "../templates/renderer.js";
import { updateAlertBox } from "../services/alert.js";

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
  const cardsContainer = document.querySelector(".cards_container");
  const nbRecipes = document.querySelector(".nb-recipes");
  let currentQuery = "";

  // Active tags
  const activeItemTags = {
    ingredients: [],
    ustensils: [],
    appliance: [],
  };

  const applyFilters = () => {
    let filtered = recipes;

    // Ingredients
    if (activeItemTags.ingredients.length > 0) {
      filtered = filtered.filter((recipe) => {
        const ingList = recipe.ingredients.map((i) => normalize(i.ingredient));
        return activeItemTags.ingredients.every((tag) => ingList.includes(tag));
      });
    }

    // Ustensils
    if (activeItemTags.ustensils.length > 0) {
      filtered = filtered.filter((recipe) => {
        const ustList = recipe.ustensils.map((u) => normalize(u));
        return activeItemTags.ustensils.every((tag) => ustList.includes(tag));
      });
    }

    // Appliances : string or array
    if (activeItemTags.appliance.length > 0) {
      filtered = filtered.filter((recipe) => {
        const appList = Array.isArray(recipe.appliance)
          ? recipe.appliance.map((a) => normalize(a))
          : [normalize(recipe.appliance)];
        return activeItemTags.appliance.every((tag) => appList.includes(tag));
      });
    }

    if (currentQuery && currentQuery.length >= 3) {
      filtered = searchIn(filtered, currentQuery);
    }

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

  mainSearchBar(function (cleanInSearchBar) {
    currentQuery = cleanInSearchBar;
    applyFilters();
  });
}
