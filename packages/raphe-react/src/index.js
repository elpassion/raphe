import React from "react";
import TestRenderer from "react-test-renderer";
import ServerRecordingRepository from "raphe/lib/ServerRecordingRepository";
import Raphe from "raphe/lib/Raphe";

const recordingRepository = new ServerRecordingRepository(
  "http://localhost:3001/recordings"
);
const raphe = new Raphe({ recordingRepository });

export const resultSerializer = result => {
  return TestRenderer.create(result).toJSON();
};

export class Recording extends React.Component {
  render() {
    const { name, ...options } = this.props;
    const record = process.env.NODE_ENV !== "test" && options.record;
    return raphe.create(this.props.name, {
      ...options,
      record,
      resultSerializer
    });
  }
}
