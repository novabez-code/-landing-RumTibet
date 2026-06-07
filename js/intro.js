const { computePosition, flip, shift, offset, autoUpdate, size } =
  FloatingUIDOM;

// --- СЕЛЕКТОР 1 (Локации) ---
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
  btnP.focus(); // Возвращаем фокус на кнопку после выбора
}

function closeMenuP() {
  menuP.style.display = "none";
  btnP.classList.remove("active");
  if (cleanTrackingP) {
    cleanTrackingP();
    cleanTrackingP = null;
  }
}

// --- СЕЛЕКТОР 2 (Участники) ---
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
  btnPP.focus(); // Возвращаем фокус на кнопку после выбора
}

function closeMenuPP() {
  menuPP.style.display = "none";
  btnPP.classList.remove("active");
  if (cleanTrackingPP) {
    cleanTrackingPP();
    cleanTrackingPP = null;
  }
}

// --- НАДЕЖНОЕ УПРАВЛЕНИЕ КЛАВИАТУРОЙ И КЛИКАМИ ---

// Закрытие меню при клике в любое свободное место
document.addEventListener("click", () => {
  closeMenuP();
  closeMenuPP();
});

// Глобальный перехват клавиш (Tab и Escape) для закрытия
document.addEventListener("keydown", (e) => {
  const isMenuPOpen = menuP.style.display === "block";
  const isMenuPPOpen = menuPP.style.display === "block";

  // Закрытие по кнопке Escape
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

  // Контроль клавиши Tab
  if (e.key === "Tab") {
    // Если открыто первое меню
    if (isMenuPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsP[itemsP.length - 1];

      // Если мы нажали Tab на последнем элементе списка — закрываем меню
      if (activeElement === lastItem && !e.shiftKey) {
        closeMenuP();
      }
      // Если нажали Shift+Tab на кнопке — закрываем меню
      if (activeElement === btnP && e.shiftKey) {
        closeMenuP();
      }
    }

    // Если открыто второе меню
    if (isMenuPPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsPP[itemsPP.length - 1];

      // Если мы нажали Tab на последнем элементе списка — закрываем меню
      if (activeElement === lastItem && !e.shiftKey) {
        closeMenuPP();
      }
      // Если нажали Shift+Tab на кнопке — закрываем меню
      if (activeElement === btnPP && e.shiftKey) {
        closeMenuPP();
      }
    }
  }
});
