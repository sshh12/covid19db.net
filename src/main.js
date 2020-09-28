import React, { Component } from 'react';
import './App.css';

export default class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Main Page </h1>
          <a className="App-link" href="/about" rel="noopener noreferrer">
            About Page
          </a>
          <a className="App-link" href="/splash" rel="noopener noreferrer">
            Splash Page
          </a>
          <a className="App-link" href="/countries" rel="noopener noreferrer">
            Countries Page
          </a>
          <a className="App-link" href="/cases" rel="noopener noreferrer">
            Cases page
          </a>
          <a className="App-link" href="/risks" rel="noopener noreferrer">
            Risks Page
          </a>
        </header>
      </div>
    );
  }
}