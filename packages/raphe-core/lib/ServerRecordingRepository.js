"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = require("cross-fetch");

var ServerRecordingRepository = function () {
  function ServerRecordingRepository(serverUri) {
    _classCallCheck(this, ServerRecordingRepository);

    this.serverUri = serverUri;
  }

  _createClass(ServerRecordingRepository, [{
    key: "create",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var name = _ref2.name,
            args = _ref2.args,
            result = _ref2.result;
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch(this.serverUri, {
                  method: "POST",
                  body: JSON.stringify({ name: name, args: args, result: result }),
                  headers: { "content-type": "application/json" }
                });

              case 3:
                response = _context.sent;

                if (!(response.status !== 201)) {
                  _context.next = 6;
                  break;
                }

                throw response.status;

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                console.warn(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function create(_x) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
        var response, recordings;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return fetch(this.serverUri + "/" + name);

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();

              case 6:
                recordings = _context2.sent;
                return _context2.abrupt("return", recordings.map(function (recording) {
                  return {
                    id: recording.id,
                    name: recording.name,
                    args: JSON.parse(recording.args),
                    result: JSON.parse(recording.result)
                  };
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);

                console.warn(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function getAll(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "deleteAll",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return fetch(this.serverUri + "/" + name, {
                  method: "DELETE"
                });

              case 3:
                response = _context3.sent;

                if (!(response.status !== 204)) {
                  _context3.next = 6;
                  break;
                }

                throw response.status;

              case 6:
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                console.warn(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function deleteAll(_x3) {
        return _ref4.apply(this, arguments);
      }

      return deleteAll;
    }()
  }]);

  return ServerRecordingRepository;
}();

module.exports = ServerRecordingRepository;