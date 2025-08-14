import { recipes } from "../../data/recipes.js";

export function sendFilters() {
  // Get a unique list of ingredients
  const ingredients = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ing) => ing.ingredient.toLocaleLowerCase())
      )
    ),
  ];

  // Get a unique list of utensils
  const ustensils = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ustensils.map((u) => u.toLocaleLowerCase())
      )
    ),
  ];

  // Get a unique list of appliances
  const appliance = [
    ...new Set(recipes.map((recipe) => recipe.appliance.toLocaleLowerCase())),
  ];

  // Select HTML elements where filters will be inserted
  const ingredientsFilter = document.querySelector(".btn-ingredients");
  const ustensilsFilter = document.querySelector(".btn-ustensils");
  const applianceFilter = document.querySelector(".btn-appliances");


  const activeItemTags = {
    ingredients: [],
    ustensils: [],
    appliance: [],
  };

  function applyFilters() {
    console.log("Filtres actifs :", activeItemTags);
  }

  /**
   * Creates and inserts a dropdown filter menu into the target element
   *
   * @param {Array} newFilters - Array containing filter values
   * @param {HTMLElement} destination - HTML element where the filter will be injected
   */
  function createFilter(newFilters, destination, category) {
    // Create the <ul> container for the filter
    const filterContainer = document.createElement("ul");
    filterContainer.classList.add("dropdown-menu");

    // Create the list item containing the search bar
    const filterSearchBar = document.createElement("li");
    filterSearchBar.classList.add("filterSearchBar", "px-3", "py-2");

    // Create the search input field
    const filterSearchBarInput = document.createElement("input");
    filterSearchBarInput.classList.add("filterSearchBarInput", "form-control");
    filterSearchBarInput.type = "text";
    filterSearchBarInput.name = "search bar filter";

    // Create the search icon
    const filterIconeSearch = document.createElement("i");
    filterIconeSearch.classList.add("filterSearchBarIcone", "bi", "bi-search");

    // Assemble the search bar inside the filter container
    destination.appendChild(filterContainer);
    filterContainer.appendChild(filterSearchBar);
    filterSearchBar.append(filterSearchBarInput, filterIconeSearch);

    // Create and append each filter item
    newFilters.forEach((item) => {
      const filter = document.createElement("li");
      const filterLink = document.createElement("a");
      filterLink.classList.add("dropdown-item");
      filterLink.setAttribute("href", "#");
      filterLink.textContent = `${item}`;

      filterContainer.appendChild(filter);
      filter.appendChild(filterLink);
    });

    // Listen for clicks on the filter container
    filterContainer.addEventListener("click", (e) => {
      const link = e.target.closest("a.dropdown-item");
      if (!link) return;
      e.preventDefault();

      const value = link.textContent;
      const tagsArray = activeItemTags[category];

      // Add filter to the array if not present
      if (!tagsArray.includes(value)) {
        tagsArray.push(value);
        // Remove filter from the array if already present
      } else {
        tagsArray.splice(tagsArray.indexOf(value), 1);
      }

      applyFilters();
    });
  }

  // Render all filters
  createFilter(ingredients, ingredientsFilter, "ingredients");
  createFilter(ustensils, ustensilsFilter, "ustensils");
  createFilter(appliance, applianceFilter, "appliance");

}
