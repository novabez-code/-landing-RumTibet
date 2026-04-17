import {
  HTMLTravelCard,
  HTMLJourneyCard,
  renderCards,
  travelCardsData,
  journeyCardsData,
} from "./card.js";

document.addEventListener("DOMContentLoaded", function () {
  var splide1 = new Splide(".travel__slider", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    pagination: false,
    arrows: false,
    padding: "10%",
    gap: "20px",
    slideFocus: false,
    mediaQuery: "min",
    breakpoints: {
      768: {
        perPage: 2,
      },
      1100: {
        destroy: true,
      },
    },
  });
  splide1.mount();

  var splide2 = new Splide(".journey__slider", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    pagination: false,
    arrows: false,
    padding: "10%",
    gap: "20px",
    mediaQuery: "min",
    breakpoints: {
      768: {
        destroy: true,
      },
    },
  });

  splide2.mount();

  var splide3 = new Splide(".pinterest__slider", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    pagination: false,
    arrows: false,
    padding: "10%",
    gap: "20px",
    mediaQuery: "min",
    breakpoints: {
      768: {
        destroy: true,
      },
    },
  });

  splide3.mount();

  const gallery2 = document.getElementById("video-gallery-2");

  lightGallery(gallery2, {
    plugins: [lgVideo],
    speed: 500,
    zoom: false,
    selector: "a",
    licenseKey: "0000-0000-000-0000",
  });

  const gallery = document.getElementById("video-gallery-1");

  lightGallery(gallery, {
    plugins: [lgVideo],
    speed: 500,
    zoom: false,
    selector: "a, .explore__video--btn",
    licenseKey: "0000-0000-000-0000",
  });

  lightGallery(document.getElementById("lightgallery-img"), {
    speed: 500,
    selector: ".splide__slide > a",
    download: false,
    counter: true,
    mousewheel: true,
    licenseKey: "0000-0000-000-0000",
  });

  fixTravelFocusIssue();
  if (splide1) {
    splide1.on("move", () => {
      document
        .querySelectorAll(".travel__slider .btn")
        .forEach((btn) => btn.blur());
    });

    splide1.on("moved", () => {
      setTimeout(fixTravelFocusIssue, 30);
    });

    splide1.on("refresh", fixTravelFocusIssue);
  }

  const introForm = document.getElementById("intro-search-form");
  const newsletterForm = document.getElementById("newsletter-form");

  if (introForm) {
    introForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Поиск тура отправлен");
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Подписка на новости отправлена");
    });
  }

  renderCards(".travel__slider .splide__list", HTMLTravelCard, travelCardsData);
  renderCards(
    ".journey__slider .splide__list",
    HTMLJourneyCard,
    journeyCardsData,
  );

  function fixTravelFocusIssue() {
    const slides = document.querySelectorAll(".travel__slider .splide__slide");
    slides.forEach((slide) => {
      const buttons = slide.querySelectorAll(".btn, a");

      if (slide.classList.contains("is-active")) {
        slide.removeAttribute("inert");
        buttons.forEach((btn) => {
          btn.removeAttribute("tabindex");
          btn.removeAttribute("inert");
        });
      } else {
        slide.setAttribute("inert", "");
        buttons.forEach((btn) => {
          btn.setAttribute("tabindex", "-1");
          btn.setAttribute("inert", "");
        });
      }
    });
  }
});

const header = document.querySelector(".header");
const headerBurger = document.querySelector(".header__burger");
const navLinks = document.querySelectorAll(".header__item--link");

headerBurger.addEventListener("click", () => {
  header.classList.toggle("active");
  document.body.classList.toggle("lock");

  const isActive = header.classList.contains("active");
  headerBurger.setAttribute("aria-expanded", isActive);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("active");
    document.body.classList.remove("lock");
  });
});

const videoBlock = document.querySelectorAll(".explore__video--block");

videoBlock.forEach((block) => {
  block.addEventListener("click", () => {
    videoBlock.forEach((block) => {
      block.classList.remove("active");
    });
    block.classList.toggle("active");
  });
});

function fixSplideAriaHidden() {
  const splides = document.querySelectorAll(".splide");

  splides.forEach((splideEl) => {
    const slides = splideEl.querySelectorAll(".splide__slide");

    slides.forEach((slide) => {
      const buttons = slide.querySelectorAll("button, a");

      if (slide.classList.contains("is-active")) {
        buttons.forEach((btn) => btn.removeAttribute("tabindex"));
      } else {
        buttons.forEach((btn) => btn.setAttribute("tabindex", "-1"));
      }
    });
  });
}
