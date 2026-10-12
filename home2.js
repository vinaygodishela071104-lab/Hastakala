document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hastakala-home2-hero");

  if (!hero) return;

  const slides = [...hero.querySelectorAll(".hastakala-home2-hero__slide")];
  const previousButton = hero.querySelector("[data-hero-prev]");
  const nextButton = hero.querySelector("[data-hero-next]");
  const currentCounter = hero.querySelector("[data-hero-current]");
  const totalCounter = hero.querySelector("[data-hero-total]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeIndex = 0;
  let rotationTimer = null;
  let isPaused = reducedMotion.matches;

  if (!slides.length) return;

  if (totalCounter) {
    totalCounter.textContent = String(slides.length).padStart(2, "0");
  }

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    if (currentCounter) {
      currentCounter.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  }

  function stopRotation() {
    window.clearInterval(rotationTimer);
    rotationTimer = null;
  }

  function startRotation() {
    stopRotation();

    if (isPaused || slides.length < 2) return;

    rotationTimer = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 3000);
  }

  function pauseRotation() {
    isPaused = true;
    stopRotation();
  }

  function moveSlide(direction) {
    showSlide(activeIndex + direction);
    pauseRotation();
  }

  previousButton?.addEventListener("click", () => {
    moveSlide(-1);
  });

  nextButton?.addEventListener("click", () => {
    moveSlide(1);
  });

  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSlide(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSlide(1);
    }
  });

  hero.addEventListener("mouseenter", pauseRotation);
  hero.addEventListener("focusin", pauseRotation);

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      pauseRotation();
    }
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons({ root: hero });
  }

  startRotation();
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".hastakala-mood-edit");

  if (!section) return;

  const moods = [
    {
      name: "Earthy",
      label: "NATURAL TEXTURES · GROUNDED TONES",
      description:
        "Bring a sense of calm into your space with tactile fibres, warm wood, and tones drawn from the earth.",
      image: "./images/mood-earthy.jpg",
      alt: "Earth-toned living room with natural wood, clay, and woven accents",
      link: "collections/earthy.html",
    },
    {
      name: "Quiet Heritage",
      label: "TIMELESS DETAILS · ROOTED IN CRAFT",
      description:
        "Create a space with a sense of history through enduring forms, artisan details, and a gentle nod to tradition.",
      image: "./images/mood-quiet-heritage.jpg",
      alt: "Timeless interior with carved wood, subtle brass, and heritage details",
      link: "collections/quiet-heritage.html",
    },
    {
      name: "Modern Artisan",
      label: "CONTEMPORARY FORMS · MADE BY HAND",
      description:
        "Pair clean, modern lines with the warmth and individuality of pieces shaped by skilled hands.",
      image: "./images/mood-modern-artisan.jpg",
      alt: "Modern interior styled with sculptural handmade decor",
      link: "collections/modern-artisan.html",
    },
  ];

  const buttons = [...section.querySelectorAll("[data-mood]")];
  const image = section.querySelector("[data-mood-image]");
  const currentNumber = section.querySelector("[data-mood-current]");
  const label = section.querySelector("[data-mood-label]");
  const title = section.querySelector("[data-mood-title]");
  const description = section.querySelector("[data-mood-description]");
  const link = section.querySelector("[data-mood-link]");

  function selectMood(index) {
    const mood = moods[index];

    buttons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    image.style.opacity = "0";

    window.setTimeout(() => {
      image.src = mood.image;
      image.alt = mood.alt;
      label.textContent = mood.label;
      title.textContent = mood.name;
      description.textContent = mood.description;
      link.href = mood.link;
      currentNumber.textContent = String(index + 1).padStart(2, "0");
      image.style.opacity = "1";
    }, 180);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectMood(Number(button.dataset.mood));
    });
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons({ root: section });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hastakala-collection").forEach((section) => {
    const tabs = [...section.querySelectorAll(".hastakala-collection__tab")];
    const products = [...section.querySelectorAll(".hastakala-product")];
    const panel = section.querySelector(".hastakala-collection__panel");
    const emptyMessage = section.querySelector(".hastakala-collection__empty");

    if (!tabs.length || !products.length) return;

    function setActiveTab(selectedTab, moveFocus = false) {
      const selectedCategory = selectedTab.dataset.category
        .trim()
        .toLowerCase();

      tabs.forEach((tab) => {
        const isActive = tab === selectedTab;

        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      if (panel && selectedTab.id) {
        panel.setAttribute("aria-labelledby", selectedTab.id);
      }

      let visibleProducts = 0;

      products.forEach((product) => {
        const productCategory = (product.dataset.category || "")
          .trim()
          .toLowerCase();

        const isVisible =
          selectedCategory === "all" || productCategory === selectedCategory;

        product.hidden = !isVisible;

        if (isVisible) visibleProducts += 1;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleProducts > 0;
      }

      if (moveFocus) selectedTab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        setActiveTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        setActiveTab(tabs[nextIndex], true);
      });
    });

    const allTab = tabs.find((tab) => tab.dataset.category === "all");
    const initiallyActiveTab =
      tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ||
      allTab ||
      tabs[0];

    setActiveTab(initiallyActiveTab);
  });

  if (typeof lucide !== "undefined") {
    document.querySelectorAll(".hastakala-collection").forEach((section) => {
      lucide.createIcons({ root: section });
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hastakala-many-ways").forEach((section) => {
    const mainImage = section.querySelector("[data-many-ways-main-image]");
    const caption = section.querySelector("[data-many-ways-caption]");
    const thumbnails = [...section.querySelectorAll(".hastakala-many-ways__thumbnail")];

    if (!mainImage || !thumbnails.length) return;

    function selectScene(thumbnail) {
      mainImage.style.opacity = "0";

      window.setTimeout(() => {
        mainImage.src = thumbnail.dataset.sceneImage;
        mainImage.alt = thumbnail.dataset.sceneAlt;
        mainImage.style.opacity = "1";

        if (caption) {
          caption.textContent = thumbnail.dataset.sceneCaption;
        }
      }, 150);

      thumbnails.forEach((item) => {
        const isActive = item === thumbnail;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        selectScene(thumbnail);
      });

      thumbnail.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          nextIndex = (index + 1) % thumbnails.length;
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          nextIndex = (index - 1 + thumbnails.length) % thumbnails.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = thumbnails.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        thumbnails[nextIndex].focus();
        selectScene(thumbnails[nextIndex]);
      });
    });

    if (typeof lucide !== "undefined") {
      lucide.createIcons({ root: section });
    }
  });
});