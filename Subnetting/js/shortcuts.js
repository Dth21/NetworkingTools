//checks which field is being edited by user. used for shotcuts

function checkActiveField() {
  formField = document.activeElement;
}

//checks which field is being edited by user. used for shotcuts
function eventListenerNextInputField() {
  if (formField == firstIp) {
    secondIp.focus();
  } else if (formField == secondIp) {
    thirdIp.focus();
  } else if (formField == thirdIp) {
    forthIp.focus();
  }
}

// shotcuts
// enter runs the program
addEventListener("keypress", function (a) {
  if (a.key === "Enter") {
    console.log("Enter was pressed");
    if (
      checkIpValuesIfUnder(firstIp) == "yes" &&
      checkIpValuesIfUnder(secondIp) == "yes" &&
      checkIpValuesIfUnder(thirdIp) == "yes" &&
      checkIpValuesIfUnder(forthIp) == "yes"
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
    subnetMask.focus();
  }
});

// press Shift + 1-4 anywhere on page >> edit that specific octet in the IP Address
addEventListener("keypress", function (d) {
  if (d.shiftKey && d.code === "Digit1") {
    d.preventDefault();
    console.log("Shift+1 was pressed");
    firstIp.focus();
  } else if (d.shiftKey && d.code === "Digit2") {
    d.preventDefault();
    console.log("Shift+2 was pressed");
    secondIp.focus();
  } else if (d.shiftKey && d.code === "Digit3") {
    d.preventDefault();
    console.log("Shift+3 was pressed");
    thirdIp.focus();
  } else if (d.shiftKey && d.code === "Digit4") {
    d.preventDefault();
    console.log("Shift+4 was pressed");
    forthIp.focus();
  }

  checkActiveField();
});
