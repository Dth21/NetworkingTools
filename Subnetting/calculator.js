let smAnswer = document.getElementById("sm");
let naAnswer = document.getElementById("na");
let baAnswer = document.getElementById("ba");
let haAnswer = document.getElementById("ha");

let reference = 0;
let lastOctetSubnetMask = 0;
let lastOctetNetworkAdress = 0;
let lastOctetBroadcastAdress = 0;

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
  lastOctetSubnetMask = 0;
  lastOctetNetworkAdress = 0;

  switch (ipClass) {
    case "A":
      console.log("234");

    case "B":
      console.log("235");
    case "C":
      reference = subnetMask.value - 24;

      //calculate last octet of subnet mask & last octet of network adress
      for (let caCRunner = 0; caCRunner < reference; caCRunner++) {
        octetFour[caCRunner].binary == 1
          ? (lastOctetNetworkAdress += octetFour[caCRunner].double)
          : "";
        lastOctetSubnetMask += octetFour[caCRunner].double;
      }

      // calculate last octet of broadcast adress
      lastOctetBroadcastAdress =
        lastOctetNetworkAdress + octetFour[reference - 1].double - 1;
  }
}
