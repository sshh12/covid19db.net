import React, { Component } from 'react';
// import './src/App.css';

export default class CountryInstance1 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> country instance 1 </h1>
          <a
            className="App-link"
            href="/countries"
            rel="noopener noreferrer"
          >
            Click here to go back to the countries page
                </a>
        </header>
      </div>
    );
  }
}