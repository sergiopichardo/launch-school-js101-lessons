// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result of the operation

const readlineSync = require('readline-sync')
const { question } = readlineSync;

console.log('Welcome to the Calculator!')
console.log('What is the first number?')
let number1 = question()

console.log('What is the second number?')
let number2 = question()

console.log(`${number1} ${number2}`);

console.log(`What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide`);
let operation = question()

let output;
if (operation === '1') {
  output = Number(number1) + Number(number2);
  console.log(`The result is ${output}.`)
} else if (operation === '2') {
  output = Number(number1) - Number(number2);
} else if (operation === '3') {
  output = Number(number1) * Number(number2);
} else if (operation === '4') {
  output = Number(number1) / Number(number2);
}

console.log(`The result is ${output}.`)