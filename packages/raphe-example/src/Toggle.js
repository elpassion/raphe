import React from "react";
import { Recording } from "raphe-react";

class ToggleImpl extends React.Component {
  state = { on: false };

  toggle = () => {
    this.setState({ on: !this.state.on });
  }

  render() {
    return this.state.on ? <div>ON</div> : <div onClick={() => this.setState({on: true})}>OFF</div>;
  }
}

export const NewToggleImpl = props => {
  return props.on ? <div>ON</div> : <div onClick={() => {}}>OFF</div>;
};

const Toggle = props => {
  return (
    <Recording
      name="Toggle"
      args={[props]}
      old={(props) => <ToggleImpl {...props} />}
      new={(props) => <NewToggleImpl {...props} />}
      callBoth
    />
  );
};

export default Toggle;
