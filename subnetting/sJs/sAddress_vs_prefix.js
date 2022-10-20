let userSubnetFormChanges = 0;
let subnetMaskAnswer = document.getElementById("subnet-mask-answer");

// checks and returns if user has subnet mask address / prefix
function checkSubnettingChoice() {
  let subnettingChoice = "";
  let subnettingTypeChoice = document.getElementsByName("subnetChoice");

  for (
    let cscRunner = 0;
    cscRunner < subnettingTypeChoice.length;
    cscRunner++
  ) {
    if (subnettingTypeChoice[cscRunner].checked) {
      subnettingChoice = subnettingTypeChoice[cscRunner].value;
    }
  }

  return subnettingChoice;
}

// creates subnet mask forms based on user choice
function completeHtmlPage() {
  //complete answer table text based on user choice (address / prefix)
  checkSubnettingChoice() == "prefix"
    ? subnetMaskAnswer.setAttribute("lng-tag", "s-ans-sm-v1")
    : subnetMaskAnswer.setAttribute("lng-tag", "s-ans-sm-v2");

  //create div if subnet mask = prefix
  let subnetDivPrefix = document.createElement("div");
  subnetDivPrefix.setAttribute("id", "subnet-prefix");

  subnetMaskPrefix = document.createElement("input");
  subnetMaskPrefix.setAttribute("type", "number");
  subnetMaskPrefix.setAttribute("id", "subnet-mask");
  subnetMaskPrefix.setAttribute("min", "8");
  subnetMaskPrefix.setAttribute("max", "32");

  subnetDivPrefix.appendChild(subnetMaskPrefix);

  //create div if subnet mask = address
  let subnetDivAddress = document.createElement("div");
  subnetDivAddress.setAttribute("id", "subnet-address");

  let subnetMaskAddressA = document.createElement("input");
  subnetMaskAddressA.setAttribute("type", "number");
  subnetMaskAddressA.setAttribute("id", "subnet-mask-1");
  subnetMaskAddressA.setAttribute("min", "0");
  subnetMaskAddressA.setAttribute("max", "255");

  let betweenSubnetOctetsA = document.createElement("p");
  betweenSubnetOctetsA.innerText = ".";

  let betweenSubnetOctetsB = betweenSubnetOctetsA.cloneNode(true);
  let betweenSubnetOctetsC = betweenSubnetOctetsA.cloneNode(true);

  let subnetMaskAddressB = document.createElement("input");
  subnetMaskAddressB.setAttribute("type", "number");
  subnetMaskAddressB.setAttribute("id", "subnet-mask-2");
  subnetMaskAddressB.setAttribute("min", "0");
  subnetMaskAddressB.setAttribute("max", "255");

  let subnetMaskAddressC = document.createElement("input");
  subnetMaskAddressC.setAttribute("type", "number");
  subnetMaskAddressC.setAttribute("id", "subnet-mask-3");
  subnetMaskAddressC.setAttribute("min", "0");
  subnetMaskAddressC.setAttribute("max", "255");

  let subnetMaskAddressD = document.createElement("input");
  subnetMaskAddressD.setAttribute("type", "number");
  subnetMaskAddressD.setAttribute("id", "subnet-mask-4");
  subnetMaskAddressD.setAttribute("min", "0");
  subnetMaskAddressD.setAttribute("max", "255");

  subnetDivAddress.appendChild(subnetMaskAddressA);
  subnetDivAddress.appendChild(betweenSubnetOctetsA);
  subnetDivAddress.appendChild(subnetMaskAddressB);
  subnetDivAddress.appendChild(betweenSubnetOctetsB);
  subnetDivAddress.appendChild(subnetMaskAddressC);
  subnetDivAddress.appendChild(betweenSubnetOctetsC);
  subnetDivAddress.appendChild(subnetMaskAddressD);

  let subnetDiv = document.getElementById("prefix-vs-address");

  if (userSubnetFormChanges == 0) {
    if (checkSubnettingChoice() == "prefix") {
      subnetDiv.appendChild(subnetDivPrefix);
    } else if (checkSubnettingChoice() == "address") {
      subnetDiv.appendChild(subnetDivAddress);
    }
  } else {
    if (subnetDiv.hasChildNodes()) {
      subnetDiv.removeChild(subnetDiv.lastElementChild);
    }

    if (checkSubnettingChoice() == "prefix") {
      subnetDiv.appendChild(subnetDivPrefix);
    } else if (checkSubnettingChoice() == "address") {
      subnetDiv.appendChild(subnetDivAddress);
    }
    smAnswer.innerText = "";
    naAnswer.innerText = "";
    baAnswer.innerText = "";
    haAnswer.innerText = "";
    nnaaAnswer.innerText = "";
  }

  updateOctetsDatabase();
  populateShortcuts();

  userSubnetFormChanges++;

  // Update translation after user change.
  // After updating lng-tag in SubnettingPopulateFields
  // you have to do a new search in JSON for the new tag
  language = $("html").prop("lang");

  if (language == "en") {
    translateIframe("en", "lng-tag");
  } else if (language == "ro") {
    translateIframe("ro", "lng-tag");
  }
}
