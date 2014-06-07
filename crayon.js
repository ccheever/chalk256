// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  var VERY_DARK_COLORS, addColorFuncs, ansi256css, ansiStyle, backgroundCode, basics, begin, code, codes, color, crayon, cssToAnsi, end, foregroundCode, general, getColorNumber, hasColor, level, logLevels, makeStyleFunc, pkg, splitFlatten, stripAnsi, styleFunc, styleName, util, __doc__, _fn, _i, _len, _rainbow, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  __doc__ = "An implementation of `chalk` with better performance characteristics, 256 color support, a few other features, and built-in logging.\n";

  util = require('util');

  hasColor = require('has-color');

  stripAnsi = require('strip-ansi');

  ansi256css = require('./ansi256css');

  cssToAnsi = require('./css-to-ansi');

  logLevels = ['log', 'info', 'warn', 'error'];

  basics = {
    reset: [0, 0],
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    blink: [5, 25],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49]
  };

  basics.grey = basics.gray;

  basics.bgGrey = basics.bgGray;

  VERY_DARK_COLORS = [0, 16, 17, 18, 232, 233, 234, 235];

  codes = {};

  for (styleName in basics) {
    _ref = basics[styleName], begin = _ref[0], end = _ref[1];
    codes[styleName] = ['\u001b[' + begin + 'm', '\u001b[' + end + 'm'];
  }

  for (color in cssToAnsi) {
    code = cssToAnsi[color];
    if (basics[color] != null) {
      color = color + '_';
    }
    codes[color] = ['\u001b[38;5;' + code + 'm', '\u001b[39m'];
    codes['bg' + color[0].toUpperCase() + color.slice(1).toLowerCase()] = ['\u001b[48;5;' + code + 'm', '\u001b[49m'];
  }

  _rainbow = function(s) {
    var c, i;
    return ((function() {
      var _i, _len, _ref1, _results;
      _ref1 = stripAnsi(s);
      _results = [];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        c = _ref1[i];
        _results.push(crayon(i * 19 % 256 + 12 * (__indexOf.call(VERY_DARK_COLORS, i) >= 0))(c));
      }
      return _results;
    })()).join('');
  };

  addColorFuncs = function(obj, prevStyles) {
    "Adds functions like `.red` to an object";
    var n, name, newStyleFunc, style, _fn, _fn1, _fn2, _i, _j, _len, _ref1, _ref2;
    _fn = function(name, style) {
      return Object.defineProperty(obj, name, {
        enumerable: true,
        configurable: true,
        get: function() {
          var f, newStyles;
          newStyles = [styleFunc.apply(null, codes[name])].concat(prevStyles);
          f = makeStyleFunc(newStyles);
          f.__doc__ = "Applies the style '" + name + "' to the crayon";
          delete obj[name];
          return obj[name] = f;
        }
      });
    };
    for (name in codes) {
      style = codes[name];
      _fn(name, style);
    }
    _fn1 = function(n) {
      var x, _j, _len, _ref1;
      _ref1 = ["" + n, "_" + n];
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        x = _ref1[_j];
        Object.defineProperty(obj, x, {
          enumerable: true,
          configurable: true,
          get: function() {
            var f, newStyles;
            newStyles = [foregroundCode(n)].concat(prevStyles);
            f = makeStyleFunc(newStyles);
            f.___doc___ = "Sets the foreground color of the crayon to " + n;
            delete obj[n];
            return obj[n] = f;
          }
        });
      }
      return Object.defineProperty(obj, "bg" + n, {
        enumerable: true,
        configurable: true,
        get: function() {
          var f, newStyles;
          newStyles = [backgroundCode(n)].concat(prevStyles);
          f = makeStyleFunc(newStyles);
          f.___doc___ = "Sets the background color of the crayon to " + n;
          delete obj[n];
          return obj[n] = f;
        }
      });
    };
    for (n = _i = 0; _i < 256; n = ++_i) {
      _fn1(n);
    }
    _ref1 = [
      [
        'foreground', function(x) {
          return [foregroundCode(getColorNumber(x))];
        }
      ], [
        'background', function(x) {
          return [backgroundCode(getColorNumber(x))];
        }
      ], [
        'fgbg', function(fg, bg) {
          return [foregroundCode(getColorNumber(fg)), backgroundCode(getColorNumber(bg))];
        }
      ], ['color', general]
    ];
    _fn2 = function(name, newStyleFunc) {
      return obj[name] = function() {
        var desc;
        desc = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return makeStyleFunc(newStyleFunc.apply(null, desc).concat(prevStyles));
      };
    };
    for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
      _ref2 = _ref1[_j], name = _ref2[0], newStyleFunc = _ref2[1];
      _fn2(name, newStyleFunc);
    }
    obj.fg = obj.foreground;
    obj.bg = obj.background;
    obj._ = obj.color;
    Object.defineProperty(obj, 'rainbow', {
      enumerable: true,
      configurable: true,
      get: function() {
        var f, newStyles;
        newStyles = [_rainbow].concat(prevStyles);
        f = makeStyleFunc(newStyles);
        f.__doc__ = "Applies rainbow styling to the crayon!";
        delete obj.rainbow;
        return obj.rainbow = f;
      }
    });
    obj.color.__doc__ = "Applies any styles and colors you pass in; accepts multiple arguments";
    obj.foreground.__doc__ = "Sets the foreground color for the crayon";
    obj.background.__doc__ = "Sets the background color for the crayon";
    return obj.fgbg.__doc__ = "Takes two arguments -- a foreground color and a background color -- and applies those styles to the crayon";
  };

  styleFunc = function(begin, end) {
    return function(s) {
      return begin + s + end;
    };
  };

  makeStyleFunc = function(styles) {
    "Returns a function that applies a list of styles\n\nStyles are encoded using an Array of functions";
    var f, level, _fn, _i, _len;
    f = function() {
      var args, s, style, _i, _len;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      s = util.format.apply(util, args);
      if (crayon.enabled) {
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          s = style(s);
        }
      }
      return s;
    };
    addColorFuncs(f, styles);
    _fn = function(level) {
      return f[level] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return crayon.logger[level](f(util.format.apply(util, args)));
      };
    };
    for (_i = 0, _len = logLevels.length; _i < _len; _i++) {
      level = logLevels[_i];
      _fn(level);
    }
    return f;
  };

  getColorNumber = function(desc) {
    var num;
    num = ansi256css(desc);
    if (num == null) {
      throw new Error("Don't understand the color '" + desc + "'");
    }
    return num;
  };

  foregroundCode = function(number) {
    return styleFunc('\u001b[38;5;' + number + 'm', '\u001b[39m');
  };

  backgroundCode = function(number) {
    return styleFunc('\u001b[48;5;' + number + 'm', '\u001b[49m');
  };

  ansiStyle = function(desc) {
    var re;
    re = /^(bg|background):?/i;
    if (!re.test(desc)) {
      return foregroundCode(getColorNumber(desc));
    } else {
      return backgroundCode(getColorNumber(desc.replace(re, '')));
    }
  };

  splitFlatten = function(list) {
    "Turns something like ['red blue', 'white'] into ['red', 'blue', 'white']";
    var split, x;
    split = function(x) {
      if (typeof x === 'string') {
        return x.split(/\s+/);
      } else {
        return [x];
      }
    };
    return [].concat.apply([], (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        x = list[_i];
        _results.push(split(x));
      }
      return _results;
    })());
  };

  general = function() {
    var styles, t, x, _i, _len, _ref1, _results;
    styles = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    t = function(x) {
      if (codes[x] != null) {
        return styleFunc.apply(null, codes[x]);
      } else {
        return ansiStyle(x);
      }
    };
    _ref1 = splitFlatten(styles).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      x = _ref1[_i];
      _results.push(t(x));
    }
    return _results;
  };

  module.exports = crayon = function() {
    var styles;
    styles = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return makeStyleFunc(general.apply(null, styles));
  };

  addColorFuncs(crayon, []);

  crayon.supportsColor = hasColor;

  crayon.stripColor = stripAnsi;

  if (crayon.enabled == null) {
    crayon.enabled = hasColor;
  }

  if (crayon.logger == null) {
    crayon.logger = console;
  }

  _fn = function(level) {
    return Object.defineProperty(crayon, level, {
      enumerable: true,
      configurable: true,
      get: function() {
        return crayon.logger[level];
      }
    });
  };
  for (_i = 0, _len = logLevels.length; _i < _len; _i++) {
    level = logLevels[_i];
    _fn(level);
  }

  Object.defineProperty(crayon, 'success', {
    enumerable: true,
    configurable: true,
    get: function() {
      var _ref1, _ref2;
      return (_ref1 = (_ref2 = crayon.logger) != null ? _ref2.success : void 0) != null ? _ref1 : function() {
        var args, _ref3;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref3 = crayon.green).log.apply(_ref3, args);
      };
    }
  });

  crayon.palette = function() {
    "Displays all the colors";
    var i;
    return crayon.log(crayon.inverse(((function() {
      var _j, _results;
      _results = [];
      for (i = _j = 0; _j < 256; i = ++_j) {
        _results.push(crayon(i)("  " + (__indexOf.call(VERY_DARK_COLORS, i) >= 0 ? crayon.bgWhite(i) : i) + "  "));
      }
      return _results;
    })()).join('')));
  };

  crayon.__doc__ = require('fs').readFileSync(__dirname + '/README.md', 'utf8');

  pkg = require('./package');

  crayon.version = pkg.version;

  crayon.splitFlatten = splitFlatten;

}).call(this);
