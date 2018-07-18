import React from "react";
import { Recording } from "raphe-react";

export const ToggleImpl = props => {
  return <button onClick={props.toggle}>{props.on ? "ON" : "OFF"}</button>;
};

const Toggle = props => {
  return (
    <Recording
      name="Toggle"
      args={[props]}
      old={props => <ToggleImpl {...props} />}
    />
  );
};

export default Toggle;
