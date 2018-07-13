import 'babel-polyfill';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toggle from './Toggle';

class App extends Component {
  state = {
    on: false,
  }

  toggle = () => {
    this.setState({on: !this.state.on})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.toggle}>Toggle</button>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Toggle on={this.state.on} />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
