# Pseudocode Practice

Write out pseudocode (both casual and formal) that does the following:

- a function that returns the sum of two numbers
- a function that takes an array of strings, and returns a string that is all those strings concatenated together.
- a function that takes an array of integers, and returns a new array with every other element.


### A function that returns the sum of two numbers
```
Given two numbers

validate that the numbers:
  - check the numbers exist (not undefined)
  - check that the numbers are numbers (e.g. not strings)
  - if either of the conditions apply, return (end the program)
return result of adding both numbers
```

```
Given two numbers called "num1" and "num2"

IF num1 = undefined OR num2 == undefined OR num1 != number OR num2 != number
  RETURN

RETURN num1 + num2
```

```js
function sum(num1, num2) {
  if (typeof num1 === 'undefined' || typeof num2 === 'undefined' || typeof num1 !== number || typeof num2 !== 'number') {
    return;
  }
  return num1 + num2;
}
```
