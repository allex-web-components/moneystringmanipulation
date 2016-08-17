(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function createLib(isString, isNumber, prependToString) {
  'use strict';

  function toMoneyError(str, decimalplaces) {
    return new Error('Money string '+str+' has to be a positive decimal number with '+decimalplaces+' decimal places');
  }


  function toMoney (str, power, regexp, decimalplaces) {
    var parts;
    if (!power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!isString(str)) {
      throw new Error('Input parameter has to be a string');
    }
    parts = regexp.exec(str);
    if (!(parts && parts.length===3)) {
      throw toMoneyError(str, decimalplaces);
    }
    return parseInt(parts[1])*power + parseInt(parts[2]);
  }

  function createRegexp (decimalplaces) {
    return new RegExp('^\\s*(\\d{1,})\.(\\d{'+decimalplaces+'})\\s*$');
  }

  function fromMoney (num, power, decimalplaces) {
    if (!power) {
      throw new Error('MoneyStringManipulator already destroyed');
    }
    if (!(isNumber(num) && num>=0 && (~~(num) === num))) {
      throw new Error('Input parameter has to be a positive integer');
    }
    return (~~(num/power)+'.'+prependToString('0', decimalplaces, ''+num%power));
  }

  function MoneyStringManipulator (decimalplaces) {
    if (!isNumber(decimalplaces)) {
      throw new Error('decimalplases has to be a number');
    }
    this.decimalplaces = decimalplaces;
    this.regexp = createRegexp(decimalplaces);
    this.power = Math.pow(10, this.decimalplaces);
  }
  MoneyStringManipulator.prototype.destroy = function () {
    this.power = null;
    this.regexp = null;
    this.decimalplaces = null;
  };

  MoneyStringManipulator.prototype.toMoney = function (str) {
    return toMoney(str, this.power, this.regexp, this.decimalplaces);
  };

  MoneyStringManipulator.prototype.fromMoney = function (num) {
    return fromMoney (num, this.power, this.decimalplaces);
  };

  return {
    MoneyStringManipulator: MoneyStringManipulator,
    toMoney : function (str, decimalplaces) {
      return toMoney (str, Math.pow(10, decimalplaces), createRegexp(decimalplaces), decimalplaces);
    },
    fromMoney : function (num, decimalplaces) {
      return fromMoney (num, Math.pow(10, decimalplaces), decimalplaces);
    }
  };
}

module.exports = createLib;

},{}],2:[function(require,module,exports){
ALLEX.LOW_LEVEL_LIBS['allex_moneystringmanipulationlowlevellib'] = require('allex_moneystringmanipulationlowlevellib')(ALLEX.lib.isString, ALLEX.lib.isNumber, ALLEX.lib.prependToString);

},{"allex_moneystringmanipulationlowlevellib":1}]},{},[2]);
