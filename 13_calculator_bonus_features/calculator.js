// ask the user for the first number
// ask the user for the second number
// ask the user for the operation
// perform the operation
// display the result of the operation

const readlineSync = require('readline-sync')
const { question } = readlineSync;
const TEXT = require('./calculator_messages.json')
const { messages, questions, errors } = TEXT

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(messages.welcome);

while (true) {
  // ask for two numbers
  prompt(questions.firstNumber);
  let number1 = question()

  while(invalidNumber(number1)) {
    prompt(errors.invalidNumber)
    number1 = question();
  }

  // ask for operation
  console.log(questions.secondNumber)
  let number2 = question()

  while(invalidNumber(number2)) {
    prompt(errors.invalidNumber)
    number2 = question();
  }

  // perform operation and display results
  console.log(questions.operationMessage);
  console.log(questions.operationNames);
  let operation = question()

  while(!questions.operationChoices.includes(operation)) {
    prompt(errors.invalidChoice)
    operation = question()
  }
  let output;
  switch(operation) {
    case questions.operationChoices[0]:
      output = Number(number1) + Number(number2);
      break;
    case questions.operationChoices[1]:
      output = Number(number1) - Number(number2);
      break;
    case questions.operationChoices[2]:
      output = Number(number1) * Number(number2);
      break;
    case questions.operationChoices[3]:
      output = Number(number1) / Number(number2);
      break;
  }
  console.log(`${messages.result} ${output}.\n`)

  prompt(questions.anotherOperation)
  let answer = question()
  console.clear()
  if (answer[0].toLowerCase() !== 'y') {
    console.log(messages.bye)
    break;
  }
}
