klr
=======

256 color ANSI strings for Node JS

A drop-in replacement for [chalk](https://github.com/sindresorhus/chalk) but also adds support for 256 colors.

Examples of things that work:


  ```
  var chalk = require('klr');

  // The original `chalk` interface is supported; `klr` is a drop-in replacement
  console.log(chalk.magenta.bold("this will be bright magenta"));

  // Give a color description as an argument to chalk
  console.log(chalk("red")("this will be red"));

  // Give a foreground and a background description to chalk
  console.log(chalk("#ffcc00", "gray")("this will be organge-yellow on gray"));

  // `chalk.color` is the same as `chalk.fg` or `chalk.foreground` or calling `chalk`
  // with one argument
  console.log(chalk.color("DodgerBlue"))("You can use CSS colors"); // caps don't matter

  // `chalk.bg` and `chalk.background` are the same -- they set the background color
  console.log(chalk.red.bg("green")("red on green"));

  // All the CSS color names are added to chalk
  console.log(chalk.GoldenRod("This will be golden rod color"));

  // Hex values work; the nearest color will be used if there isn't an exact match
  console.log(chalk.color("#ffcc00")("You can also say #FC0 or just fc0 or FC0"));

  // You can also give 0-255 RGB values as an array
  console.log(chalk.bg([100, 150, 250])("this works"));

  // Or give the value as 0.0-1.0 RGB
  console.log(chalk.fg(['%', 0.5, 0.5, 0.5])("put a % as the first arg in the Array"));

  // Or just give an ANSI color code
  console.log(chalk.color(100)("Anything from 0-255"));

  // The ANSI codes are also exposed on the object
  console.log(chalk.ansi93("ansi0-ansi255"));
  console.log(chalk.bgAnsi75("background colors work too"));

  // The hex values for exact matches are exposed on the object
  console.log(chalk.xFFD7FF("bgxFFD7FF works too for background color"));

  ```

The forms you can use for color arguments are any of:
  - A string that matches the name of a CSS color (ex. "Yellow")
  - A string that is a hex string description of the color ("#FFCC00")
  - An array of 3 floats between 0 and 1
  - An array of 4 things: "%", then the numbers between 0 and 256
  - An object with r/g/b or red/green/blue keys, and optionally a field called 'decimal' that if truth-y means you are specifying a color between 0.0-1.0 insetad of 0-255
  - A number with the ANSI color code

`fgbg` takes 2 arguments (a foreground color and a background color) of the same form.
