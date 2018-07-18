import React from "react";
import TestRenderer from "react-test-renderer";
import ServerRecordingRepository from "raphe/lib/ServerRecordingRepository";
import Raphe from "raphe/lib/Raphe";
import prettyFormat from "pretty-format";
const { ReactTestComponent } = prettyFormat.plugins;

const recordingRepository = new ServerRecordingRepository(
  "http://localhost:3001/recordings"
);
const raphe = new Raphe({ recordingRepository });

export const resultSerializer = result => {
  return prettyFormat(TestRenderer.create(result), {
    plugins: [ReactTestComponent],
    printFunctionName: false
  });
};

export class Recording extends React.Component {
  render() {
    if(process.env.NODE_ENV === "test") {
      console.warn("You are testing a <Recording /> component. It can cause warnings regarding multiple render calls.");
    }
    const { name, ...options } = this.props;
    const record = process.env.NODE_ENV !== "test" && options.record;
    return raphe.create(this.props.name, {
      ...options,
      record,
      resultSerializer
    });
  }
}
