import React, { Component } from 'react';
// import './App.css';

export default class CaseInstance1 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> case instance 1 </h1>
          <a
            className="App-link"
            href="/cases"
            rel="noopener noreferrer"
          >
            Click here to go back to the cases page
                </a>
        </header>
      </div>
    );
  }
}