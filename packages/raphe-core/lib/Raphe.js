"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isEqualWith = require("lodash.isequalwith");
var CallFactory = require("./CallFactory");

var Raphe = function () {
  function Raphe(_ref) {
    var recordingRepository = _ref.recordingRepository;

    _classCallCheck(this, Raphe);

    this.recordingRepository = recordingRepository;
  }

  _createClass(Raphe, [{
    key: "create",
    value: function create(name, _ref2) {
      var oldFn = _ref2.old,
          args = _ref2.args,
          record = _ref2.record,
          newFn = _ref2.new,
          expectedErrors = _ref2.expectedErrors,
          callBoth = _ref2.callBoth;

      var callFactory = new CallFactory(expectedErrors);

      if (callBoth) {
        var newResult = callFactory.callFor(newFn)(args);
        var oldResult = callFactory.callFor(oldFn)(args);
        if (!isEqualWith(newResult, oldResult)) {
          throw new Error("ResultMismatch");
        }
        return newResult;
      } else {
        var calledFunction = record ? oldFn : newFn || oldFn;
        var result = callFactory.callFor(calledFunction)(args);
        if (record) this.recordingRepository.create({ name: name, args: args, result: result });
        return result;
      }
    }
  }, {
    key: "deleteAllWithName",
    value: function deleteAllWithName(name) {
      return this.recordingRepository.deleteAll(name);
    }
  }, {
    key: "getAllWithName",
    value: function getAllWithName(name) {
      return this.recordingRepository.getAll(name);
    }
  }]);

  return Raphe;
}();

module.exports = Raphe;