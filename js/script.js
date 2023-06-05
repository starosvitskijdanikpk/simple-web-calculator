const historyDisplay = document.getElementById("history");
const resultDisplay = document.getElementById("result");

let history = "";
let currentNumber = "0";
let operator = "";
let resetDisplay = false;

function updateDisplay() {
  historyDisplay.textContent = history;
  resultDisplay.textContent = currentNumber;
}

function numberClick(number) {
    if (resetDisplay) {
        currentNumber = "";
        resetDisplay = false;
    }
    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    updateDisplay();
}

function operatorClick(op) {
    if (operator !== "") {
        if (currentNumber !== "") {
          calculate();
        } 
        else {
          history = history.slice(0, -1);
        }
      }
      operator = op;
      if (currentNumber !== "") {
        history += currentNumber;
        currentNumber = "";
      }
      history += operator;
      updateDisplay();
}

function calculate() {
  const num1 = parseFloat(history);
  const num2 = parseFloat(currentNumber);
  let result = 0;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "%":
      result = (num1 / 100) * num2;
      break;
  }
  currentNumber = result.toString();
  history = "";
  operator = "";
  resetDisplay = true;
  updateDisplay();
}

function equalClick() {
  if (operator !== "") {
    if (currentNumber !== "") {
      history += currentNumber;
    }
    calculate();
  }
}

function otherClick(action) {
    switch (action) {
        case "C":
            history = "";
            currentNumber = "0";
            operator = "";
            resetDisplay = false;
            break;
        case "+/-":
            currentNumber = (parseFloat(currentNumber) * -1).toString();
            break;
        case ".":
            if (currentNumber === "") {
                currentNumber = "0.";
            } else if (currentNumber === "0") {
                currentNumber += ".";
            } else if (!currentNumber.includes(".")) {
                currentNumber += ".";
            }
            break;
    }
    updateDisplay();
}

const buttons = document.getElementsByClassName("button");
for (const button of buttons) {
  button.addEventListener("click", function () {
    const value = this.textContent;
    if (!isNaN(value) || value === ".") {
      numberClick(value);
    } else if (value === "=") {
      equalClick();
    } else {
      operatorClick(value);
    }
  });
}
const otherButtons = document.getElementsByClassName("operator");
for (const button of otherButtons) {
  button.addEventListener("click", function () {
    const action = this.textContent;
    otherClick(action);
  });
}
updateDisplay();