let numberDouble = 0;
let doubleCheckValue = 0;

let number = document.getElementById("userInput");

function calculate() {
  if (number.value != 0) {
    numberDouble = number.value; // keeps the number input by user intact for final checkup

    convertDecimalToBinary(numberDouble);

    let solution = document.getElementById("solution");
    solution.innerText = "";

    let binary = "";

    for (let cRunner = 1; cRunner < resultsArray.length; cRunner++) {
      binary += resultsArray[cRunner];
    }

    solution.setAttribute("value", binary);

    checkTheAnswer();
  } else {
  }
}

// double checks the conversion
function checkTheAnswer() {
  for (let ctaRunner = 1; ctaRunner <= resultsArray.length; ctaRunner++) {
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
  }
});
