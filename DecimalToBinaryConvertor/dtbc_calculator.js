// it creates the first set of values based on this formula: b=a*2 and then it reverses the list to be displayed
function convertDecimalToBinary(numberDouble) {
  createArray();
  createSolutionArray();
}

function createArray() {
  list = [1];
  reversedList = [];
  let double = 1;

  do {
    double = double * 2;
    list.push(double);
  } while (double <= numberDouble);

  for (let caRunner = list.length - 1; caRunner >= 0; caRunner--) {
    reversedList.push(list[caRunner]);
  }
}

// it calculates the binary code sending it into an array
function createSolutionArray() {
  resultsArray = [];
  differenceArray = [];
  for (let csaRunner = 0; csaRunner < reversedList.length; csaRunner++) {
    if (reversedList[csaRunner] <= numberDouble) {
      result = 1;
    } else {
      result = 0;
    }
    if (result === 1) {
      difference = numberDouble - reversedList[csaRunner];
      numberDouble = difference;
    } else {
      difference = numberDouble;
    }
    resultsArray.push(result);
    differenceArray.push(difference);
  }
}
