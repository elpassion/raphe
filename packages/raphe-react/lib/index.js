"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recording = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require("react-test-renderer");

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _ServerRecordingRepository = require("raphe/lib/ServerRecordingRepository");

var _ServerRecordingRepository2 = _interopRequireDefault(_ServerRecordingRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recordingRepository = new _ServerRecordingRepository2.default("http://localhost:3001/recordings");
// const raphe = new Raphe({recordingRepository});

var Recording = exports.Recording = function (_React$Component) {
  _inherits(Recording, _React$Component);

  function Recording() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Recording);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recording.__proto__ || Object.getPrototypeOf(Recording)).call.apply(_ref, [this].concat(args))), _this), _this.record = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              result = _reactTestRenderer2.default.create(_this.props.children).toJSON();
              _context.next = 4;
              return recordingRepository.create({ name: _this.props.name, args: _this.props.args, result: result });

            case 4:
              response = _context.sent;

              console.log(response);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              console.log(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 8]]);
    })), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Recording, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV !== 'test') this.record();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (process.env.NODE_ENV !== 'test' && (prevProps !== this.props || prevState !== this.state)) this.record();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Recording;
}(_react2.default.Component);