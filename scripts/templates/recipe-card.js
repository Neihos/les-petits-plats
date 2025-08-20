/**
 * Recipe card creation template
 * Generates an HTML article element containing the information of a recipe
 *
 * @function
 * @param {Object} recipe - The recipe information
 * @returns {HTMLElement} The recipe card
 */
export function createRecipesCard(recipe) {
  const card = document.createElement("article");
  card.classList.add(
    "card",
    "recipe-card",
    "my-2",
    "rounded-4",
    "overflow-hidden",
    "border",
    "border-0"
  );

  // Recipe image
  const img = document.createElement("img");
  img.src = `assets/images/recipes/${recipe.image}`;
  img.alt = recipe.name;
  img.loading = "lazy";

  const cardContent = document.createElement("section");
  cardContent.classList.add("card_content", "p-4");

  // Cooking time
  const cookingTime = document.createElement("span");
  cookingTime.textContent = `${recipe.time}min`;
  cookingTime.classList.add("cooking-time","text-center", "rounded-4", "d-flex", "align-items-center", "justify-content-center");

  // Recipe title
  const title = document.createElement("H2");
  title.textContent = recipe.name;
  title.classList.add("text-truncate", "py-2");

  const recipeDescription = document.createElement("section");

  // Recipe description
  const recette = document.createElement("H3");
  recette.textContent = "Recette";
  recette.classList.add("py-3", "text-uppercase", "fw-bold");

  const description = document.createElement("p");
  description.textContent = recipe.description;
  description.classList.add("textDescription");

  const recipeIngredients = document.createElement("section");

  // Recipe ingredients
  const ingredients = document.createElement("H3");
  ingredients.textContent = "Ingrédients";
  ingredients.classList.add("py-3", "text-uppercase", "fw-bold");

  const ingredientsContainer = document.createElement("ul");
  ingredientsContainer.classList.add("ingredients-list", "row", "p-0");

  // Creation of elements for each ingredient
  recipe.ingredients.forEach((item) => {
    const ingredientContent = document.createElement("li");
    ingredientContent.classList.add(
      "ingredient",
      "col-6",
      "d-flex",
      "flex-column",
      "mb-3"
    );

    // Creation of elements for the ingredient name and quantity
    const ingredientName = document.createElement("span");
    ingredientName.textContent = item.ingredient;
    ingredientName.classList.add("ingredient-name");

    const ingredientDose = document.createElement("span");
    ingredientDose.textContent = item.quantity
      ? `${item.quantity} ${item.unit || ""}`
      : "-";
    ingredientDose.classList.add("ingredient-dose");

    ingredientsContainer.append(ingredientContent);
    ingredientContent.append(ingredientName, ingredientDose);
  });

  // Assembly of card elements
  card.append(img, cookingTime, cardContent);
  cardContent.append(title, recipeDescription, recipeIngredients);
  recipeDescription.append(recette, description);
  recipeIngredients.append(ingredients, ingredientsContainer);

  return card;
}
