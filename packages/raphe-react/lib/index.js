"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recording = exports.resultSerializer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require("react-test-renderer");

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ServerRecordingRepository = require("raphe/lib/ServerRecordingRepository");

var _ServerRecordingRepository2 = _interopRequireDefault(_ServerRecordingRepository);

var _Raphe = require("raphe/lib/Raphe");

var _Raphe2 = _interopRequireDefault(_Raphe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recordingRepository = new _ServerRecordingRepository2.default("http://localhost:3001/recordings");
var raphe = new _Raphe2.default({ recordingRepository: recordingRepository });

var resultSerializer = exports.resultSerializer = function resultSerializer(result) {
  return _reactTestRenderer2.default.create(result).toJSON();
};

var Recording = exports.Recording = function (_React$Component) {
  _inherits(Recording, _React$Component);

  function Recording() {
    _classCallCheck(this, Recording);

    return _possibleConstructorReturn(this, (Recording.__proto__ || Object.getPrototypeOf(Recording)).apply(this, arguments));
  }

  _createClass(Recording, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          name = _props.name,
          options = _objectWithoutProperties(_props, ["name"]);

      var record = process.env.NODE_ENV !== "test" && options.record;
      return raphe.create(this.props.name, _extends({}, options, {
        record: record,
        resultSerializer: resultSerializer
      }));
    }
  }]);

  return Recording;
}(_react2.default.Component);