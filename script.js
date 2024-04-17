const createElement = () => {
  let ele = document.createElement("div");
  ele.style.padding = "1rem 2rem";
  ele.style.border = "1px solid red";
  ele.innerText = "this is a card";
  return ele;
};

const parent = document.getElementsByClassName("parent")[0];
parent.style.display = "flex";
parent.style.flexDirection = "column";
parent.style.gap = "2rem";

let lastChildObserver;

lastChildObserver = new IntersectionObserver(
  (entries, observer) => {
    const lastCard = entries[0];
    if (lastCard.isIntersecting) {
      generateElements();
      observer.unobserve(lastCard.target);
      const lastchild = document.querySelector(".parent > :last-child");
      lastChildObserver.observe(lastchild);
    }
  },
  {
    threshold: 1,
    // root: document.querySelector(".parent"),
    rootMargin: "20px 0px",
  }
);
generateElements();

const lastchild = document.querySelector(".parent > :last-child");
lastChildObserver.observe(lastchild);

function generateElements() {
  for (let i = 0; i < 10; i++) {
    const element = createElement();
    parent.appendChild(element);
  }
}

function updateStyle(target) {
  const colorValue = target.textContent.length > 20 ? "blue" : "red";
  target.parentElement.style.color = colorValue;
  target.parentElement.style.border = `1px solid ${colorValue}`;
}

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const entar = entry.target;
    updateStyle(entar);
  });
};

const mutationobs = new MutationObserver(callback);
const rightside = document.querySelector(".left-side-container");

document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  isSelectionInside =
    selection.rangeCount > 0 && selection.containsNode(rightside, true);
  if (isSelectionInside) {
    const colorValue = rightside.textContent.length > 20 ? "blue" : "red";
    rightside.style.color = colorValue;
    rightside.style.border = `1px solid ${colorValue}`;
  }
});

mutationobs.observe(rightside, {
  subtree: true,
  characterData: true,
});

const canvasContainer = document.getElementsByClassName("side-container");

let ctx = canvasContainer[0].getContext("2d");
ctx.fillStyle = "blue";

ctx.fillRect(3, 4, 200, 200);

const resizecallback = (entries, observer) => {
  entries.forEach((entry) => {
    ctx.fillStyle = entry.contentRect.width < 103 ? "green" : "blue";
    ctx.fillRect(3, 4, 200, 200);
  });
};

const resizeobs = new ResizeObserver(resizecallback);
resizeobs.observe(document.querySelector(".left-side-container"));
