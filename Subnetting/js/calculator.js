let smAnswer = document.getElementById("sm");
let naAnswer = document.getElementById("na");
let baAnswer = document.getElementById("ba");
let haAnswer = document.getElementById("ha");
let nnaaAnswer = document.getElementById("nnaa");

let reference = 0;
let octetSubnetMask = 0;
let octetNetworkAddress = 0;
let octetBroadcastAddress = 0;
let octetNextNetworkAddress = 0;
let newOctet = 0;

let isOver = false;
let isUnder = false;

function calculateOctets() {
  firstOctet = startConversion(octetOne, firstIp.value);
  secondOctet = startConversion(octetTwo, secondIp.value);
  thirdOctet = startConversion(octetThree, thirdIp.value);
  forthOctet = startConversion(octetFour, forthIp.value);

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

function calculateAnswers() {
  console.log(123, firstIp.value, secondIp.value, thirdIp.value, forthIp.value);

  octetSubnetMask = 0;
  octetNetworkAddress = 0;
  let referenceOctet = [];

  /*
  a = ~~firstIp.value;
  b = ~~secondIp.value;
  c = ~~thirdIp.value;
  d = ~~forthIp.value;
  */

  switch (octetToSubnet) {
    case 1:
      referenceOctet = octetOne;
      reference = subnetMask.value;
      break;
    case 2:
      referenceOctet = octetTwo;
      reference = subnetMask.value - 8;
      break;
    case 3:
      referenceOctet = octetThree;
      reference = subnetMask.value - 16;
      break;
    case 4:
      referenceOctet = octetFour;
      reference = subnetMask.value - 24;
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

      console.log(999, "under");
      break;

    // when octetNetworkAddress + double before line is more than 255.
    case false:
      octetToSubnet == 1
        ? (octetNextNetworkAddress = 256)
        : (octetNextNetworkAddress = 0);

      octetBroadcastAddress = 255;
      console.log(999, "over");
      break;
  }
  console.log(111, "OctetToSubnet is " + octetToSubnet);
  console.log(222, "SubnetMask missing octet is " + octetSubnetMask);
  console.log(333, "NetworkAddress missing octet is " + octetNetworkAddress);
  console.log(444, "NextSubnet missing octet is " + octetNextNetworkAddress);
  console.log(555, "BroadcastAdress missing octet is " + octetBroadcastAddress);
}
