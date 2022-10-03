var list = [1];
var reversedList = [];
var resultsArray = [];
var differenceArray = [];

let multipliersDiv = document.getElementById("multipliers");
let number = document.getElementById("userInput");
let error = document.getElementById("error");

let doubleCheckValue = 0;

function calculate() {
  // keeps the number input by user intact for final checkup
  let solution = document.getElementById("converted-number");
  let binary = "";

  numberDouble = number.value;
  createArray();
  createSolutionArray();

  for (cRunner = 0; cRunner < resultsArray.length; cRunner++) {
    binary += resultsArray[cRunner];
  }

  solution.innerText = binary;

  checkTheAnswer();
}

// double checks the conversion
function checkTheAnswer() {
  for (let ctaRunner = 1; ctaRunner < resultsArray.length; ctaRunner++) {
    resultsArray[ctaRunner] === 1
      ? (doubleCheckValue += reversedList[ctaRunner])
      : "";
  }

  console.log(
    (doubleCheckValue = number.value
      ? "The binary number is correct"
      : "The binary number is incorrect")
  );
}

addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculate();

    console.log("Enter was pressed");
  }
});
