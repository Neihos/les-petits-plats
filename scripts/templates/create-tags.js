import { capitalize } from "../helpers/text.js";

// Display the tags based on active filters
export const createTagElement = (containerIn, activeItemTags, applyFilters) => {
  if (!containerIn) return () => {};

  containerIn.innerHTML = "";
  const listOfTags = document.createElement("ul");
  listOfTags.classList.add("tags-container_tags-list");
  containerIn.append(listOfTags);

  // Function to add tags to the display
  return (category, value) => {
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
    listOfTags.append(tags);
  };
};
