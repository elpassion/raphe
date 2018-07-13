import React from "react";
import TestRenderer from "react-test-renderer";
import { Raphe, SQLRecordingRepository } from "raphe";
import Toggle from "./Toggle";

const raphe = new Raphe({
  recordingRepository: new SQLRecordingRepository("/Users/elpassion/db.sqlite")
});

test("renders without crashing", async () => {
  const recordings = await raphe.getAllWithName("abc");

  recordings.forEach(recording => {
    const result = TestRenderer.create(<Toggle {...recording.args} />).toJSON();
    expect(recording.result).toEqual(result);
  });
});
