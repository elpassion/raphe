import React from "react";
import { ToggleImpl } from "./Toggle";
import { resultSerializer } from "raphe-react";
import safeEval from "safe-eval";

test("Raphe Toggle", async () => {
  const recordings = await raphe.getAllWithName("Toggle");

  recordings.forEach(recording => {
    const args = safeEval(`(${recording.args})`);
    const props = args[0];
    const result = resultSerializer(<ToggleImpl {...props} />);
    expect(recording.result).toEqual(result);
  });
});
