import { capitalize, normalize } from "../helpers/text.js";

// Display the tags based on active filters
export const createTagElement = (containerIn, activeItemTags, applyFilters) => {
  if (!containerIn) return () => {};

  const isDropdown = containerIn.classList?.contains("dropdown-menu");
  let listOfTags;

  if (isDropdown) {
    let dropdownTags = containerIn.querySelector("li.dropdownTags");
    if (!dropdownTags) {
      dropdownTags = document.createElement("li");
      dropdownTags.classList.add("dropdownTags");
      const searchLi = containerIn.querySelector("li.filterSearchBar");
      if (searchLi) {
        searchLi.after(dropdownTags);
      } else {
        containerIn.prepend(dropdownTags);
      }
    }

    listOfTags = dropdownTags.querySelector("ul.tags-list");
    if (!listOfTags) {
      listOfTags = document.createElement("ul");
      listOfTags.classList.add("tags-list");
      dropdownTags.append(listOfTags);
    }
    listOfTags.innerHTML = "";
  } else {
    containerIn.innerHTML = "";
    listOfTags = document.createElement("ul");
    listOfTags.classList.add("tags-list");
    containerIn.append(listOfTags);
  }

  // Function to add tags to the display
  return (category, value) => {
    const tags = document.createElement("li");
    tags.classList.add("tags");
    tags.textContent = capitalize(value);

    const cross = document.createElement("i");
    cross.classList.add("removeTags", "bi","bi-x-circle-fill");
    cross.style.cursor = "pointer";

    cross.addEventListener("click", () => {
      const norm = normalize(value);
      const arr = activeItemTags[category];
      const idx = arr.indexOf(norm);
      if (idx !== -1) arr.splice(idx, 1);

      // Find the menu option via data-value
      const li = document.querySelector(
        `li[data-filter-item][data-category="${category}"][data-value="${norm}"]`
      );
      if (li) {
        li.hidden = false;
        li.style.display = "";
        li.querySelector(".dropdown-item")?.classList.remove("is-active");
      }

      applyFilters();
    });

    tags.append(cross);
    listOfTags.append(tags);
  };
};
