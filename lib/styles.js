/* @generated */"use strict";
var altHex, ansi256, capitalizedCssColors, closeCode, codes, hex, i, name, openCode, styles, xterm256Colors, _, _i, _j, _len, _ref, _ref1;

ansi256 = require('./ansi256');

capitalizedCssColors = require('./capitalized-css-colors');

xterm256Colors = require('./xterm256-colors');

codes = {
  reset: [0, 0],
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgblack: [40, 49],
  bgred: [41, 49],
  bggreen: [42, 49],
  bgyellow: [43, 49],
  bgblue: [44, 49],
  bgmagenta: [45, 49],
  bgcyan: [46, 49],
  bgwhite: [47, 49]
};

styles = {};

for (name in codes) {
  _ref = codes[name], openCode = _ref[0], closeCode = _ref[1];
  styles[name] = {
    open: "\u001b[" + openCode + "m",
    close: "\u001b[" + closeCode + "m"
  };
}

styles.color = styles.fg = styles.foreground = function(desc) {
  return {
    open: "\u001b[38;5;" + (ansi256(desc)) + "m",
    close: "\u001b[39m"
  };
};

styles.bg = styles.background = function(desc) {
  return {
    open: "\u001b[48;5;" + (ansi256(desc)) + "m",
    close: "\u001b[49m"
  };
};

styles.fgbg = function(fg, bg) {
  return {
    open: "\u001b[38;5;" + (ansi256(fg)) + ";48;5;" + (ansi256(bg)) + "m",
    close: "\u001b[39;49m"
  };
};

for (name in capitalizedCssColors) {
  _ = capitalizedCssColors[name];
  styles[name] = styles.color(name);
  styles["bg" + name] = styles.bg(name);
}

for (_i = 0, _len = xterm256Colors.length; _i < _len; _i++) {
  _ref1 = xterm256Colors[_i], name = _ref1[0], hex = _ref1[1];
  altHex = "x" + hex.slice(1).toUpperCase();
  styles[altHex] = styles.color(hex);
  styles["bg" + altHex] = styles.bg(hex);
}

for (i = _j = 0; _j < 256; i = ++_j) {
  styles["ansi" + i] = styles.color(i);
  styles["bgAnsi" + i] = styles.bg(i);
}

module.exports = styles;
