"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash.isequalwith");

var _lodash2 = _interopRequireDefault(_lodash);

var _CallFactory = require("./CallFactory");

var _CallFactory2 = _interopRequireDefault(_CallFactory);

var _serializeJavascript = require("serialize-javascript");

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
          callBoth = _ref2.callBoth,
          resultSerializer = _ref2.resultSerializer;

      var callFactory = new _CallFactory2.default(expectedErrors);

      if (callBoth) {
        var newResult = callFactory.callFor(newFn)(args);
        var oldResult = callFactory.callFor(oldFn)(args);
        var serializedNewResult = resultSerializer ? resultSerializer(newResult) : newResult;
        var serializedOldResult = resultSerializer ? resultSerializer(oldResult) : oldResult;
        if (!(0, _lodash2.default)(serializedNewResult, serializedOldResult)) {
          throw new Error("ResultMismatch, expected new: " + serializedNewResult + " to equal old: " + serializedOldResult);
        }
        return newResult;
      } else {
        var calledFunction = record ? oldFn : newFn || oldFn;
        var result = callFactory.callFor(calledFunction)(args);
        if (record) {
          var serializedResult = resultSerializer ? resultSerializer(result) : result;
          var serializedArgs = (0, _serializeJavascript2.default)(args);
          this.recordingRepository.create({ name: name, args: serializedArgs, result: serializedResult });
        }
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