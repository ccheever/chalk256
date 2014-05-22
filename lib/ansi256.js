/* @generated */var AnsiColorDescriptionError, SYSTEM_CODES, ansi, ansi256ColorCodeForDescription, capitalizedCssColors, colorDistance, hex, hexToAnsi, i, isArray, isNumber, isObject, isString, name, nameForAnsi256ColorCode, namesToAnsiColors, rgbFloatToAnsi, rgbToAnsi, xterm256Colors, _i,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

isString = require('lodash-node/modern/objects/isString');

isArray = require('lodash-node/modern/objects/isArray');

isNumber = require('lodash-node/modern/objects/isNumber');

isObject = require('lodash-node/modern/objects/isObject');

capitalizedCssColors = require('./capitalized-css-colors.json');

colorDistance = require('./color-distance');

xterm256Colors = require('./xterm256-colors');

ansi = require('./ansi');

SYSTEM_CODES = {};

for (i = _i = 0; _i < 16; i = ++_i) {
  SYSTEM_CODES["system" + xterm256Colors[i][0].toLowerCase()] = i;
}

hexToAnsi = function(hex) {
  return ansi.rgb.apply(ansi, ansi.hex(hex));
};

namesToAnsiColors = {};

for (name in capitalizedCssColors) {
  hex = capitalizedCssColors[name];
  namesToAnsiColors[name.toLowerCase()] = hexToAnsi(hex);
}

rgbToAnsi = ansi.rgb;

rgbFloatToAnsi = function(r, g, b) {
  return rgbToAnsi(r / 255.0, g / 255.0, b / 255.0);
};

nameForAnsi256ColorCode = function(ansiColorCode) {
  return xterm256Colors[ansiColorCode][0];
};

AnsiColorDescriptionError = (function(_super) {
  __extends(AnsiColorDescriptionError, _super);

  function AnsiColorDescriptionError() {
    return AnsiColorDescriptionError.__super__.constructor.apply(this, arguments);
  }

  return AnsiColorDescriptionError;

})(Error);

ansi256ColorCodeForDescription = function(desc) {
  "Returns an ANSI color code for a given number\n\nDescriptions can either be:\n- A string that matches the name of a CSS color (ex. \"Yellow\")\n- A string that is a hex string description of the color (\"#FFCC00\")\n- An array of 3 floats between 0 and 1\n- An array of 4 things: \"%\", then the numbers between 0 and 256\n- An object with r/g/b or red/green/blue keys, and optionally a field called 'decimal' that if truth-y means you are specifying a color between 0.0-1.0 insetad of 0-255\n- A number with the ANSI color code\n";
  var b, g, lc, r, _ref, _ref1, _ref2;
  if (isString(desc)) {
    lc = desc.toLowerCase();
    if (namesToAnsiColors[lc] != null) {
      return namesToAnsiColors[lc];
    }
    if (/^#?(?:[0-9a-f]{3}){1,2}$/i.test(desc)) {
      if (desc.length < 6) {
        if (lc[0] === '#') {
          return hexToAnsi("#" + lc[1] + lc[1] + lc[2] + lc[2] + lc[3] + lc[3]);
        } else {
          return hexToAnsi("#" + lc[0] + lc[0] + lc[1] + lc[1] + lc[2] + lc[2]);
        }
      } else {
        return hexToAnsi(lc);
      }
    }
    if (SYSTEM_CODES[lc] != null) {
      return SYSTEM_CODES[lc];
    }
    throw new AnsiColorDescriptionError("Don't know how to interpret String " + desc, desc);
  }
  if (isArray(desc)) {
    if (desc.length === 3) {
      return ansi.rgb.apply(ansi, desc);
    } else if (desc.length === 4) {
      if (desc[0] !== '%') {
        throw new AnsiColorDescriptionError("Arrays of length 4 must have the form ['%', red, blue, green]", desc);
      }
      return ansi.rgb(desc[1] * 255, desc[2] * 255, desc[3] * 255);
    } else {
      throw new AnsiColorDescriptionError("Don't know how to interpret an Array of length " + desc.length, desc);
    }
  }
  if (isObject(desc)) {
    r = (function() {
      var _ref1;
      if ((_ref = (_ref1 = desc.r) != null ? _ref1 : desc.red) != null) {
        return _ref;
      } else {
        throw new AnsiColorDescriptionError("Missing red component");
      }
    })();
    g = (function() {
      var _ref2;
      if ((_ref1 = (_ref2 = desc.g) != null ? _ref2 : desc.green) != null) {
        return _ref1;
      } else {
        throw new AnsiColorDescriptionError("Missing green component");
      }
    })();
    b = (function() {
      var _ref3;
      if ((_ref2 = (_ref3 = desc.b) != null ? _ref3 : desc.blue) != null) {
        return _ref2;
      } else {
        throw new AnsiColorDescriptionError("Missing blue component");
      }
    })();
    if ((desc.decimal != null) && desc.decimal) {
      r *= 255;
      g *= 255;
      b *= 255;
    }
    return ansi.rgb(r, g, b);
  }
  if (isNumber(desc)) {
    if ((desc % 1 > 0) || (desc < 0) || (desc > 255)) {
      throw new AnsiColorDescriptionError("Valid ANSI color codes are integers 0-255", desc);
    }
    return desc;
  }
  throw new AnsiColorDescriptionError("Don't know how to interpret description", desc);
};

ansi256ColorCodeForDescription.nameForColorCode = nameForAnsi256ColorCode;

ansi256ColorCodeForDescription.AnsiColorDescriptionError = AnsiColorDescriptionError;

module.exports = ansi256ColorCodeForDescription;
