var crayon = require('crayon');

var capitalizedCssColors = require('./capitalized-css-colors');

// Layer on the CSS color names
for (var c in capitalizedCssColors) {
  var fg = crayon[c] = crayon[c.toLowerCase()] = crayon(c);
  var bg = crayon['bg' + c] = crayon['bg' + c[0].toUpperCase() + c.slice(1).toLowerCase()] = crayon(undefined, c);
  for (var c2 in capitalizedCssColors) {
    fg['bg' + c2] = fg['bg' + c[0].toUpperCase() + c.slice(1).toLowerCase()] = crayon(c, c2);
    bg[c2] = bg[c2.toLowerCase()] = crayon(c, c2);
  }
}


module.exports = crayon;
