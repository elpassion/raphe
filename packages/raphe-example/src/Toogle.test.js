import React from "react";
import TestRenderer from "react-test-renderer";
import Toggle from "./Toggle";

test("renders without crashing", async () => {
  const recordings = await raphe.getAllWithName("abc");

  recordings.forEach(recording => {
    const result = TestRenderer.create(<Toggle {...recording.args} />).toJSON();
    expect(recording.result).toEqual(result);
  });
});
