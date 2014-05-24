init = ->
  ret = {}
  Object.keys(styles).forEach (name) ->
    unless
      foreground: true
      background: true
      fg: true
      bg: true
      color: true
      fgbg: true
    [{name}]
      ret[name] = get: ->
        obj = defineProps(self = ->
          str = [].slice.call(arguments_).join(" ")
          return str  unless chalk.enabled
          self._styles.reduce ((str, name) ->
            code = ansi[name]
            (if str then code.open + str + code.close else "")
          ), str
        , styles)
        obj._styles = []
        obj[name]
    return

  ret
"use strict"
ansi = require("./styles")
ansi256 = require("./ansi256")
stripAnsi = require("strip-ansi")
hasColor = require("has-color")
defineProps = Object.defineProperties
chalk = (fg, bg) ->
  if (typeof (bg) is `undefined`) or (not bg)
    chalk.fg fg
  else
    chalk.fgbg fg, bg

module.exports = chalk
chalk.nameForColorCode = ansi256.nameForColorCode
styles = (->
  ret = {}
  ansi.grey = ansi.gray
  Object.keys(ansi).forEach (key) ->
    ret[key] = get: ->
      @_styles.push key
      this

    return

  ret
)()
defineProps chalk, init()
chalk.styles = ansi
chalk.stripColor = stripAnsi
chalk.supportsColor = hasColor
wrap = (code) ->
  (str) ->
    unless chalk.enabled
      str
    else
      (if str then code.open + str + code.close else "")

wrap2 = (f) ->
  (arg1, arg2) ->
    wrap f(arg1, arg2)

chalk.color = chalk.fg = chalk.foreground = wrap2(ansi.foreground)
chalk.bg = chalk.background = wrap2(ansi.background)
chalk.fgbg = wrap2(ansi.fgbg)

# detect mode if not set manually
chalk.enabled = chalk.supportsColor  if chalk.enabled is `undefined`
