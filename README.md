chalk256
=======

256 color ANSI strings for Node JS

Implements the same interface as [chalk](https://github.com/sindresorhus/chalk) but also adds support for 256 colors.

Examples of things that work:
  ```
  console.log(chalk256.magenta("some text")); // compatible with chalk
  console.log(chalk256.GoldenRod("some text")); // adds support for CSS colors
  console.log(chalk256.color("#ffcc00")("some text")); // Can use any hex color
  console.log(chalk256.bg([100, 150, 250])("some text")); // or give 0-255 RGB values as an array
  console.log(chalk256.fg(['%', 0.5, 0.5, 0.5])("some text")); // or give 0.0-1.0 RGB values as an array
  console.log(chalk256.color("dodgerblue")("some text")); // or give any CSS color by name (caps don't matter)
  console.log(chalk256.color(100)("some text")); // or just give an ANSI color value
  console.log(chalk256.$87ffaf("some text")); // Hex values of ANSI color codes are exposed as properties on the object
  console.log(chalk256.ansi93("some text")); // ANSI codes are exposed in this way
  console.log(chalk256.bgAnsi75("some text")); // Background ANSI codes are exposed this way
  ```
  
`color` and `fg` are aliases for `foreground`
`bg` is an alias for `background`

`foreground`, `background`, `color`, `fg`, and `bg` take an argument that describes a color as follows:
  - A string that matches the name of a CSS color (ex. "Yellow")
  - A string that is a hex string description of the color ("#FFCC00")
  - An array of 3 floats between 0 and 1
  - An array of 4 things: "%", then the numbers between 0 and 256
  - An object with r/g/b or red/green/blue keys, and optionally a field called 'decimal' that if truth-y means you are specifying a color between 0.0-1.0 insetad of 0-255
  - A number with the ANSI color code

`fgbg` takes 2 arguments (a foreground color and a background color) of the same form.
