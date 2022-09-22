let doubleSubMask = document.getElementById("table-subnetmask").rows[0].cells;
let binarySubMask = document.getElementById("table-subnetmask").rows[1].cells;

let doubleNetwork = document.getElementById("table-ip-address").rows[0].cells;
let binaryNetwork = document.getElementById("table-ip-address").rows[1].cells;

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

function populateNetworkTable() {
  // populate network table (the upper table on page) based on the binary values of the ip address' octets
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

  // adds a green line on the right of the prefix value cell when prefix >0 and on the left when prefix = 0
  if (programRunTimes < 1) {
    //if actual sm !=o >> create green borded
    if (subnetMaskValue != 0) {
      binaryNetwork[subnetMaskValue - 1].style =
        "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
      doubleNetwork[subnetMaskValue - 1].style =
        "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";

      //if actual sm = 0 >>
    } else {
      binaryNetwork[subnetMaskValue].style =
        "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
      doubleNetwork[subnetMaskValue].style =
        "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
    }

    //if program is run > 1
  } else {
    //if actual sm !=0
    if (subnetMaskValue != 0) {
      // all cases except some (old sm = 0,8,16,24) & actual sm !=0
      if (
        oldSubnetMaskValue != 0 &&
        oldSubnetMaskValue != 24 &&
        oldSubnetMaskValue != 16 &&
        oldSubnetMaskValue != 8
      ) {
        binaryNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";
        doubleNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";

        binaryNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";

        // when old sm = 0 & actual sm !=0
      } else if (oldSubnetMaskValue == 0) {
        binaryNetwork[oldSubnetMaskValue].style =
          "border-left-style: 1px solid;";
        doubleNetwork[oldSubnetMaskValue].style =
          "border-left-style: 1px solid;";

        binaryNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        // all exception cases (old sm = 8,16,24) & actual sm !=0
      } else {
        binaryNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";
        doubleNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";

        binaryNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleNetwork[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
      }

      // if actual sm == 0
    } else {
      // all cases except some (old sm = 0,8,16,24) & actual sm =0
      if (
        oldSubnetMaskValue != 0 &&
        oldSubnetMaskValue != 24 &&
        oldSubnetMaskValue != 16 &&
        oldSubnetMaskValue != 8
      ) {
        binaryNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";
        doubleNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";

        binaryNetwork[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        doubleNetwork[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        // when old sm = 0 & actual sm = 0
      } else if (oldSubnetMaskValue == 0) {
        // all exception cases (old sm = 8,16,24) & actual sm = 0
      } else {
        binaryNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";
        doubleNetwork[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";

        binaryNetwork[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        doubleNetwork[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
      }
    }
  }
}

function populateSubnetMaskTable() {
  // populate subnet mask table (lower on page) with one until it reaches the subnet prefix cell
  for (let psmtRunner = 0; psmtRunner < subnetMaskValue; psmtRunner++) {
    binarySubMask[psmtRunner].innerHTML = 1;
  }

  console.log(001, "Old subnet mask value is " + oldSubnetMaskValue);

  // adds a green line on the right of the prefix value cell when prefix >0 and on the left when prefix = 0
  if (programRunTimes < 1) {
    //if actual sm !=o >> create green borded
    if (subnetMaskValue != 0) {
      binarySubMask[subnetMaskValue - 1].style =
        "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
      doubleSubMask[subnetMaskValue - 1].style =
        "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";

      //if actual sm = 0 >>
    } else {
      binarySubMask[subnetMaskValue].style =
        "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
      doubleSubMask[subnetMaskValue].style =
        "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
    }

    //if program is run > 1
  } else {
    //if actual sm !=0
    if (subnetMaskValue != 0) {
      // all cases except some (old sm = 0,8,16,24) & actual sm !=0
      if (
        oldSubnetMaskValue != 0 &&
        oldSubnetMaskValue != 24 &&
        oldSubnetMaskValue != 16 &&
        oldSubnetMaskValue != 8
      ) {
        binarySubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";
        doubleSubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";

        binarySubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleSubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";

        // when old sm = 0 & actual sm !=0
      } else if (oldSubnetMaskValue == 0) {
        binarySubMask[oldSubnetMaskValue].style =
          "border-left-style: 1px solid;";
        doubleSubMask[oldSubnetMaskValue].style =
          "border-left-style: 1px solid;";

        binarySubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleSubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        // all exception cases (old sm = 8,16,24) & actual sm !=0
      } else {
        binarySubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";
        doubleSubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";

        binarySubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
        doubleSubMask[subnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
      }

      // if actual sm == 0
    } else {
      // all cases except some (old sm = 0,8,16,24) & actual sm =0
      if (
        oldSubnetMaskValue != 0 &&
        oldSubnetMaskValue != 24 &&
        oldSubnetMaskValue != 16 &&
        oldSubnetMaskValue != 8
      ) {
        binarySubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";
        doubleSubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid;";

        binarySubMask[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        doubleSubMask[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        // when old sm = 0 & actual sm = 0
      } else if (oldSubnetMaskValue == 0) {
        // all exception cases (old sm = 8,16,24) & actual sm = 0
      } else {
        binarySubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";
        doubleSubMask[oldSubnetMaskValue - 1].style =
          "border-right-style: 1px solid; border-right-width: 5px";

        binarySubMask[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
        doubleSubMask[subnetMaskValue].style =
          "border-left-style: 1px solid; border-left-width: 10px; border-left-color: green;";
      }
    }
  }

  oldSubnetMaskValue = subnetMaskValue;
}

//populates row with answers when subnet != 0 / 32
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

      firstPartNetBroadVHAdd = updateOctetsDatabase()[0].value + ".";

      lastPartNetAdd = ".0.0";

      lastPartBroadAdd = ".255.255";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork =
            "" + (~~updateOctetsDatabase()[0].value + 1) + ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = ".0.1";

      lastPartVH2 = ".255.254";
      break;

    case 3:
      firstPartSubMask = "255.255.";
      lastPartSubMask = ".0";

      firstPartNetBroadVHAdd =
        updateOctetsDatabase()[0].value +
        "." +
        updateOctetsDatabase()[1].value +
        ".";
      lastPartNetAdd = ".0";
      lastPartBroadAdd = ".255";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork =
            updateOctetsDatabase()[0].value +
            "." +
            (~~updateOctetsDatabase()[1].value + 1) +
            ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = ".1";
      lastPartVH2 = ".254";
      break;

    case 4:
      firstPartSubMask = "255.255.255.";
      lastPartSubMask = "";

      firstPartNetBroadVHAdd =
        updateOctetsDatabase()[0].value +
        "." +
        updateOctetsDatabase()[1].value +
        "." +
        updateOctetsDatabase()[2].value +
        ".";
      lastPartNetAdd = "";
      lastPartBroadAdd = "";

      isUnder == true
        ? (firstPartNextNetwork = firstPartNetBroadVHAdd)
        : (firstPartNextNetwork =
            updateOctetsDatabase()[0].value +
            "." +
            updateOctetsDatabase()[1].value +
            "." +
            (~~updateOctetsDatabase()[2].value + 1) +
            ".");

      lastPartNextNetwork = lastPartNetAdd;

      lastPartVH1 = "";
      lastPartVH2 = "";

      break;
  }

  checkSubnettingChoice() == "prefix"
    ? (smAnswer.innerText =
        firstPartSubMask + octetSubnetMask + lastPartSubMask)
    : (smAnswer.innerText = "/" + subnetMaskValue);

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

//populates row with answers when subnet = 0
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

  oldSubnetMaskValue = subnetMaskValue;
}

//populates row with answers when subnet = 32
function populateField32Subnet() {
  for (
    let psmtf32sRunner = 0;
    psmtf32sRunner < subnetMaskValue;
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
    updateOctetsDatabase()[0].value +
    "." +
    updateOctetsDatabase()[1].value +
    "." +
    updateOctetsDatabase()[2].value +
    "." +
    updateOctetsDatabase()[3].value;
  naAnswer.innerText =
    updateOctetsDatabase()[0].value +
    "." +
    updateOctetsDatabase()[1].value +
    "." +
    updateOctetsDatabase()[2].value +
    "." +
    updateOctetsDatabase()[3].value;
  baAnswer.innerText =
    updateOctetsDatabase()[0].value +
    "." +
    updateOctetsDatabase()[1].value +
    "." +
    updateOctetsDatabase()[2].value +
    "." +
    updateOctetsDatabase()[3].value;
  haAnswer.innerText = "N/A";
  nnaaAnswer.innerText = "N/A";

  oldSubnetMaskValue = subnetMaskValue;
}

function populateShortcuts() {
  let subnetMaskShortcut = document.getElementById("shortcuts-subnet-mask");
  checkSubnettingChoice() == "prefix"
    ? (subnetMaskShortcut.style.display = "none")
    : (subnetMaskShortcut.style.display = "flex");
}
