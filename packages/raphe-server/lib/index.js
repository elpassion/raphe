#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _raphe = require('raphe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const argv = require('yargs').argv;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const recordingRepository = new _raphe.SQLRecordingRepository(argv._[0]);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', _path2.default.join(__dirname, '../views'));

app.get("/", (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const recordings = yield recordingRepository.getAll();
    res.render('index', { recordings });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.get("/recordings/:name", (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const { name } = req.params;
    const recordings = yield recordingRepository.getAll(name);
    res.send(JSON.stringify(recordings));
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

app.delete("/recordings/:id", (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const { id } = req.params;
    yield recordingRepository.delete(id);
    res.status(204).send();
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

app.post("/recordings", (req, res) => {
  const { name, args, result } = req.body;
  recordingRepository.create({ name, args, result });
  res.status(201).send();
});

const port = argv.port || 3000;

app.listen(port, () => console.log(`Raphe is running on port ${port}!`));