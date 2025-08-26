import { createRecipesCard } from "./recipe-card.js";

/* Renders recipe cards and updates the recipe counter
 * @param {Array} list - The list of recipes to render
 * @param {HTMLElement} cardsContainer - The container for the recipe cards
 * @param {HTMLElement} counter - The element displaying the recipe count
 */
export function renderRecipes(
  list,
  cardsContainer = document.querySelector(".cards_container"),
  counter = document.querySelector(".nb-recipes")
) {
  // Checks if the card container exists
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";
  // Adds each recipe card to the container
  for (let i = 0; i < list.length; i++) {
    cardsContainer.append(createRecipesCard(list[i]));
  }
  // Updates the recipe counter
  if (counter) {
    counter.textContent = `${list.length < 10 ? "0" : ""}${list.length} ${
      list.length > 1 ? "recettes" : "recette"
    }`;
  }
}
