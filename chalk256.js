var crayon = require('crayon');

var capitalizedCssColors = require('./capitalized-css-colors');

// Layer on the CSS color names
for (var colorName in capitalizedCssColors) {
  crayon[colorName] = crayon[colorName.toLowerCase()] = crayon(colorName);
  crayon['bg' + colorName] = crayon['bg' + colorName[0].toUpperCase() + colorName.slice(1).toLowerCase()] = crayon(undefined, colorName);
}


module.exports = crayon;
