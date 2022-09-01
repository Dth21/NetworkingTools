let programRunTimes = 0;
let ipClass = "A";

let firstIp = document.getElementById("1-ip");
let secondIp = document.getElementById("2-ip");
let thirdIp = document.getElementById("3-ip");
let forthIp = document.getElementById("4-ip");
let subnetMask = document.getElementById("subnet-mask");

function runProgram() {
  if (subnetMask.value >= 8 && subnetMask.value < 16) {
    ipClass = "A";
  } else if (subnetMask.value >= 16 && subnetMask.value < 24) {
    ipClass = "B";
  } else if (subnetMask.value >= 24 && subnetMask.value < 32) {
    ipClass = "C";
  }

  calculateOctets();
  populateSubnetMaskTable();
  populateNetworkTable();
  calculateAnswers();
  populateSubnetMaskAnswer();

  programRunTimes++;

  console.log(ipClass);
}

addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    runProgram();
  }
});
