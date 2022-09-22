var list = [1];
var reversedList = [];
var resultsArray = [];
var differenceArray = [];

let programRunTimes = 0;
let programRunClass = 0;
let secondaryArrayRunClass = 0;
let secondaryArrayRunTimes = 0;
let result = 0;
let difference = 0;
let doubleCheckValue = 0;
let numberDouble = 0;

let multipliersDiv = document.getElementById("multipliers");
let number = document.getElementById("userInput");
let binaryCodeDiv = document.getElementById("binary-code");
let error = document.getElementById("error");

function calculate() {
  if (number.value === "") {
    error.style.visibility = "visible";
    error.innerText = "Please input a number";
  } else if (number.value < 1) {
    error.style.visibility = "visible";
    error.innerText = "Please input a number greater than 0";
  } else {
    error.style.visibility = "hidden";

    // keeps the number input by user intact for final checkup
    numberDouble = number.value;

    createArray();
    createSecondArray();
  }

  // both divs need to be modified at user input, so the first time it creates the divs, and the second time it replaces the already existent divs
  if (programRunTimes < 1) {
    showArray();
    showSecondArray();
  } else {
    replaceArray();
    replaceSecondArray();
  }

  checkTheAnswer();
  programRunTimes++;
}

// double checks the conversion
function checkTheAnswer() {
  for (let ctaRunner = 1; ctaRunner < resultsArray.length; ctaRunner++) {
    if (resultsArray[ctaRunner] === 1) {
      doubleCheckValue += reversedList[ctaRunner];
    } else {
    }
  }

  console.log(
    (doubleCheckValue = number.value
      ? "The binary number is correct"
      : "The binary number is incorrect")
  );
}

function resetPage() {
  window.location.reload();
}

addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculate();
  }
});
