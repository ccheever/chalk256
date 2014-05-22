/* @generated */"use strict";
var ansi256, chalk, name, styles, val;

chalk = require('chalk');

styles = require('./styles');

ansi256 = require('./ansi256');

for (name in styles) {
  val = styles[name];
  chalk.styles[name] = val;
}

chalk.nameForColorCode = ansi256.nameForColorCode;

module.exports = chalk;
