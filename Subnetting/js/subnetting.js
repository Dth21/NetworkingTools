//creates a form based on user choice: subnet mask address / prefix
completeHtmlPage();

//shows for how many times program runned. Helps with populating fields.
let programRunTimes = 0;

// used in shortcuts to determine which field is being edited
let formField = 0;

let octetToSubnet = 0;

// octet database that helps with errors
function updateOctetsDatabase() {
  let octetsDatabase = [];

  let firstIp = document.getElementById("1-ip");
  let secondIp = document.getElementById("2-ip");
  let thirdIp = document.getElementById("3-ip");
  let forthIp = document.getElementById("4-ip");

  let subnetMask = document.getElementById("subnet-mask");
  let subnetMaskA = document.getElementById("subnet-mask-1");
  let subnetMaskB = document.getElementById("subnet-mask-2");
  let subnetMaskC = document.getElementById("subnet-mask-3");
  let subnetMaskD = document.getElementById("subnet-mask-4");

  octetsDatabase.push(firstIp);
  octetsDatabase.push(secondIp);
  octetsDatabase.push(thirdIp);
  octetsDatabase.push(forthIp);
  octetsDatabase.push(subnetMask);

  octetsDatabase.push(subnetMaskA);
  octetsDatabase.push(subnetMaskB);
  octetsDatabase.push(subnetMaskC);
  octetsDatabase.push(subnetMaskD);

  return octetsDatabase;
}

function runProgram() {
  calculateOctets();
  calculateSubnetMaskValue();

  if (subnetMaskValue == 0) {
    populateNetworkTable();
    populateSubnetMaskTable();
    populateFields0Subnet();
  } else if (subnetMaskValue > 0 && subnetMaskValue < 32) {
    if (subnetMaskValue >= 1 && subnetMaskValue <= 8) {
      octetToSubnet = 1;
    } else if (subnetMaskValue > 8 && subnetMaskValue <= 16) {
      octetToSubnet = 2;
    } else if (subnetMaskValue > 16 && subnetMaskValue <= 24) {
      octetToSubnet = 3;
    } else if (subnetMaskValue > 24 && subnetMaskValue < 32) {
      octetToSubnet = 4;
    }

    populateNetworkTable();
    populateSubnetMaskTable();
    calculateAnswers();
    populateSubnetMaskAnswer();
  } else if (subnetMaskValue == 32) {
    populateNetworkTable();
    populateSubnetMaskTable();
    populateField32Subnet();
  }

  programRunTimes++;
}
