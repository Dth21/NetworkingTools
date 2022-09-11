let doubleSubMask = document.getElementById("table-subnetmask").rows[0].cells;
let binarySubMask = document.getElementById("table-subnetmask").rows[1].cells;

let doubleNetwork = document.getElementById("table-ip-adress").rows[0].cells;
let binaryNetwork = document.getElementById("table-ip-adress").rows[1].cells;

let firstPartIp = "";
let lastPartIp = "";

let firstPartSubMask = "";
let lastPartSubMask = "";

let firstPartNetBroadVHAdd = "";
let firstPartNextNetwork = "";
let lastPartNextNetwork = "";
let lastPartNetAdd = "";
let lastPartBroadAdd = "";

let lastPartVH1 = "";
let lastPartVH2 = "";

let oldSubnetMaskValue = 0;

function populateSubnetMaskTable() {
  for (let psmtRunner = 0; psmtRunner < subnetMask.value; psmtRunner++) {
    binarySubMask[psmtRunner].innerHTML = 1;
  }

  console.log(oldSubnetMaskValue);

  if (programRunTimes < 1) {
    console.log("a");
    binarySubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
    doubleSubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  } else if (
    [programRunTimes >= 1 && oldSubnetMaskValue != 0 && oldSubnetMaskValue != 1]
  ) {
    console.log("b");
    binarySubMask[oldSubnetMaskValue - 1].style =
      "border-right-style: 1px solid;";
    doubleSubMask[oldSubnetMaskValue - 1].style =
      "border-right-style: 1px solid;";

    binarySubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
    doubleSubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  }
}

