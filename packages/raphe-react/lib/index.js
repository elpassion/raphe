function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React from "react";
import TestRenderer from "react-test-renderer";
import { ServerRecordingRepository, Raphe } from "raphe";

const recordingRepository = new ServerRecordingRepository("http://localhost:6970/recordings");
// const raphe = new Raphe({recordingRepository});

export class Recording extends React.Component {
  constructor(...args) {
    var _temp, _this;

    return _temp = _this = super(...args), this.record = _asyncToGenerator(function* () {
      try {
        const result = TestRenderer.create(_this.props.children).toJSON();
        const response = yield recordingRepository.create({ name: _this.props.name, args: _this.props.args, result });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }), _temp;
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') this.record();
  }

  componentDidUpdate(prevProps, prevState) {
    if (process.env.NODE_ENV !== 'test' && (prevProps !== this.props || prevState !== this.state)) this.record();
  }

  render() {
    return this.props.children;
  }
}