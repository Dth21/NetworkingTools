let smAnswer = document.getElementById("sm"); //subnet mask field
let naAnswer = document.getElementById("na"); //network address field
let baAnswer = document.getElementById("ba"); // broadcast address field
let haAnswer = document.getElementById("ha"); // host range addresses field
let nnaaAnswer = document.getElementById("nnaa"); //next network address field

let reference = 0;
let octetSubnetMask = 0;
let octetNetworkAddress = 0;
let octetBroadcastAddress = 0;
let octetNextNetworkAddress = 0;

let isOver = false;
let isUnder = false;

let subnetMaskValue = 0;

function calculateOctets() {
  firstOctet = startConversion(octetOne, updateOctetsDatabase()[0].value);
  secondOctet = startConversion(octetTwo, updateOctetsDatabase()[1].value);
  thirdOctet = startConversion(octetThree, updateOctetsDatabase()[2].value);
  forthOctet = startConversion(octetFour, updateOctetsDatabase()[3].value);

  for (coRunner = 0; coRunner < 8; coRunner++) {
    octetOne[coRunner].binary = firstOctet[coRunner];
    octetTwo[coRunner].binary = secondOctet[coRunner];
    octetThree[coRunner].binary = thirdOctet[coRunner];
    octetFour[coRunner].binary = forthOctet[coRunner];
  }

  console.log(201, octetOne);
  console.log(202, octetTwo);
  console.log(203, octetThree);
  console.log(204, octetFour);
}

// used just for displaying an error when subnet mask address is not correct
function createPossibleOctetSubnetMaskDb() {
  let possibleOctetSubnetMaskDb = [];
  let b = 256;

  possibleOctetSubnetMaskDb.push("0");

  for (let cposmdRunner = 0; cposmdRunner < 8; cposmdRunner++) {
    possibleSmOctet = b - octetFour[cposmdRunner].double;

    possibleOctetSubnetMaskDb.push(possibleSmOctet.toString());
  }

  return possibleOctetSubnetMaskDb;
}

// find the subnet mask prefix or calculate it based on the subnet mask address
function calculateSubnetMaskValue() {
  switch (checkSubnettingChoice()) {
    case "prefix":
      subnetMaskValue = updateOctetsDatabase()[4].value;
      break;

    case "address":
      if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "255" &&
        updateOctetsDatabase()[7].value == "255" &&
        updateOctetsDatabase()[8].value != "0" &&
        updateOctetsDatabase()[8].value != "255"
      ) {
        subnetMaskValue = 24;

        let csmvRunnerA = 0;
        let difference = 0;
        let octetFourSubnetMask = updateOctetsDatabase()[8].value;

        do {
          difference = octetFourSubnetMask - octetFour[csmvRunnerA].double;

          octetFourSubnetMask = difference;
          subnetMaskValue++;
          csmvRunnerA++;
        } while (difference > 0);
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "255" &&
        updateOctetsDatabase()[8].value == "0" &&
        updateOctetsDatabase()[7].value != "0" &&
        updateOctetsDatabase()[7].value != "255"
      ) {
        subnetMaskValue = 16;

        let csmvRunnerB = 0;
        let difference = 0;
        let octetThreeSubnetMask = updateOctetsDatabase()[7].value;

        do {
          difference = octetThreeSubnetMask - octetThree[csmvRunnerB].double;

          octetThreeSubnetMask = difference;
          subnetMaskValue++;
          csmvRunnerB++;
        } while (difference > 0);
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[7].value == "0" &&
        updateOctetsDatabase()[8].value == "0" &&
        updateOctetsDatabase()[6].value != "0" &&
        updateOctetsDatabase()[6].value != "255"
      ) {
        subnetMaskValue = 8;

        let csmvRunnerC = 0;
        let difference = 0;
        let octetTwoSubnetMask = updateOctetsDatabase()[6].value;

        do {
          difference = octetTwoSubnetMask - octetTwo[csmvRunnerC].double;

          octetTwoSubnetMask = difference;
          subnetMaskValue++;
          csmvRunnerC++;
        } while (difference > 0);
      } else if (
        updateOctetsDatabase()[6].value == "0" &&
        updateOctetsDatabase()[7].value == "0" &&
        updateOctetsDatabase()[8].value == "0" &&
        updateOctetsDatabase()[5].value != "0" &&
        updateOctetsDatabase()[5].value != "255"
      ) {
        subnetMaskValue = 0;

        let csmvRunnerD = 0;
        let difference = 0;
        let octetOneSubnetMask = updateOctetsDatabase()[5].value;

        do {
          difference = octetOneSubnetMask - octetTwo[csmvRunnerD].double;

          octetOneSubnetMask = difference;
          subnetMaskValue++;
          csmvRunnerD++;
        } while (difference > 0);
      } else if (
        updateOctetsDatabase()[5].value == "0" &&
        updateOctetsDatabase()[6].value == "0" &&
        updateOctetsDatabase()[7].value == "0" &&
        updateOctetsDatabase()[8].value == "0"
      ) {
        subnetMaskValue = 0;
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "0" &&
        updateOctetsDatabase()[7].value == "0" &&
        updateOctetsDatabase()[8].value == "0"
      ) {
        subnetMaskValue = 8;
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "255" &&
        updateOctetsDatabase()[7].value == "0" &&
        updateOctetsDatabase()[8].value == "0"
      ) {
        subnetMaskValue = 16;
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "255" &&
        updateOctetsDatabase()[7].value == "255" &&
        updateOctetsDatabase()[8].value == "0"
      ) {
        subnetMaskValue = 24;
      } else if (
        updateOctetsDatabase()[5].value == "255" &&
        updateOctetsDatabase()[6].value == "255" &&
        updateOctetsDatabase()[7].value == "255" &&
        updateOctetsDatabase()[8].value == "255"
      ) {
        subnetMaskValue = 32;
      }
      break;
  }

  console.log(00, "Actual subnet mask prefix is " + subnetMaskValue);
}

