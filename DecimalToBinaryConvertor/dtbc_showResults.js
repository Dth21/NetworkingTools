// displays the first div
function showArray() {
  programRunClass = programRunTimes;
  let programRunDiv = document.createElement("div");
  programRunDiv.setAttribute("id", programRunClass);
  programRunDiv.setAttribute(
    "style",
    "  width: 100%; display: flex; flex-direction: row; align-content: center; justify-content: space-evenly; align-items: center;"
  );
  for (let saRunner = 1; saRunner < reversedList.length; saRunner++) {
    let numberDiv = document.createElement("div");
    numberDiv.innerText = reversedList[saRunner];
    numberDiv.setAttribute("class", "number-" + saRunner);
    programRunDiv.appendChild(numberDiv);
  }
  multipliersDiv.appendChild(programRunDiv);
}

// displays div with the result, in this case the binary code
function showSecondArray() {
  secondaryArrayRunClass = secondaryArrayRunTimes;
  let secondaryArrayRunDiv = document.createElement("div");
  secondaryArrayRunDiv.setAttribute("id", secondaryArrayRunClass);
  secondaryArrayRunDiv.setAttribute(
    "style",
    "  width: 100%; display: flex; flex-direction: row; align-content: center; justify-content: space-evenly; align-items: center;"
  );
  for (let ssaRunner = 1; ssaRunner < resultsArray.length; ssaRunner++) {
    let resultsDiv = document.createElement("div");
    resultsDiv.innerText = resultsArray[ssaRunner];
    resultsDiv.setAttribute("class", "binaryCode-" + ssaRunner);
    secondaryArrayRunDiv.appendChild(resultsDiv);
  }
  binaryCodeDiv.appendChild(secondaryArrayRunDiv);
}

// replace first div
function replaceArray() {
  let oldProgramRunDiv = document.getElementById(programRunClass);
  let newProgramRunDiv = document.createElement("div");
  let newProgramRunClass = programRunClass + 1;

  newProgramRunDiv.setAttribute("id", newProgramRunClass);
  newProgramRunDiv.setAttribute(
    "style",
    "  width: 100%; display: flex; flex-direction: row; align-content: center; justify-content: space-evenly; align-items: center;"
  );
  for (let raRunner = 1; raRunner < reversedList.length; raRunner++) {
    let newNumberDiv = document.createElement("div");
    newNumberDiv.innerText = reversedList[raRunner];
    newNumberDiv.setAttribute("class", "number-" + raRunner);
    newProgramRunDiv.appendChild(newNumberDiv);
  }
  programRunClass++;
  multipliersDiv.replaceChild(newProgramRunDiv, oldProgramRunDiv);
}

// replace the second div with the new calculated values
function replaceSecondArray() {
  let oldSecondaryArrayRunDiv = document.getElementById(secondaryArrayRunClass);
  let newSecondaryArrayRunDiv = document.createElement("div");
  let newSecondaryArrayRunClass = secondaryArrayRunClass + 1;
  newSecondaryArrayRunDiv.setAttribute("id", newSecondaryArrayRunClass);
  newSecondaryArrayRunDiv.setAttribute(
    "style",
    "  width: 100%; display: flex; flex-direction: row; align-content: center; justify-content: space-evenly; align-items: center;"
  );

  for (let rsaRunner = 1; rsaRunner < resultsArray.length; rsaRunner++) {
    let newSecondaryResultsDiv = document.createElement("div");
    newSecondaryResultsDiv.innerText = resultsArray[rsaRunner];
    newSecondaryResultsDiv.setAttribute("class", "binaryCode-" + rsaRunner);
    newSecondaryArrayRunDiv.appendChild(newSecondaryResultsDiv);
  }

  secondaryArrayRunClass++;
  binaryCodeDiv.replaceChild(newSecondaryArrayRunDiv, oldSecondaryArrayRunDiv);
}
