"use strict"

ansi256 = require './ansi256'
capitalizedCssColors = require './capitalized-css-colors'
xterm256Colors = require './xterm256-colors'

codes =
  reset: [0, 0]

  bold: [1, 22]
  italic: [3, 23]
  underline: [4, 24]
  inverse: [7, 27]
  strikethrough: [9, 29]

  black: [30, 39]
  red: [31, 39]
  green: [32, 39]
  yellow: [33, 39]
  blue: [34, 39]
  magenta: [35, 39]
  cyan: [36, 39]
  white: [37, 39]
  gray: [90, 39]

  bgblack: [40, 49]
  bgred: [41, 49]
  bggreen: [42, 49]
  bgyellow: [43, 49]
  bgblue: [44, 49]
  bgmagenta: [45, 49]
  bgcyan: [46, 49]
  bgwhite: [47, 49]

styles = {}
for name, [openCode, closeCode] of codes
  styles[name] =
    open: "\u001b[#{ openCode }m"
    close: "\u001b[#{ closeCode }m"

styles.color = styles.fg = styles.foreground = (desc) -> {
  open: "\u001b[38;5;#{ ansi256 desc }m"
  close: "\u001b[39m"
}

styles.bg = styles.background = (desc) -> {
  open: "\u001b[48;5;#{ ansi256 desc }m"
  close: "\u001b[49m"
}

styles.fgbg = (fg, bg) -> {
  open: "\u001b[38;5;#{ ansi256 fg };48;5;#{ ansi256 bg }m"
  close: "\u001b[39;49m"
}

for name, _ of capitalizedCssColors
  styles[name] = styles.color name
  styles["bg" + name] = styles.bg name

for [name, hex] in xterm256Colors
  altHex = "$" + hex[1...].toLowerCase()
  styles[altHex] = styles.color hex
  styles["bg" + altHex] = styles.bg hex

module.exports = styles
