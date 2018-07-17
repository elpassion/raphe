import React from "react";
import Toggle from "./Toggle";
import { resultSerializer } from "raphe-react";

test("Raphe Toggle", async () => {
  const recordings = await raphe.getAllWithName("Toggle");
  console.log(recordings.length);

  recordings.forEach(recording => {
    const result = resultSerializer(<Toggle {...recording.args[0]} />);
    expect(recording.result).toEqual(result);
  });
});
