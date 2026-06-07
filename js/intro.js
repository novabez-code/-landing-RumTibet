const { computePosition, flip, shift, offset, autoUpdate, size } =
  FloatingUIDOM;

const btnP = document.querySelector("#travel-choice-btn");
const menuP = document.querySelector("#travel-choice-menu");
const sInputP = document.querySelector("#travel-choice");
const itemsP = menuP.querySelectorAll(".travel-choice-item");
let cleanTrackingP = null;

function moveMenuP() {
  computePosition(btnP, menuP, {
    placement: "bottom-start",
    middleware: [
      offset(0),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  }).then(({ x, y }) => {
    menuP.style.left = `${x}px`;
    menuP.style.top = `${y}px`;
  });
}

btnP.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menuP.style.display !== "block") {
    closeMenuPP();
    menuP.style.display = "block";
    btnP.classList.add("active");
    cleanTrackingP = autoUpdate(btnP, menuP, moveMenuP);
  } else {
    closeMenuP();
  }
});

itemsP.forEach((item) => {
  item.setAttribute("tabindex", "0");
  item.addEventListener("click", () => selectElemP(item));
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectElemP(item);
    }
  });
});

function selectElemP(item) {
  sInputP.value = item.getAttribute("data-tech");
  btnP.textContent = item.textContent;
  closeMenuP();
  btnP.focus();
}

function closeMenuP() {
  menuP.style.display = "none";
  btnP.classList.remove("active");
  if (cleanTrackingP) {
    cleanTrackingP();
    cleanTrackingP = null;
  }
}

const btnPP = document.querySelector("#travel-participants-btn");
const menuPP = document.querySelector("#travel-participants-menu");
const sInputPP = document.querySelector("#travel-participants");
const itemsPP = menuPP.querySelectorAll(".travel-participants-item");
let cleanTrackingPP = null;

function moveMenuPP() {
  computePosition(btnPP, menuPP, {
    placement: "bottom-start",
    middleware: [
      offset(0),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  }).then(({ x, y }) => {
    menuPP.style.left = `${x}px`;
    menuPP.style.top = `${y}px`;
  });
}

btnPP.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menuPP.style.display !== "block") {
    closeMenuP();
    menuPP.style.display = "block";
    btnPP.classList.add("active");
    cleanTrackingPP = autoUpdate(btnPP, menuPP, moveMenuPP);
  } else {
    closeMenuPP();
  }
});

itemsPP.forEach((item) => {
  item.setAttribute("tabindex", "0");
  item.addEventListener("click", () => selectElemPP(item));
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectElemPP(item);
    }
  });
});

function selectElemPP(item) {
  sInputPP.value = item.getAttribute("data-tech");
  btnPP.textContent = item.textContent;
  closeMenuPP();
  btnPP.focus();
}

function closeMenuPP() {
  menuPP.style.display = "none";
  btnPP.classList.remove("active");
  if (cleanTrackingPP) {
    cleanTrackingPP();
    cleanTrackingPP = null;
  }
}

document.addEventListener("click", () => {
  closeMenuP();
  closeMenuPP();
});

document.addEventListener("keydown", (e) => {
  const isMenuPOpen = menuP.style.display === "block";
  const isMenuPPOpen = menuPP.style.display === "block";

  if (e.key === "Escape") {
    if (isMenuPOpen) {
      closeMenuP();
      btnP.focus();
    }
    if (isMenuPPOpen) {
      closeMenuPP();
      btnPP.focus();
    }
    return;
  }

  if (e.key === "Tab") {
    if (isMenuPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsP[itemsP.length - 1];

      if (activeElement === lastItem && !e.shiftKey) {
        closeMenuP();
      }

      if (activeElement === btnP && e.shiftKey) {
        closeMenuP();
      }
    }

    if (isMenuPPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsPP[itemsPP.length - 1];

      if (activeElement === lastItem && !e.shiftKey) {
        closeMenuPP();
      }

      if (activeElement === btnPP && e.shiftKey) {
        closeMenuPP();
      }
    }
  }
});

flatpickr("#travel-data", {
  locale: "ru",
  mode: "range",
  dateFormat: "d.m.Y",
});