function populateNetworkTable() {
  for (let pntRunner = 0; pntRunner < 8; pntRunner++) {
    binaryNetwork[pntRunner].innerHTML = octetOne[pntRunner].binary;
  }
  for (pntRunner = 8; pntRunner < 16; pntRunner++) {
    binaryNetwork[pntRunner].innerHTML = octetTwo[pntRunner - 8].binary;
  }
  for (pntRunner = 16; pntRunner < 24; pntRunner++) {
    binaryNetwork[pntRunner].innerHTML = octetThree[pntRunner - 16].binary;
  }
  for (pntRunner = 24; pntRunner < 32; pntRunner++) {
    binaryNetwork[pntRunner].innerHTML = octetFour[pntRunner - 24].binary;
  }
  if (programRunTimes < 1) {
    binaryNetwork[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
    doubleNetwork[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  } else {
    binaryNetwork[oldSubnetMaskValue - 1].style =
      "border-right-style: 1px solid;";
    doubleNetwork[oldSubnetMaskValue - 1].style =
      "border-right-style: 1px solid;";

    binaryNetwork[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
    doubleNetwork[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  }

  oldSubnetMaskValue = subnetMask.value;
}

function populateSubnetMaskAnswer() {
  switch (octetToSubnet) {
    case 1:
      firstPartSubMask = "";
      lastPartSubMask = ".0.0.0";

      firstPartNetBroadVHAdd = "";
      lastPartNetAdd = ".0.0.0";

      isUnder == true
        ? (lastPartBroadAdd = ".255.255.255")
        : (lastPartBroadAdd = ".255.255.254");

      firstPartNextNetwork = firstPartNetBroadVHAdd;

      isUnder == true
        ? (lastPartNextNetwork = lastPartNetAdd)
        : (lastPartNextNetwork = ".255.255.255");

      lastPartVH1 = ".0.0.1";
      lastPartVH2 = ".255.255.254";
      break;

    case 2:
      firstPartSubMask = "255.";
      lastPartSubMask = ".0.0";

      firstPartNetBroadVHAdd = firstIp.value + ".";

      lastPartNetAdd = ".0.0";

      lastPartBroadAdd = ".255.255";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork = "" + (~~firstIp.value + 1) + ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = ".0.1";

      lastPartVH2 = ".255.254";
      break;

    case 3:
      firstPartSubMask = "255.255.";
      lastPartSubMask = ".0";

      firstPartNetBroadVHAdd = firstIp.value + "." + secondIp.value + ".";
      lastPartNetAdd = ".0";
      lastPartBroadAdd = ".255";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork =
            firstIp.value + "." + (~~secondIp.value + 1) + ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = ".1";
      lastPartVH2 = ".254";
      break;

    case 4:
      firstPartSubMask = "255.255.255.";
      lastPartSubMask = "";

      firstPartNetBroadVHAdd =
        firstIp.value + "." + secondIp.value + "." + thirdIp.value + ".";
      lastPartNetAdd = "";
      lastPartBroadAdd = "";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork =
            firstIp.value +
            "." +
            secondIp.value +
            "." +
            (~~thirdIp.value + 1) +
            ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = "";
      lastPartVH2 = "";

      break;
  }

  smAnswer.innerText = firstPartSubMask + octetSubnetMask + lastPartSubMask;
  naAnswer.innerText =
    firstPartNetBroadVHAdd + octetNetworkAddress + lastPartNetAdd;
  baAnswer.innerText =
    firstPartNetBroadVHAdd + octetBroadcastAddress + lastPartBroadAdd;
  if (octetToSubnet == 4) {
    haAnswer.innerText =
      firstPartNetBroadVHAdd +
      (octetNetworkAddress + 1) +
      lastPartVH1 +
      " - " +
      firstPartNetBroadVHAdd +
      (octetBroadcastAddress - 1) +
      lastPartVH2;
  } else {
    haAnswer.innerText =
      firstPartNetBroadVHAdd +
      octetNetworkAddress +
      lastPartVH1 +
      " - " +
      firstPartNetBroadVHAdd +
      octetBroadcastAddress +
      lastPartVH2;
  }
  octetNextNetworkAddress == 256
    ? (nnaaAnswer.innerHTML = "N/A")
    : (nnaaAnswer.innerHTML =
        firstPartNextNetwork + octetNextNetworkAddress + lastPartNextNetwork);
}

function populateFields0Subnet() {
  for (let psmtf0sRunner = 0; psmtf0sRunner < 32; psmtf0sRunner++) {
    binarySubMask[psmtf0sRunner].innerHTML = 0;
  }

  for (let pntf0sRunner = 0; pntf0sRunner < 8; pntf0sRunner++) {
    binaryNetwork[pntf0sRunner].innerHTML = octetOne[pntf0sRunner].binary;
  }
  for (pntf0sRunner = 8; pntf0sRunner < 16; pntf0sRunner++) {
    binaryNetwork[pntf0sRunner].innerHTML = octetTwo[pntf0sRunner - 8].binary;
  }
  for (pntf0sRunner = 16; pntf0sRunner < 24; pntf0sRunner++) {
    binaryNetwork[pntf0sRunner].innerHTML =
      octetThree[pntf0sRunner - 16].binary;
  }
  for (pntf0sRunner = 24; pntf0sRunner < 32; pntf0sRunner++) {
    binaryNetwork[pntf0sRunner].innerHTML = octetFour[pntf0sRunner - 24].binary;
  }

  smAnswer.innerText = "0.0.0.0";
  naAnswer.innerText = "0.0.0.0";
  baAnswer.innerText = "255.255.255.255";
  haAnswer.innerText = "0.0.0.1 - 255.255.255.254";
  nnaaAnswer.innerText = "255.255.255.255";

  oldSubnetMaskValue = subnetMask.value;
}

function populateField32Subnet() {
  for (
    let psmtf32sRunner = 0;
    psmtf32sRunner < subnetMask.value;
    psmtf32sRunner++
  ) {
    binarySubMask[psmtf32sRunner].innerHTML = 1;
  }

  for (let pntf32sRunner = 0; pntf32sRunner < 8; pntf32sRunner++) {
    binaryNetwork[pntf32sRunner].innerHTML = octetOne[pntf32sRunner].binary;
  }
  for (pntf32sRunner = 8; pntf32sRunner < 16; pntf32sRunner++) {
    binaryNetwork[pntf32sRunner].innerHTML = octetTwo[pntf32sRunner - 8].binary;
  }
  for (pntf32sRunner = 16; pntf32sRunner < 24; pntf32sRunner++) {
    binaryNetwork[pntf32sRunner].innerHTML =
      octetThree[pntf32sRunner - 16].binary;
  }
  for (pntf32sRunner = 24; pntf32sRunner < 32; pntf32sRunner++) {
    binaryNetwork[pntf32sRunner].innerHTML =
      octetFour[pntf32sRunner - 24].binary;
  }

  smAnswer.innerText =
    firstIp.value +
    "." +
    secondIp.value +
    "." +
    thirdIp.value +
    "." +
    forthIp.value;
  naAnswer.innerText =
    firstIp.value +
    "." +
    secondIp.value +
    "." +
    thirdIp.value +
    "." +
    forthIp.value;
  baAnswer.innerText =
    firstIp.value +
    "." +
    secondIp.value +
    "." +
    thirdIp.value +
    "." +
    forthIp.value;
  haAnswer.innerText = "N/A";
  nnaaAnswer.innerText = "N/A";

  oldSubnetMaskValue = subnetMask.value;
}
