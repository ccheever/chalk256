'use strict';

var ansi = require('./styles');
var ansi256 = require('./ansi256');
var stripAnsi = require('strip-ansi');
var hasColor = require('has-color');
var defineProps = Object.defineProperties;
var chalk = module.exports;
chalk.nameForColorCode = ansi256.nameForColorCode

var styles = (function () {
	var ret = {};

	ansi.grey = ansi.gray;

	Object.keys(ansi).forEach(function (key) {
		ret[key] = {
			get: function () {
				this._styles.push(key);
				return this;
			}
		};
	});

	return ret;
})();

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		if (!({ foreground: true, background: true, fg: true, bg: true, color: true, fgbg: true }[name])) {
			ret[name] = {
				get: function () {
					var obj = defineProps(function self() {
						var str = [].slice.call(arguments).join(' ');

						if (!chalk.enabled) {
							return str;
						}

						return self._styles.reduce(function (str, name) {
							var code = ansi[name];
							return str ? code.open + str + code.close : '';
						}, str);
					}, styles);

					obj._styles = [];

					return obj[name];
				}
			};
		}

	});

	return ret;
}

defineProps(chalk, init());

chalk.styles = ansi;
chalk.stripColor = stripAnsi;
chalk.supportsColor = hasColor;

var wrap = function (code) {
	return function (str) {
		if (!chalk.enabled) {
			return str;
		} else {
			return str ? code.open + str + code.close : '';
		}
	}
};

var wrap2 = function (f) {
	return function (arg1, arg2) {
		return wrap(f(arg1, arg2));
	}
}

chalk.color = chalk.fg = chalk.foreground = wrap2(ansi.foreground);
chalk.bg = chalk.background = wrap2(ansi.background);
chalk.fgbg = wrap2(ansi.fgbg);

// detect mode if not set manually
if (chalk.enabled === undefined) {
	chalk.enabled = chalk.supportsColor;
}
