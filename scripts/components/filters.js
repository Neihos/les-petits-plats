import { recipes } from "../../data/recipes.js";
import { createRecipesCard } from "./recipe-card.js";
import { unique, normalize, capitalize } from "../helpers/text.js";

export function getFilters() {
  // Get a unique list of ingredients, ustensils and appliances
  const ingredients = unique(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((ing) => normalize(ing.ingredient))
    )
  );

  const ustensils = unique(
    recipes.flatMap((recipe) =>
      recipe.ustensils.map((u) => normalize(u))
    )
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
    if (!tagsContainer) return;

    tagsContainer.innerHTML = "";
    const ListOfTags = document.createElement("ul");
    ListOfTags.classList.add("tags-container_tags-list");
    tagsContainer.append(ListOfTags);

    // Function to add tags to the display
    const addTag = (category, value) => {
      const tags = document.createElement("li");
      tags.classList.add("tags");
      tags.textContent = capitalize(value);

      const cross = document.createElement("i");
      cross.classList.add("removeTags", "bi", "bi-x-lg");
      cross.style.cursor = "pointer";
      cross.addEventListener("click", () => {
        const tagsList = activeItemTags[category];
        const i = tagsList.indexOf(value);
        if (i !== -1) tagsList.splice(i, 1);
        applyFilters();
      });

      tags.append(cross);
      ListOfTags.append(tags);
    };

    activeItemTags.ingredients.forEach((v) => addTag("ingredients", v));
    activeItemTags.ustensils.forEach((v) => addTag("ustensils", v));
    activeItemTags.appliance.forEach((v) => addTag("appliance", v));
  };

  const applyFilters = () => {
    let filtered = recipes;

    // Ingredients
    if (activeItemTags.ingredients.length > 0) {
      filtered = filtered.filter((recipe) => {
        const ingList = recipe.ingredients.map((i) =>
          normalize(i.ingredient)
        );
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

    renderRecipes(filtered);
    displayTags();
  };

  const createFilter = (newFilters, destination, category) => {
    const filterContainer = document.createElement("ul");
    filterContainer.classList.add("dropdown-menu");
    const filterSearchBar = document.createElement("li");
    filterSearchBar.classList.add("filterSearchBar", "px-3", "py-2");
    const filterSearchBarInput = document.createElement("input");
    filterSearchBarInput.classList.add("filterSearchBarInput", "form-control");
    filterSearchBarInput.type = "text";
    filterSearchBarInput.name = "search bar filter";
    const filterIconeSearch = document.createElement("i");
    filterIconeSearch.classList.add("filterSearchBarIcone", "bi", "bi-search");

    // Assemble the search bar inside the filter container
    destination.append(filterContainer);
    filterSearchBar.append(filterSearchBarInput, filterIconeSearch);
    filterContainer.append(filterSearchBar);

    // Create and append each filter item
    newFilters.forEach((item) => {
      const filter = document.createElement("li");
      const filterLink = document.createElement("a");
      filterLink.classList.add("dropdown-item");
      filterLink.setAttribute("href", "#");
      filterLink.textContent = `${item}`;

      filterContainer.append(filter);
      filter.append(filterLink);
    });

    // Listen for clicks on the filter container
    filterContainer.addEventListener("click", (e) => {
      const link = e.target.closest("a.dropdown-item");
      if (!link) return;
      e.preventDefault();

      const value = normalize(link.textContent);
      const tagsArray = activeItemTags[category];

      if (!tagsArray.includes(value)) {
        tagsArray.push(value);
        link.classList.add("is-active");
      } else {
        tagsArray.splice(tagsArray.indexOf(value), 1);
        link.classList.remove("is-active");
      }

      applyFilters();
    });
  };

  // Render all filters
  createFilter(ingredients, ingredientsFilter, "ingredients");
  createFilter(ustensils, ustensilsFilter, "ustensils");
  createFilter(appliance, applianceFilter, "appliance");
}
