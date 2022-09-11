let error = document.getElementById("error");
let errors = document.getElementById("errors");
let errorImage = document.getElementById("image-error");

let errorOctet = 0;
let blankForms = 0;

// shows error messages based on what octet needs to be changed
function errorDatabase(error) {
  if (error == firstIp) {
    return "The value in the first octet is wrong. Please insert a value between 0-255!";
  } else if (error == secondIp) {
    return "The value in the second octet is wrong. Please insert a value between 0-255!";
  } else if (error == thirdIp) {
    return "The value in the third octet is wrong. Please insert a value between 0-255!";
  } else if (error == forthIp) {
    return "The value in the forth octet is wrong. Please insert a value between 0-255!";
  } else if (error == subnetMask) {
    return "The value of the subnet address prefix is wrong. Please insert a value between 0-32!";
  }
}

// shows error and sends user to edit the invalid octet
function showError(fieldToFocus) {
  error.style.visibility = "visible";
  errorImage.style.visibility = "visible";
  error.innerText = errorDatabase(fieldToFocus);
  fieldToFocus.focus();
}

function checkIpValuesIfUnder(ipValueToCheck) {
  if (ipValueToCheck.value <= 255) {
    return "yes";
  } else {
    return "no";
  }
}

function checkSubnetValuesIfUnder(subValueToCheck) {
  if (subValueToCheck.value <= 32) {
    return "yes";
  } else {
    return "no";
  }
}

// when detecting an invalid value, it shows error and changes focus on the problematic octet
function checkForInvalidValues() {
  errorOctet = 0;

  for (let cfidRunner = 0; cfidRunner < 4; cfidRunner++) {
    checkIpValuesIfUnder(octetsDatabase[cfidRunner]) == "no"
      ? (errorOctet = octetsDatabase[cfidRunner])
      : "";

    checkSubnetValuesIfUnder(octetsDatabase[4]) == "no"
      ? (errorOctet = octetsDatabase[4])
      : "";

    if (errorOctet != 0) {
      showError(errorOctet);
      errorOctet.focus();
    } else {
      error.style.visibility = "hidden";
      errorImage.style.visibility = "hidden";
    }
  }
}
