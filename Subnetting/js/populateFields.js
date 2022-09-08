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

  if (programRunTimes < 1) {
    binarySubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
    doubleSubMask[subnetMask.value - 1].style =
      "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  } else {
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
  console.log(234, firstIp.value, secondIp.value, thirdIp.value, forthIp.value);

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
