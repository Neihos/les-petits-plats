import { recipes } from "../data/recipes.js";
import { createRecipesCard } from "./components/recipe-card.js";
import { sendFilters } from "./components/filters.js";

function displayRecipesCards() {
  const cardContainer = document.querySelector(".cards_container");

  recipes.forEach((recipe) => {
    cardContainer.appendChild(createRecipesCard(recipe));
  });
}

function init() {
  displayRecipesCards();
  sendFilters();
}

init();