let error = document.getElementById("error");
let errorImage = document.getElementById("image-error");

let errorOctet = 0;

// shows error messages based on what octet needs to be changed
function errorDatabase(error) {
  if (error == updateOctetsDatabase()[0]) {
    return "The value of the first octet is wrong. Please insert a value between 0-255!";
  } else if (error == updateOctetsDatabase()[1]) {
    return "The value of the second octet is wrong. Please insert a value between 0-255!";
  } else if (error == updateOctetsDatabase()[2]) {
    return "The value  the third octet is wrong. Please insert a value between 0-255!";
  } else if (error == updateOctetsDatabase()[3]) {
    return "The value of the forth octet is wrong. Please insert a value between 0-255!";
  } else if (error == updateOctetsDatabase()[4]) {
    return "The value of the subnet address prefix is wrong. Please insert a value between 0-32!";
  } else if (error == updateOctetsDatabase()[5]) {
    return "The value of the first octet of subnet mask address is wrong.";
  } else if (error == updateOctetsDatabase()[6]) {
    return "The value of the second octet of subnet mask address is wrong.";
  } else if (error == updateOctetsDatabase()[7]) {
    return "The value of the third octet of subnet mask address is wrong.";
  } else if (error == updateOctetsDatabase()[8]) {
    return "The value of the forth octet of subnet mask address is wrong.";
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

function checkSubnetPrefixIfUnder(subPrefixToCheck) {
  if (subPrefixToCheck.value <= 32) {
    return "yes";
  } else {
    return "no";
  }
}

function checkSubnetValuesIfUnder(subValueToCheck) {
  if (
    createPossibleOctetSubnetMaskDb().includes(subValueToCheck.value) ||
    subValueToCheck.value == ""
  ) {
    return "yes";
  } else {
    return "no";
  }
}

// when detecting an invalid value, it shows error and changes focus on the problematic octet
function checkForInvalidValues() {
  errorOctet = 0;

  for (let cfivRunnerA = 0; cfivRunnerA < 4; cfivRunnerA++) {
    checkIpValuesIfUnder(updateOctetsDatabase()[cfivRunnerA]) == "no"
      ? (errorOctet = updateOctetsDatabase()[cfivRunnerA])
      : "";
  }

  if (checkSubnettingChoice() == "prefix") {
    checkSubnetPrefixIfUnder(updateOctetsDatabase()[4]) == "no"
      ? (errorOctet = updateOctetsDatabase()[4])
      : "";
  } else {
    for (let cfivRunnerB = 5; cfivRunnerB <= 8; cfivRunnerB++) {
      checkSubnetValuesIfUnder(updateOctetsDatabase()[cfivRunnerB]) == "no"
        ? (errorOctet = updateOctetsDatabase()[cfivRunnerB])
        : "";
    }
  }

  if (errorOctet != 0) {
    showError(errorOctet);
    errorOctet.focus();
  } else {
    error.style.visibility = "hidden";
    errorImage.style.visibility = "hidden";
  }
}
