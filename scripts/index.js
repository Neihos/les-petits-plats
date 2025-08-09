import { recipes } from "../data/recipes.js";
import { createRecipesCard } from "./components/recipe-card.js";

function displayRecipesCards() {
  const cardContainer = document.querySelector(".cards_container");

  recipes.forEach((recipe) => {
    cardContainer.appendChild(createRecipesCard(recipe));
  });
}
displayRecipesCards();