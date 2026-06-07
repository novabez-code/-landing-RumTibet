const { computePosition, flip, shift, offset, autoUpdate, size } =
  FloatingUIDOM;

const btnP = document.querySelector("#travel-choice-btn");
const menuP = document.querySelector("#travel-choice-menu");
const sInputP = document.querySelector("#travel-choice");
const itemsP = menuP.querySelectorAll(".travel-choice-item");

const btnPP = document.querySelector("#travel-participants-btn");
const menuPP = document.querySelector("#travel-participants-menu");
const sInputPP = document.querySelector("#travel-participants");
const itemsPP = menuPP.querySelectorAll(".travel-participants-item");

const trackingState = {
  P: null,
  PP: null,
};

function moveMenu(menu, btn) {
  computePosition(btn, menu, {
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
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  });
}
function closeMenu(menu, btn, stateKey) {
  menu.style.display = "none";
  btn.classList.remove("active");
  if (trackingState[stateKey]) {
    trackingState[stateKey]();
    trackingState[stateKey] = null;
  }
}
function selectElem(item, input, btn, menu, stateKey) {
  input.value = item.getAttribute("data-tech");
  btn.textContent = item.textContent;
  closeMenu(menu, btn, stateKey);
  btn.focus();
}
function addEBtn(btn, btn2, menu, menu2, currentKey, otherKey) {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (menu.style.display !== "block") {
      closeMenu(menu2, btn2, otherKey);
      menu.style.display = "block";
      btn.classList.add("active");
      trackingState[currentKey] = autoUpdate(btn, menu, () =>
        moveMenu(menu, btn),
      );
    } else {
      closeMenu(menu, btn, currentKey);
    }
  });
}
function addEItem(i, btn, menu, input, stateKey) {
  i.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () =>
      selectElem(item, input, btn, menu, stateKey),
    );
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectElem(item, input, btn, menu, stateKey);
      }
    });
  });
}

moveMenu(menuP, btnP);
addEBtn(btnP, btnPP, menuP, menuPP, "P", "PP");
addEItem(itemsP, btnP, menuP, sInputP, "P");

moveMenu(menuPP, btnPP);
addEBtn(btnPP, btnP, menuPP, menuP, "PP", "P");
addEItem(itemsPP, btnPP, menuPP, sInputPP, "PP");

document.addEventListener("click", () => {
  closeMenu(menuP, btnP, "P");
  closeMenu(menuPP, btnPP, "PP");
});

document.addEventListener("keydown", (e) => {
  const isMenuPOpen = menuP.style.display === "block";
  const isMenuPPOpen = menuPP.style.display === "block";

  if (e.key === "Escape") {
    if (isMenuPOpen) {
      closeMenu(menuP, btnP, "P");
      btnP.focus();
    }
    if (isMenuPPOpen) {
      closeMenu(menuPP, btnPP, "PP");
      btnPP.focus();
    }
    return;
  }

  if (e.key === "Tab") {
    if (isMenuPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsP[itemsP.length - 1];

      if (activeElement === lastItem && !e.shiftKey) {
        closeMenu(menuP, btnP, "P");
      }

      if (activeElement === btnP && e.shiftKey) {
        closeMenu(menuP, btnP, "P");
      }
    }

    if (isMenuPPOpen) {
      const activeElement = document.activeElement;
      const lastItem = itemsPP[itemsPP.length - 1];

      if (activeElement === lastItem && !e.shiftKey) {
        closeMenu(menuPP, btnPP, "PP");
      }

      if (activeElement === btnPP && e.shiftKey) {
        closeMenu(menuPP, btnPP, "PP");
      }
    }
  }
});

flatpickr("#travel-data", {
  locale: "ru",
  mode: "range",
  dateFormat: "d.m.Y",
});
