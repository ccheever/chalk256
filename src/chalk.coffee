"use strict"

chalk = require 'chalk'
styles = require './styles'
ansi256 = require './ansi256'

for name, val of styles
  chalk.styles[name] = val

chalk.nameForColorCode = ansi256.nameForColorCode

module.exports = chalk
