isString = require 'lodash-node/modern/objects/isString'
isArray = require 'lodash-node/modern/objects/isArray'
isNumber = require 'lodash-node/modern/objects/isNumber'
isObject = require 'lodash-node/modern/objects/isObject'

capitalizedCssColors = require './capitalized-css-colors.json'
colorDistance = require './color-distance'
xterm256Colors = require './xterm256-colors'
ansi = require './ansi'

BASIC_COLORS = {}
for c, i in ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']
  BASIC_COLORS[c] = i
BASIC_COLORS.grey = BASIC_COLORS.gray

SYSTEM_CODES = {}
for i in [0...16]
  SYSTEM_CODES["system" + xterm256Colors[i][0].toLowerCase()] = i

hexToAnsi = (hex) ->
  ansi.rgb(ansi.hex(hex)...)

namesToAnsiColors = {}
for name, hex of capitalizedCssColors
  namesToAnsiColors[name.toLowerCase()] = hexToAnsi hex

rgbToAnsi = ansi.rgb

rgbFloatToAnsi = (r, g, b) ->
  rgbToAnsi r / 255.0, g / 255.0, b / 255.0

nameForAnsi256ColorCode = (ansiColorCode) ->
  xterm256Colors[ansiColorCode][0]

class AnsiColorDescriptionError extends Error


ansi256ColorCodeForDescription = (desc) ->
  """Returns an ANSI color code for a given number

  Descriptions can either be:
  - A string that matches the name of a CSS color (ex. "Yellow")
  - A string that is a hex string description of the color ("#FFCC00")
  - An array of 3 floats between 0 and 1
  - An array of 4 things: "%", then the numbers between 0 and 256
  - An object with r/g/b or red/green/blue keys, and optionally a field called 'decimal' that if truth-y means you are specifying a color between 0.0-1.0 insetad of 0-255
  - A number with the ANSI color code

  """

  if isString desc

    if BASIC_COLORS[desc]?
      return BASIC_COLORS[desc]

    lc = desc.toLowerCase()

    if SYSTEM_CODES[lc]?
      return SYSTEM_CODES[lc]

    if namesToAnsiColors[lc]?
      return namesToAnsiColors[lc]

    if /^#?(?:[0-9a-f]{3}){1,2}$/i.test desc
      if desc.length < 6
        if lc[0] == '#'
          return hexToAnsi "#" + lc[1] + lc[1] + lc[2] + lc[2] + lc[3] + lc[3]
        else
          return hexToAnsi "#" + lc[0] + lc[0] + lc[1] + lc[1] + lc[2] + lc[2]
      else
        return hexToAnsi lc

    throw new AnsiColorDescriptionError "Don't know how to interpret String #{ desc }", desc

  if isArray desc
    if desc.length == 3
      return ansi.rgb desc...

    else if desc.length == 4
      unless desc[0] == '%'
        throw new AnsiColorDescriptionError "Arrays of length 4 must have the form ['%', red, blue, green]", desc
      return ansi.rgb desc[1] * 255, desc[2] * 255, desc[3] * 255

    else
      throw new AnsiColorDescriptionError "Don't know how to interpret an Array of length #{ desc.length }", desc

  if isObject desc
    r = desc.r ? desc.red ? throw new AnsiColorDescriptionError "Missing red component"
    g = desc.g ? desc.green ? throw new AnsiColorDescriptionError "Missing green component"
    b = desc.b ? desc.blue ? throw new AnsiColorDescriptionError "Missing blue component"

    if desc.decimal? and desc.decimal
      r *= 255
      g *= 255
      b *= 255

    return ansi.rgb r, g, b

  if isNumber desc
    if (desc % 1 > 0) or (desc < 0) or (desc > 255)
      throw new AnsiColorDescriptionError "Valid ANSI color codes are integers 0-255", desc
    return desc

  throw new AnsiColorDescriptionError "Don't know how to interpret description", desc


ansi256ColorCodeForDescription.nameForColorCode = nameForAnsi256ColorCode
ansi256ColorCodeForDescription.AnsiColorDescriptionError = AnsiColorDescriptionError

module.exports = ansi256ColorCodeForDescription
