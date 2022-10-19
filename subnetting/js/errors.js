let error = document.getElementById("error");
let errorImage = document.getElementById("image-error");

let errorOctet = 0;

// shows error messages based on what octet needs to be changed
function errorDatabase(error) {
  if (error == updateOctetsDatabase()[0]) {
    // return "The value of the first octet is wrong. Please insert a value between 0-255!";
    return "s-error-0";
  } else if (error == updateOctetsDatabase()[1]) {
    return "s-error-1";
  } else if (error == updateOctetsDatabase()[2]) {
    return "s-error-2";
  } else if (error == updateOctetsDatabase()[3]) {
    return "s-error-3";
  } else if (error == updateOctetsDatabase()[4]) {
    return "s-error-4";
  } else if (error == updateOctetsDatabase()[5]) {
    return "s-error-5";
  } else if (error == updateOctetsDatabase()[6]) {
    return "s-error-6";
  } else if (error == updateOctetsDatabase()[7]) {
    return "s-error-7";
  } else if (error == updateOctetsDatabase()[8]) {
    return "s-error-8";
  }
}

// shows error and sends user to edit the invalid octet
function showError(fieldToFocus) {
  error.style.visibility = "visible";
  errorImage.style.visibility = "visible";
  error.setAttribute("lng-tag", errorDatabase(fieldToFocus));

  // Update translation after user change.
  // After updating lng-tag in SubnettingPopulateFields
  // you have to do a new search in JSON for the new tag
  language = $("html").prop("lang");

  if (language == "en") {
    translateIframe("en", "lng-tag");
  } else if (language == "ro") {
    translateIframe("ro", "lng-tag");
  }

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
