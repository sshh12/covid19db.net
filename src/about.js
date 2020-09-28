import React, { Component } from 'react';
import './App.css';

export default class About extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> About Page </h1>
          <a
            className="App-link"
            href="/"
            rel="noopener noreferrer"
          >
            Click here to go to the main page
                </a>
        </header>

      </div>
    );
  }
}