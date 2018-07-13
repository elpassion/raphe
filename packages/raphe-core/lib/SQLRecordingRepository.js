"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sqlite = require("sqlite3");

var _sqlite2 = _interopRequireDefault(_sqlite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SQLRecordingRepository = function () {
  function SQLRecordingRepository(dbPath) {
    _classCallCheck(this, SQLRecordingRepository);

    this.db = new _sqlite2.default.Database(dbPath);
    this.createTable();
  }

  _createClass(SQLRecordingRepository, [{
    key: "create",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var _this = this;

        var name = _ref2.name,
            args = _ref2.args,
            result = _ref2.result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.db.serialize(function () {
                  var params = {
                    $name: name,
                    $args: JSON.stringify(args),
                    $result: JSON.stringify(result)
                  };
                  _this.db.run("INSERT INTO recordings (name, args, result) VALUES ($name, $args, $result);", params, function (err) {
                    if (err) throw err;
                  });
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.db.all("SELECT name, args, result FROM recordings WHERE name = ?", name, function (err, rows) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(rows.map(function (row) {
                        return {
                          name: row.name,
                          args: JSON.parse(row.args),
                          result: JSON.parse(row.result)
                        };
                      }));
                    }
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.db.serialize(function () {
                  _this3.db.run("DELETE FROM recordings WHERE name = ?", name, function (err) {
                    if (err) throw err;
                  });
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteAll(_x3) {
        return _ref4.apply(this, arguments);
      }

      return deleteAll;
    }()
  }, {
    key: "createTable",
    value: function createTable() {
      var _this4 = this;

      this.db.serialize(function () {
        _this4.db.run("\n        CREATE TABLE IF NOT EXISTS recordings (\n          id INTEGER PRIMARY KEY AUTOINCREMENT, \n          name TEXT, \n          args BLOB, \n          result BLOB\n        )");
      });
    }
  }]);

  return SQLRecordingRepository;
}();

exports.default = SQLRecordingRepository;