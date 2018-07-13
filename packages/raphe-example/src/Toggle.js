import React from "react";
import { Recording } from "raphe-react";

const Toggle = (props) => {
  return (
    <Recording name="abc" args={props}>
      {props.on ? <div>ON</div> : <div>OFF</div>}
    </Recording>
  );
};

export default Toggle;
