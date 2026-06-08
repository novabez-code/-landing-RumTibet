import {
  HTMLTravelCard,
  HTMLJourneyCard,
  renderCards,
  travelCardsData,
  journeyCardsData,
} from "./card.js";

document.addEventListener("DOMContentLoaded", function () {
  renderCards(".travel__slider .splide__list", HTMLTravelCard, travelCardsData);
  renderCards(
    ".journey__slider .splide__list",
    HTMLJourneyCard,
    journeyCardsData,
  );

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
      768: { perPage: 2 },
      1100: { destroy: true },
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
    slideFocus: false,
    mediaQuery: "min",
    breakpoints: {
      768: { destroy: true },
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
    slideFocus: false,
    mediaQuery: "min",
    breakpoints: {
      768: { destroy: true },
    },
  });
  splide3.mount();

  // Клоны Splide не должны быть фокусируемы
  document.querySelectorAll(".splide__slide--clone").forEach((clone) => {
    clone.setAttribute("inert", "");
  });

  function fixAriaHiddenFocus(splideEl) {
    // Все слайды с aria-hidden="true" делаем inert — это и убирает фокус и закрывает варнинг
    splideEl
      .querySelectorAll('.splide__slide[aria-hidden="true"]')
      .forEach((slide) => {
        slide.setAttribute("inert", "");
      });
    // Активные слайды — убираем inert
    splideEl
      .querySelectorAll(
        '.splide__slide[aria-hidden="false"], .splide__slide.is-active',
      )
      .forEach((slide) => {
        slide.removeAttribute("inert");
      });
  }

  [splide1, splide2, splide3].forEach((splide) => {
    const el = splide.root;

    fixAriaHiddenFocus(el);

    splide.on("moved", () => {
      setTimeout(() => fixAriaHiddenFocus(el), 50);
    });

    splide.on("destroy", () => {
      el.querySelectorAll(".splide__slide").forEach((slide) => {
        slide.removeAttribute("inert");
      });
    });
  });

  // ─── lightGallery ───────────────────────────────────────

  lightGallery(document.getElementById("video-gallery-2"), {
    plugins: [lgVideo],
    speed: 500,
    zoom: false,
    selector: "a",
    licenseKey: "0000-0000-000-0000",
  });

  lightGallery(document.getElementById("video-gallery-1"), {
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

  // ─── Формы ──────────────────────────────────────────────

  const introForm = document.getElementById("intro-search-form");
  if (introForm) {
    introForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formInfo = Object.fromEntries(new FormData(introForm).entries());
      if (!formInfo["travel-choice"]) formInfo["travel-choice"] = "Неважно";
      if (!formInfo["travel-data"]) formInfo["travel-data"] = "Неважно";
      if (!formInfo["travel-participants"])
        formInfo["travel-participants"] = "Неважно";
      console.log(
        `Поиск: ${formInfo["travel-choice"]} / ${formInfo["travel-data"]} / ${formInfo["travel-participants"]} участников`,
      );
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Подписка на новости отправлена");
    });
  }
});

// ─── Хедер ────────────────────────────────────────────────

const header = document.querySelector(".header");
const headerBurger = document.querySelector(".header__burger");

if (headerBurger) {
  headerBurger.addEventListener("click", () => {
    header.classList.toggle("active");
    document.body.classList.toggle("lock");
    headerBurger.setAttribute(
      "aria-expanded",
      header.classList.contains("active"),
    );
  });
}

document.querySelectorAll(".header__item--link").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("active");
    document.body.classList.remove("lock");
  });
});

// ─── Видео блок ───────────────────────────────────────────

const videoBlock = document.querySelectorAll(".explore__video--block");
videoBlock.forEach((block) => {
  block.addEventListener("click", () => {
    videoBlock.forEach((b) => b.classList.remove("active"));
    block.classList.toggle("active");
  });
});
