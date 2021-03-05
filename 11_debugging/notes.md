# Debugging Notes


Example file
```js
// debug.js

let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter += 1;
}
```

## Debug mode
You can execute a file in "debug mode" using the `inspect` argument.
```sh
node inspect debug.js
```

## Access variable values
You can access the value in a variable using the `exec` argument
```sh
< Debugger listening on ws://127.0.0.1:9229/5c08d9ea-1d25-4fa8-8ddb-3ab96ea3ac5b
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in debug.js:3
  1 // debug.js
  2
> 3 let counter = 1;
  4
  5 while (counter <= 5) {
debug>
```

## Enter the next or current point of execution
You can enter the next or current point of execution using the `n` or `next` argument

```sh
debug> n
break in app.js:5
  3 let counter = 1;
  4
> 5 while (counter <= 5) { # <<<<< Pay attention to this line >>>>>
  6   console.log(counter);
  7   counter += 1;
debug> exec counter
1
debug>
```

## Continue (unpause) the program execution
You can unpause the program, and *continue* it to the end (or until you experience an error)
using the `cont` or `c` argument. Usually, `continue` is used along with the `debugger` keyword.

```sh
< 1
< 2
< 3
< 4
< 5
< Waiting for the debugger to disconnect...
debug>
```

## Restart program execution from the beginning
You can restart the program's execution from the beginning using the `run` or `restart` arguments.

## Exit the program
You can exit out of the current debug program using the `.exit` argument

## Adding a `debugger` statement and breakpoints
Add a **breakpoint** using a debugger statement with the `debugger` keyword.
Another way to think about this is that there is a *break at that point*.
Setting a debugger statement like this is often referred to as a breakpoint.

### Summary
- `inspect`: execute a node.js file in debug mode
- `exec`: access a value stored in a variable
- `n` or `next`: move to the next line in the execution, line by line.
- `c` or `cont`: continue the normal execution of the program (until it's finished or error occurs). It stops at a line where there is a debugger statement (a.k.a. breakpoint).
- `run` or `restart`: restart the program from the beginning.
- `debugger`: add breakpoints in your program. When you enter `c` or `cont` it stops the program at the line where yo placed the `debugger` keyword.