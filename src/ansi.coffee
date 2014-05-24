# From https://github.com/TooTallNate/ansi.js/blob/master/lib/ansi.js

###
Translates a 255 RGB value to a 0-5 ANSI RGV value,
then returns the single ANSI color code to use.
###
rgb = (r, g, b) ->
  red = r / 255 * 5
  green = g / 255 * 5
  blue = b / 255 * 5
  rgb5 red, green, blue

###
Turns rgb 0-5 values into a single ANSI color code to use.
###
rgb5 = (r, g, b) ->
  red = Math.round(r)
  green = Math.round(g)
  blue = Math.round(b)
  16 + (red * 36) + (green * 6) + blue

###
Accepts a hex CSS color code string (# is optional) and
translates it into an Array of 3 RGB 0-255 values, which
can then be used with rgb().
###
hex = (color) ->
  c = (if color[0] is "#" then color.substring(1) else color)
  r = c.substring(0, 2)
  g = c.substring(2, 4)
  b = c.substring(4, 6)
  [
    parseInt(r, 16)
    parseInt(g, 16)
    parseInt(b, 16)
  ]

module.exports =
  hex: hex
  rgb5: rgb5
  rgb: rgb
