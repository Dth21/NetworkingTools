let programRunTimes = 0;
let formField = 0;

let octetToSubnet = 0;

let firstIp = document.getElementById("1-ip");
let secondIp = document.getElementById("2-ip");
let thirdIp = document.getElementById("3-ip");
let forthIp = document.getElementById("4-ip");
let subnetMask = document.getElementById("subnet-mask");

// it helps with errors
let octetsDatabase = [];
octetsDatabase.push(firstIp);
octetsDatabase.push(secondIp);
octetsDatabase.push(thirdIp);
octetsDatabase.push(forthIp);
octetsDatabase.push(subnetMask);

function runProgram() {
  if (subnetMask.value == 0) {
    calculateOctets();
    populateFields0Subnet();
  } else if (subnetMask.value > 0 && subnetMask.value < 32) {
    if (subnetMask.value >= 1 && subnetMask.value <= 8) {
      octetToSubnet = 1;
    } else if (subnetMask.value > 8 && subnetMask.value <= 16) {
      octetToSubnet = 2;
    } else if (subnetMask.value > 16 && subnetMask.value <= 24) {
      octetToSubnet = 3;
    } else if (subnetMask.value > 24 && subnetMask.value < 32) {
      octetToSubnet = 4;
    }

    calculateOctets();
    populateSubnetMaskTable();
    populateNetworkTable();

    calculateAnswers();
    populateSubnetMaskAnswer();
  } else if (subnetMask.value == 32) {
    calculateOctets();
    populateField32Subnet();
  }

  programRunTimes++;
}
