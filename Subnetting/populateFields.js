let doubleSubMask = document.getElementById("table-subnetmask").rows[0].cells;
let binarySubMask = document.getElementById("table-subnetmask").rows[1].cells;

let doubleNetwork = document.getElementById("table-ip-adress").rows[0].cells;
let binaryNetwork = document.getElementById("table-ip-adress").rows[1].cells;

let firstPartIp = "";

function populateSubnetMaskTable() {
  for (let psmtRunner = 0; psmtRunner < subnetMask.value; psmtRunner++) {
    binarySubMask[psmtRunner].innerHTML = 1;
  }
  binarySubMask[subnetMask.value - 1].style =
    "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  doubleSubMask[subnetMask.value - 1].style =
    "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
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

  binaryNetwork[subnetMask.value - 1].style =
    "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
  doubleNetwork[subnetMask.value - 1].style =
    "border-right-style: 1px solid; border-right-width: 10px; border-right-color: green;";
}

function populateSubnetMaskAnswer() {
  switch (ipClass) {
    case "A":
      smAnswer.innerText = firstIp.value;
      naAnswer.innerText = firstIp.value;
      baAnswer.innerText = firstIp.value;
    case "B":
      smAnswer.innerText = firstIp.value + "." + secondIp.value;
      naAnswer.innerText = firstIp.value + "." + secondIp.value;
      baAnswer.innerText = firstIp.value + "." + secondIp.value;

    case "C":
      firstPartIp =
        firstIp.value + "." + secondIp.value + "." + thirdIp.value + ".";

      smAnswer.innerText = firstPartIp + lastOctetSubnetMask;
      naAnswer.innerText = firstPartIp + lastOctetNetworkAdress;
      baAnswer.innerText = firstPartIp + lastOctetBroadcastAdress;
      haAnswer.innerText =
        firstPartIp +
        (lastOctetNetworkAdress - 1) +
        " - " +
        firstPartIp +
        (lastOctetBroadcastAdress - 1);
  }
}
