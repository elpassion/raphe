import React from "react";
import TestRenderer from "react-test-renderer";
import ServerRecordingRepository from "raphe/lib/ServerRecordingRepository";

const recordingRepository = new ServerRecordingRepository("http://localhost:3001/recordings");
// const raphe = new Raphe({recordingRepository});

export class Recording extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') this.record();
  }

  componentDidUpdate(prevProps, prevState) {
    if (process.env.NODE_ENV !== 'test' && (prevProps !== this.props || prevState !== this.state)) this.record();
  }

  record = async () => {
    try {
      const result = TestRenderer.create(this.props.children).toJSON();
      const response = await recordingRepository.create({name: this.props.name, args: this.props.args, result});
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return this.props.children;
  }
}
