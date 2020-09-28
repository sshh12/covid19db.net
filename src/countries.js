import React, { Component } from 'react';
import './App.css';

export default class CountriesPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Country Page </h1>
          <a className="App-link" href="/countryinstance0" rel="noopener noreferrer">
            country 0
          </a>
          <a className="App-link" href="/countryinstance1" rel="noopener noreferrer">
            country 1
          </a>
          <a className="App-link" href="/countryinstance2" rel="noopener noreferrer">
            country 2
          </a>
          <a className="App-link" href="/" rel="noopener noreferrer">
            Click here to go back to the main page
          </a>
        </header>
      </div>
    );
  }
}