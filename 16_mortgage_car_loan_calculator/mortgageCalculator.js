/*
Program: Mortgage Calculator

Description: Create a program to calculate the monthly mortage
payments a user has to make using the principal (the amount of money),
the APR (Annual Percentage Rate), and the loan duration (in months).
*/
const readlineSync = require('readline-sync');
const { question } = readlineSync;

const table = require('table');
const currency = require('currency.js');
const chalk = require('chalk');
const boxen = require('boxen');

const {
  titles,
  messages,
  options
} = require('./text.json');

const validate = {
  amount: "amount",
  duration: "duration",
  apr: "apr",
};

// intro and outro messages
const intro = getCustomMessage(messages.welcome);
const outro = getCustomMessage(messages.bye);

/**
 * Get the mortgage amount
 * @param  {...string} [ title, messages ]
 * @return {number}
 */
function getAmount(...messages) {
  messages.forEach((message) => displayMessage(message));

  let amount = question("> ");
  amount = parseFloat(amount.split(",").join(""), 10);
  console.clear();
  while (isInvalid(amount, validate.amount)) {
    messages.forEach((message) => displayMessage(message));
    amount = question("> ");
    amount = parseFloat(amount.split(",").join(""), 10);
    console.clear();
  }
  console.clear();

  return amount;
}

/**
 * Get Mortagage Duration in Years
 * @param  {...string} [ title, messages ]
 * @return {number}
 */
function getDurationInYears(...messages) {
  messages.forEach((message) => displayMessage(message));
  let duration = question("> ");
  duration = parseInt(duration, 10);
  console.clear();
  while (isInvalid(duration, validate.duration)) {
    messages.forEach((message) => displayMessage(message));
    duration = question("> ");
    duration = parseInt(duration, 10);
    console.clear();
  }
  console.clear();

  return duration;
}

/**
 * Get Mortgage Annual Percentage Rate
 * @param  {...string} [ title, messages ]
 * @return {number}
 */
function getAnnualPercentageRate(...messages) {
  messages.forEach((message) => displayMessage(message));
  let apr = question("> ");
  apr = parseFloat(apr, 10);
  console.clear();
  while (isInvalid(apr, validate.apr)) {
    messages.forEach((message) => displayMessage(message));
    apr = question("> ");
    apr = parseFloat(apr, 10);
    console.clear();
  }
  console.clear();

  return apr;
}


/**
 * Validate input data entered is correct type
 * @param {number} data - The data being input by the user
 * @param {number} variable - A string describing expected data type
 * @return {boolean}
 */
function isInvalid(data, variable) {
  const validationObject = {
    amount: function(data) {
      return (typeof data === 'undefined' && Number.isNaN(data) && data > 0);
    },
    duration: function(data) {
      return (typeof data === 'undefined' && Number.isNaN(data) &&
              data % 1 !== 0 && data < 0 && data > 60);
    },
    apr: function(data) {
      return (typeof data === "undefined" && Number.isNaN(data) && data < 0);
    }
  };

  return validationObject[variable](data);
}


/**
 * Calculate Monthly interest
 * @param {number} apr - annual percentage rate
 * @return {number} - monthly interest rate
 */
function getMonthlyInterestRate(apr) {
  return (apr / 100) / 12;
}

/**
 * Calculate Mortgage Duration in Months
 * @param {number} years - Mortgage duration in years
 * @return {number} - months
 */
function getDurationInMonths(years) {
  return years * 12;
}

/**
 * Calculate Total Mortgage Cost
 * @param {number} monthlyPayment
 * @param {number} DurationInMonths
 * @return {number}
 */
function getTotalCost(monthlyPayment, durationInMonths) {
  return monthlyPayment * durationInMonths;
}

/**
 * Calculate the monthly mortgage payment with interest
 * @param {number} amount
 * @param {number} durationInMonths
 * @param {number} monthlyInterestRate
 * @return {number}
 */
