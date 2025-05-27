const screenTop = document.querySelector(".screen-top");
const screenBottom = document.querySelector(".screen-bottom");
let historyList = [];

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  switch (key) {
    case "Enter":
      calculate();
      break;
    case "Backspace":
      backSpace();
      break;
    case "Delete":
      clearDisplay();
      break;
    default:
      displayData(key);
  }
});

// Handle button clicks using event delegation
document.addEventListener("click", (event) => {
  const { value } = event.target;

  if (!value) return;

  switch (value) {
    case "AC":
      clearDisplay();
      break;
    case "C":
      backSpace();
      break;
    case "=":
      calculate();
      break;
    default:
      displayData(value);
  }

  event.target.disabled = true;
  event.target.disabled = false;
});

const displayData = (key) => {
  const input = screenTop.value + key;
  const filtered = input.replace(/[^0-9\.\+\-\*\/%]/g, "");

  screenTop.value = filtered;
  autoScrollTop();
};

const calculate = () => {
  const expression = screenTop.value;

  try {
    const result = eval(expression);

    if (expression !== result.toString()) {
      screenTop.value = result;
      historyList.push(`${expression} = ${result}`);
      updateHistory();
    } else {
      screenTop.value = "";
    }
  } catch (e) {
    screenTop.value = "Error";
  }
};

const backSpace = () => {
  screenTop.value = screenTop.value.slice(0, -1);
};

const clearDisplay = () => {
  screenTop.value = "";
  screenBottom.innerHTML = "";
  historyList = [];
};

const updateHistory = () => {
  screenBottom.innerHTML = "";
  historyList.slice(-3).forEach((entry) => {
    const span = document.createElement("span");
    span.innerText = `${entry}`;
    screenBottom.appendChild(span);
  });
  autoScrollBottom();
};

const autoScrollTop = () => {
  screenTop.scrollLeft = screenTop.scrollWidth;
};

const autoScrollBottom = () => {
  screenBottom.scrollTop = screenBottom.scrollHeight;
};
