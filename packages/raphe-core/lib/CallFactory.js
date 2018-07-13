"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallFactory = function () {
  function CallFactory(expectedErrors) {
    _classCallCheck(this, CallFactory);

    this.expectedErrors = expectedErrors || [];
  }

  _createClass(CallFactory, [{
    key: "callFor",
    value: function callFor(fn) {
      var _this = this;

      return function (args) {
        try {
          return fn.apply(undefined, _toConsumableArray(args));
        } catch (e) {
          var errorWasExpected = _this.expectedErrors.map(function (expectedError) {
            return e instanceof expectedError;
          }).includes(true);
          if (!errorWasExpected) {
            throw e;
          } else {
            return e;
          }
        }
      };
    }
  }]);

  return CallFactory;
}();

module.exports = CallFactory;