function getMonthlyPayment(amount, durationInMonths, monthlyInterestRate) {
  let calculation;
  if (monthlyInterestRate > 0 && amount > 0) {
    calculation = amount * (monthlyInterestRate /
      (1 - Math.pow((1 + monthlyInterestRate), (-durationInMonths))));
  } else if (monthlyInterestRate === 0 && amount > 0) {
    calculation = amount / durationInMonths;
  }
  return calculation;
}

/**
 * Display a list of message to the screen
 * @param {string[]} messages
 */
function displayMessage(messages) {
  if (typeof messages === 'object' && messages['length'] && messages.length > 0) {
    messages.forEach((message) => {
      console.log(message);
    });
  } else {
    console.log(messages);
  }
}


/**
 * Display Mortgage Summary
 * @param {number} amount
 * @param {number} durationInYears
 * @param {number} durationInMonths
 * @param {number} annualPercentageRate
 * @param {number} monthlyPercetageRate
 * @param {number} totalCost
 * @param {number} monthlyPayment
 */
function displaySummary(amount, durationInYears,
  durationInMonths, annualPercentageRate,
  monthlyPercentageRate, totalCost, monthlyPayment) {
  const usd = value => currency(value, { symbol: "$", precision: 2 });
  displayMessage("\t\t\tMORTAGE DATA SUMMARY");

  let data = [
    ["Mortgage Amount",                       `${usd(amount).format()}`],
    ["Mortgage Duration (years)",             `${durationInYears} years`],
    ["Mortgage Duration (months)",            `${durationInMonths} months`],
    ["Annual Percentage Rate",                `${annualPercentageRate.toFixed(2)}%`],
    ["Monthly Percentage Rate",               `${monthlyPercentageRate.toFixed(6)}%`],
    ["Total Mortgage Cost",                   `${usd(totalCost).format()}`],
    [chalk.green("Monthly Mortgage Payment"), `${chalk.green(usd(monthlyPayment).format())}`],
  ];

  let config = { columns: { 0: { width: 30 }, 1: { width: 30 }, }};
  displayMessage(table.table(data, config));
}

/**
 * Ask user to make a new calculation
 * @param {string} againMessage - Enter yes or no question ...
 * @param {string[]} answerOptions - array of valid answers
 * @returns {boolean}
 */
function newCalculation(againMessage, answerOptions) {
  let yesOptions = answerOptions.slice(0, 2);
  let userAnswer = question(againMessage);
  userAnswer = userAnswer.toLowerCase();

  while (!answerOptions.includes(userAnswer)) {
    userAnswer = question(againMessage);
  }
  console.clear();
  return yesOptions.includes(userAnswer);
}

/**
 * @param {string} message
 * @return {string} Custom Message
 */
function getCustomMessage(message) {
  return boxen(message, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green',
    margin: {
      left: 0
    }
  });
}


function mortgageCalculation() {
  // get required mortage data from user
  let amount = getAmount(titles.amount, messages.amount);
  let durationInYears = getDurationInYears(titles.duration, messages.duration);
  let apr = getAnnualPercentageRate(titles.apr, messages.apr);

  // make mortgage calculations
  let monthlyInterestRate = getMonthlyInterestRate(apr);
  let durationInMonths = getDurationInMonths(durationInYears);
  let monthlyPayment = getMonthlyPayment(amount, durationInMonths,
    monthlyInterestRate);
  let totalCost = getTotalCost(monthlyPayment, durationInMonths);

  // display mortage calculation summary
  displaySummary(
    amount,
    durationInYears,
    durationInMonths,
    apr,
    monthlyInterestRate,
    totalCost,
    monthlyPayment
  );
}


displayMessage(intro);
while (true) {
  mortgageCalculation();
  let again = newCalculation(messages.again, options.again);
  if (!again) {
    displayMessage(outro);
    break;
  }
}