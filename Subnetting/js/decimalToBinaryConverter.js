function decimalToBinaryConvertor(double, ipOctet) {
  if (double <= ipOctet) {
    result = 1;
  } else {
    result = 0;
  }

  return result;
}

function startConversion(octetNumber, userInputOctet) {
  let number = userInputOctet;
  let array = octetNumber;
  let binary = [];
  let dec = 0;

  for (a = 0; a < octetOne.length; a++) {
    dec = decimalToBinaryConvertor(array[a].double, number);
    binary.push(dec);

    if (result === 1) {
      difference = number - array[a].double;
      number = difference;
    } else {
      difference = number;
    }
  }

  return binary;
}
