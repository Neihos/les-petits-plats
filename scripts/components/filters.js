import { recipes } from "../../data/recipes.js";
import { createRecipesCard } from "../templates/recipe-card.js";
import { unique, normalize } from "../helpers/text.js";
import { createTagElement } from "../templates/create-tags.js";
import { createFilter } from "../templates/create-filters.js";
import { mainSearchBar, searchIn } from "./search.js";

export function getFilters() {
  // Get a unique list of ingredients, ustensils and appliances
  const ingredients = unique(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((ing) => normalize(ing.ingredient))
    )
  );

  const ustensils = unique(
    recipes.flatMap((recipe) => recipe.ustensils.map((u) => normalize(u)))
  );

  const appliance = unique(
    recipes.map((recipe) => normalize(recipe.appliance))
  );

  // Select HTML elements
  const ingredientsFilter = document.querySelector("#btn-ingredients");
  const ustensilsFilter = document.querySelector("#btn-ustensils");
  const applianceFilter = document.querySelector("#btn-appliances");
  const tagsContainer = document.querySelector("#tags-container");
  const cardsContainer = document.querySelector(".cards_container");
  const nbRecipes = document.querySelector(".nb-recipes");
  let currentQuery = "";

  // Render of recipes
  const renderRecipes = (list) => {
    cardsContainer.innerHTML = "";
    list.forEach((recipe) => {
      cardsContainer.append(createRecipesCard(recipe));
    });
    // Counter update
    nbRecipes.textContent = `${list.length} ${
      list.length > 1 ? "recettes" : "recette"
    }`;
  };

  // Active tags
  const activeItemTags = {
    ingredients: [],
    ustensils: [],
    appliance: [],
  };

  // Display the tags based on active filters
  const displayTags = () => {
    const addTagGlobal = createTagElement(
      tagsContainer,
      activeItemTags,
      applyFilters
    );

    // Display tags on home page
    activeItemTags.ingredients.forEach((v) => addTagGlobal("ingredients", v));
    activeItemTags.ustensils.forEach((v) => addTagGlobal("ustensils", v));
    activeItemTags.appliance.forEach((v) => addTagGlobal("appliance", v));

    // Dropdowns containers
    const ingMenu = ingredientsFilter.querySelector("ul.dropdown-menu");
    const ustMenu = ustensilsFilter.querySelector("ul.dropdown-menu");
    const appMenu = applianceFilter.querySelector("ul.dropdown-menu");

    const addTagIngr = createTagElement(ingMenu, activeItemTags, applyFilters);
    const addTagUst = createTagElement(ustMenu, activeItemTags, applyFilters);
    const addTagApp = createTagElement(appMenu, activeItemTags, applyFilters);

    // Add tags in dropdowns
    activeItemTags.ingredients.forEach((v) => addTagIngr("ingredients", v));
    activeItemTags.ustensils.forEach((v) => addTagUst("ustensils", v));
    activeItemTags.appliance.forEach((v) => addTagApp("appliance", v));
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

    renderRecipes(filtered);
    displayTags();
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
