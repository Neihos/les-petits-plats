import { normalize } from "../helpers/text.js";

export const createFilter = (
  activeItemTags,
  newFilters,
  destination,
  category,
  applyFilters
) => {
  const filterContainer = document.createElement("ul");
  filterContainer.classList.add("dropdown-menu");

  const filterSearchBar = document.createElement("li");
  filterSearchBar.classList.add("filterSearchBar", "px-3", "py-2");

  const filterSearchBarInput = document.createElement("input");
  filterSearchBarInput.classList.add("filterSearchBarInput", "form-control");
  filterSearchBarInput.type = "search";
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

  filterSearchBarInput.addEventListener("input", () => {
    const q = normalize(filterSearchBarInput.value);
    [...filterContainer.querySelectorAll(".dropdown-item")].forEach((a) => {
      const show = !q || normalize(a.textContent).includes(q);
      a.parentElement.style.display = show ? "" : "none";
    });
  });
  
};
