// shows lower part information when hovering over botton page question mark
function showShortcuts(shown) {
  informations = document.getElementById("text");
  if (shown == true) {
    informations.style.visibility = "visible";
  } else if (shown == false) {
    informations.style.visibility = "hidden";
  }
}

//checks which field is being edited by user. used for shotcuts
function checkActiveField() {
  formField = document.activeElement;
}

//checks which field is being edited by user. used for shotcuts
function eventListenerNextInputField() {
  if (formField == updateOctetsDatabase()[0]) {
    updateOctetsDatabase()[1].focus();
  } else if (formField == updateOctetsDatabase()[1]) {
    updateOctetsDatabase()[2].focus();
  } else if (formField == updateOctetsDatabase()[2]) {
    updateOctetsDatabase()[3].focus();
  }
}

// shotcuts
// enter runs the program
addEventListener("keypress", function (a) {
  if (a.key === "Enter") {
    console.log("Enter was pressed");
    if (
      checkIpValuesIfUnder(updateOctetsDatabase()[0]) == "yes" &&
      checkIpValuesIfUnder(updateOctetsDatabase()[1]) == "yes" &&
      checkIpValuesIfUnder(updateOctetsDatabase()[2]) == "yes" &&
      checkIpValuesIfUnder(updateOctetsDatabase()[3]) == "yes"
    ) {
      runProgram();
    } else {
      checkForInvalidValues();
    }
  }
});

// pressing dot key when editing ip address >> next field/octet
addEventListener("keypress", function (b) {
  if (b.key === ".") {
    b.preventDefault();
    console.log(". was pressed");
    eventListenerNextInputField();
  }
});

// pressing / anywhere on page >> edit subnet mask prefix
addEventListener("keypress", function (c) {
  if (c.key === "/") {
    c.preventDefault();
    console.log("/ was pressed");
    updateOctetsDatabase()[5].focus();
  }
});

// press Shift + 1-4 anywhere on page >> edit that specific octet in the IP Address
addEventListener("keypress", function (d) {
  if (d.shiftKey && d.code === "Digit1") {
    d.preventDefault();
    console.log("Shift+1 was pressed");
    updateOctetsDatabase()[0].focus();
  } else if (d.shiftKey && d.code === "Digit2") {
    d.preventDefault();
    console.log("Shift+2 was pressed");
    updateOctetsDatabase()[1].focus();
  } else if (d.shiftKey && d.code === "Digit3") {
    d.preventDefault();
    console.log("Shift+3 was pressed");
    updateOctetsDatabase()[2].focus();
  } else if (d.shiftKey && d.code === "Digit4") {
    d.preventDefault();
    console.log("Shift+4 was pressed");
    updateOctetsDatabase()[3].focus();
  }

  if (checkSubnettingChoice() == "address") {
    if (d.shiftKey && d.code === "Digit5") {
      d.preventDefault();
      console.log("Shift+5 was pressed");
      updateOctetsDatabase()[5].focus();
    }
    if (d.shiftKey && d.code === "Digit6") {
      d.preventDefault();
      console.log("Shift+6 was pressed");
      updateOctetsDatabase()[6].focus();
    }
    if (d.shiftKey && d.code === "Digit7") {
      d.preventDefault();
      console.log("Shift+7 was pressed");
      updateOctetsDatabase()[7].focus();
    }
    if (d.shiftKey && d.code === "Digit8") {
      d.preventDefault();
      console.log("Shift+8 was pressed");
      updateOctetsDatabase()[8].focus();
    }
  }

  checkActiveField();
});
