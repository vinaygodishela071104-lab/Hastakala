document.addEventListener("DOMContentLoaded", () => {
  const artisansHero = document.querySelector(".hastakala-artisans-hero");

  if (!artisansHero) {
    return;
  }

  const content = artisansHero.querySelector(
    ".hastakala-artisans-hero__content",
  );

  if (content) {
    content.classList.add("hastakala-artisans-hero__reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(content);
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const storiesSection = document.querySelector(".hastakala-artisan-stories");

  if (!storiesSection) {
    return;
  }

  const revealElements = [
    storiesSection.querySelector(".hastakala-artisan-stories__media"),
    storiesSection.querySelector(".hastakala-artisan-stories__content"),
  ];

  revealElements.forEach((element) => {
    element.classList.add("hastakala-artisan-stories__reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const artisansSection = document.querySelector(".hastakala-meet-artisans");
  const modal = document.getElementById("artisanModal");

  if (!artisansSection || !modal) {
    return;
  }

  const artisanData = {
    meera: {
      name: "Meera Sharma",
      craft: "Ceramic Artist",
      experience: "12+ years of experience",
      image: "./images/artisan-1.jpg",
      about:
        "Meera has spent more than 12 years working with clay, shaping quiet and functional forms inspired by everyday rituals. Her work celebrates natural textures, warm earthy tones, and the subtle beauty of handmade imperfections.",
      signature:
        "The Terra Collection — hand-shaped vases and tableware finished with warm, natural clay tones.",
    },
    arjun: {
      name: "Arjun Patel",
      craft: "Woodworker",
      experience: "8+ years of experience",
      image: "./images/artisan-2.jpg",
      about:
        "Arjun works with responsibly sourced wood to create smooth, functional objects that retain the natural grain and warmth of the material. His work is guided by simplicity, balance, and careful hand-finishing.",
      signature:
        "The Grain Series — serving bowls, trays, and accents shaped to highlight the natural character of wood.",
    },
    ritu: {
      name: "Ritu Nair",
      craft: "Textile Artist",
      experience: "10+ years of experience",
      image: "./images/artisan-3.jpg",
      about:
        "Ritu weaves natural fibres into soft, layered textiles inspired by rhythm, colour, and the changing seasons. Each piece reflects a slow, thoughtful approach to material and pattern.",
      signature:
        "The Loom Series — handwoven cushions and wall pieces with layered texture and natural fibre details.",
    },
  };

  const modalImage = document.getElementById("artisanModalImage");
  const modalName = document.getElementById("artisanModalName");
  const modalCraft = document.getElementById("artisanModalCraft");
  const modalExperience = document.getElementById("artisanModalExperience");
  const modalAbout = document.getElementById("artisanModalAbout");
  const modalSignature = document.getElementById("artisanModalSignature");

  let lastFocusedElement = null;

  function openModal(artisanId) {
    const artisan = artisanData[artisanId];

    if (!artisan) {
      return;
    }

    lastFocusedElement = document.activeElement;

    modalImage.src = artisan.image;
    modalImage.alt = `${artisan.name}, ${artisan.craft}`;
    modalName.textContent = artisan.name;
    modalCraft.textContent = artisan.craft;
    modalExperience.textContent = artisan.experience;
    modalAbout.textContent = artisan.about;
    modalSignature.textContent = artisan.signature;

    modal.hidden = false;
    document.body.classList.add("modal-open");

    modal.querySelector(".hastakala-artisan-modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  artisansSection
    .querySelectorAll(".hastakala-meet-artisans__profile-button")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openModal(button.dataset.artisan);
      });
    });

  artisansSection
    .querySelectorAll(".hastakala-meet-artisans__profile")
    .forEach((profile) => {
      profile.addEventListener("click", () => {
        openModal(profile.dataset.artisan);
      });

      profile.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(profile.dataset.artisan);
        }
      });
    });

  modal.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
