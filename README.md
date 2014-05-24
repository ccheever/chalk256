chalk256
========

256 color ANSI strings for Node JS

A drop-in replacement for [chalk](https://github.com/sindresorhus/chalk) but also adds support for 256 colors. It is a layer on top of the simpler [crayon](https://github.com/aceface/crayon).

Examples of things that work:

```js
var chalk = require('chalk256');

// The original `chalk` interface is supported; `chalk256` is a drop-in replacement
console.log(chalk.magenta.bold("this will be bright magenta"));

// In chalk256, all the CSS color names are added to chalk
console.log(chalk.goldenrod("This will be a rich yellow  color"));

// Also works for background color setting
console.log(chalk.bgGoldenrod("This will be hard to read!"));

// These can be chained in some ways
console.log(chalk.inverse(chalk.bgDarkblue.gold("ssa")));

// Give a color description as an argument to chalk
console.log(chalk("darkred")("this will be dark red"));

// Give a foreground and a background description to chalk
console.log(chalk("#ffcc00", "gray")("this will be organge-yellow on gray"));

// Set just the background
console.log(chalk(null, "gray")("this will be the default text color on gray"));

// Hex values work; it will match the nearest it can find
console.log(chalk("#ffcc00")("You can also say #FC0 or just fc0 or FC0"));

// Or just give an ANSI color code
console.log(chalk.color(100)("Anything from 0-255"));

```
