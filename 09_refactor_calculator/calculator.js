// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result of the operation


function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

const readlineSync = require('readline-sync')
const { question } = readlineSync;

prompt('Welcome to the Calculator!');

prompt('What is the first number?');
let number1 = question()

while(invalidNumber(number1)) {
  prompt(`Hmm... that doesn't look like a valid number.`)
  number1 = question();
}

console.log('What is the second number?')
let number2 = question()

while(invalidNumber(number2)) {
  prompt(`Hmm... that doesn't look like a valid number.`)
  number2 = question();
}

console.log(`What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);
let operation = question()

while(!['1', '2', '3', '4'].includes(operation)) {
  prompt('Must choose 1, 2, 3 or 4')
  operation = question()
}

let output;
if (operation === '1') {
  output = Number(number1) + Number(number2);
} else if (operation === '2') {
  output = Number(number1) - Number(number2);
} else if (operation === '3') {
  output = Number(number1) * Number(number2);
} else if (operation === '4') {
  output = Number(number1) / Number(number2);
}

switch(operation) {
  case '1':
    output = Number(number1) + Number(number2);
    break;
  case '2':
    output = Number(number1) - Number(number2);
    break;
  case '3':
    output = Number(number1) * Number(number2);
    break;
  case '4':
    output = Number(number1) / Number(number2);
    break;
}


console.log(`The result is ${output}.`)