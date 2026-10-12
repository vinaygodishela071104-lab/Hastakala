document.addEventListener("DOMContentLoaded", () => {
  const filterInputs = document.querySelectorAll(
    ".hastakala-products-filter input"
  );
  const products = Array.from(
    document.querySelectorAll(".hastakala-product-card")
  );
  const productsGrid = document.getElementById("productsGrid");
  const resultCount = document.getElementById("productsResultCount");
  const emptyState = document.getElementById("productsEmpty");
  const clearButton = document.getElementById("clearFilters");
  const sortSelect = document.getElementById("productsSort");
  const filterToggle = document.querySelector(
    ".hastakala-products-listing__filter-toggle"
  );
  const filtersPanel = document.getElementById("productsFilters");
  const filtersClose = document.querySelector(
    ".hastakala-products-filters__close"
  );

  function getSelectedFilters(type) {
    return Array.from(
      document.querySelectorAll(`input[data-filter="${type}"]:checked`)
    ).map((input) => input.value);
  }

  function applyFilters() {
    const selectedCategories = getSelectedFilters("category");
    const selectedMaterials = getSelectedFilters("material");
    const selectedAvailabilities = getSelectedFilters("availability");
    const selectedPrice = getSelectedFilters("price")[0] || "";

    let visibleProducts = [];

    products.forEach((product) => {
      const category = product.dataset.category;
      const material = product.dataset.material;
      const availability = product.dataset.availability;
      const price = product.dataset.price;

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(material);

      const availabilityMatch =
        selectedAvailabilities.length === 0 ||
        selectedAvailabilities.includes(availability);

      const priceMatch =
        selectedPrice === "" || selectedPrice === price;

      const shouldShow =
        categoryMatch && materialMatch && availabilityMatch && priceMatch;

      product.hidden = !shouldShow;

      if (shouldShow) {
        visibleProducts.push(product);
      }
    });

    sortProducts(visibleProducts);

    resultCount.innerHTML = `Showing <strong>${visibleProducts.length}</strong> ${
      visibleProducts.length === 1 ? "piece" : "pieces"
    }`;

    emptyState.hidden = visibleProducts.length !== 0;
  }

  function sortProducts(visibleProducts) {
    const sortValue = sortSelect.value;

    visibleProducts.sort((first, second) => {
      if (sortValue === "newest") {
        return Number(second.dataset.created) - Number(first.dataset.created);
      }

      if (sortValue === "price-low") {
        return getPrice(first) - getPrice(second);
      }

      if (sortValue === "price-high") {
        return getPrice(second) - getPrice(first);
      }

      return 0;
    });

    visibleProducts.forEach((product) => {
      productsGrid.appendChild(product);
    });
  }

  function getPrice(product) {
    return Number(
      product
        .querySelector(".hastakala-product-card__price")
        .textContent.replace(/[^\d]/g, "")
    );
  }

  filterInputs.forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

  sortSelect.addEventListener("change", applyFilters);

  clearButton.addEventListener("click", () => {
    filterInputs.forEach((input) => {
      input.checked = false;
    });

    applyFilters();
  });

  filterToggle.addEventListener("click", () => {
    const isOpen = filtersPanel.classList.toggle("is-open");

    filterToggle.setAttribute("aria-expanded", isOpen);
  });

  filtersClose.addEventListener("click", () => {
    filtersPanel.classList.remove("is-open");
    filterToggle.setAttribute("aria-expanded", "false");
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
