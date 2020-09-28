import React, { Component } from 'react';
import './App.css';

export default class Cases extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Case Page </h1>
          <a className="App-link" href="/caseinstance0" rel="noopener noreferrer">
            case 0
          </a>
          <a className="App-link" href="/caseinstance1" rel="noopener noreferrer">
            case 1
          </a>
          <a className="App-link" href="/caseinstance2" rel="noopener noreferrer">
            case 2
          </a>
          <a className="App-link" href="/" rel="noopener noreferrer">
            Click here to go back to the main page
          </a>
        </header>
      </div>
    );
  }
}