// calculate all the needed octets based on subnet mask prefix
function calculateAnswers() {
  octetSubnetMask = 0;
  octetNetworkAddress = 0;
  let referenceOctet = [];

  switch (octetToSubnet) {
    case 1:
      referenceOctet = octetOne;
      reference = subnetMaskValue;
      break;
    case 2:
      referenceOctet = octetTwo;
      reference = subnetMaskValue - 8;
      break;
    case 3:
      referenceOctet = octetThree;
      reference = subnetMaskValue - 16;
      break;
    case 4:
      referenceOctet = octetFour;
      reference = subnetMaskValue - 24;
      break;
  }

  //calculate last octet of subnet mask & last octet of network address
  for (let caCRunner = 0; caCRunner < reference; caCRunner++) {
    referenceOctet[caCRunner].binary == 1
      ? (octetNetworkAddress += referenceOctet[caCRunner].double)
      : "";
    octetSubnetMask += referenceOctet[caCRunner].double;
  }

  // check to see if octetNetworkAddress + last double before the line is less or greater than 255
  console.log(
    000,
    "Sum of NetAdd and last double is " +
      (octetNetworkAddress + referenceOctet[reference - 1].double)
  );
  octetNetworkAddress + referenceOctet[reference - 1].double <= 255
    ? (isUnder = true)
    : (isOver = true);

  // calculate the next subnet and the broadcast adress (next subnet - 1)
  switch (isUnder) {
    // when octetNetworkAddress + double before line is less than 255
    case true:
      octetNextNetworkAddress =
        octetNetworkAddress + referenceOctet[reference - 1].double;
      octetBroadcastAddress = octetNextNetworkAddress - 1;
      break;

    // when octetNetworkAddress + double before line is more than 255.
    case false:
      octetToSubnet == 1
        ? (octetNextNetworkAddress = 256)
        : (octetNextNetworkAddress = 0);

      octetBroadcastAddress = 255;
      break;
  }

  console.log(111, "OctetToSubnet is " + octetToSubnet);
  console.log(222, "SubnetMask missing octet is " + octetSubnetMask);
  console.log(333, "NetworkAddress missing octet is " + octetNetworkAddress);
  console.log(444, "NextSubnet missing octet is " + octetNextNetworkAddress);
  console.log(555, "BroadcastAdress missing octet is " + octetBroadcastAddress);
}
