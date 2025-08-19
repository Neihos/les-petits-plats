import { recipes } from "../data/recipes.js";
import { createRecipesCard } from "./components/recipe-card.js";
import { getFilters } from "./components/filters.js";

function displayRecipesCards() {
  const cardContainer = document.querySelector(".cards_container");

  recipes.forEach((recipe) => {
    cardContainer.append(createRecipesCard(recipe));
  });
}

function init() {
  displayRecipesCards();
  getFilters();
}

init();