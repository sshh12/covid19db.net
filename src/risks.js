import React, { Component } from 'react';
import './App.css';

export default class Risks extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Risk Page </h1>
          <a className="App-link" href="/riskinstance0" rel="noopener noreferrer">
            risk 0
          </a>
          <a className="App-link" href="/riskinstance1" rel="noopener noreferrer">
            risk 1
          </a>
          <a className="App-link" href="/riskinstance2" rel="noopener noreferrer">
            risk 2
          </a>
          <a className="App-link" href="/" rel="noopener noreferrer">
            Click here to go back to the main page
          </a>
        </header>

      </div>
    );
  }
}