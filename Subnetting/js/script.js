let programRunTimes = 0;
let octetToSubnet = 0;

let firstIp = document.getElementById("1-ip");
let secondIp = document.getElementById("2-ip");
let thirdIp = document.getElementById("3-ip");
let forthIp = document.getElementById("4-ip");
let subnetMask = document.getElementById("subnet-mask");

function runProgram() {
  if (subnetMask.value >= 1 && subnetMask.value <= 8) {
    octetToSubnet = 1;
  } else if (subnetMask.value > 8 && subnetMask.value <= 16) {
    octetToSubnet = 2;
  } else if (subnetMask.value > 16 && subnetMask.value <= 24) {
    octetToSubnet = 3;
  } else if (subnetMask.value > 24 && subnetMask.value < 32) {
    octetToSubnet = 4;
  }

  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  calculateOctets();
  populateSubnetMaskTable();
  populateNetworkTable();
  calculateAnswers();
  populateSubnetMaskAnswer();

  programRunTimes++;
}

addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    runProgram();
  }
});
