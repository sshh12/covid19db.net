import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class CountriesPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Country Page </h1>
          <LinkContainer className="App-link" to="/country-instance-0">
            <Button variant="outline-secondary" size="lg">
              Country 0
            </Button>
          </LinkContainer>
          <LinkContainer className="App-link" to="/country-instance-1">
            <Button variant="outline-secondary" size="lg">
              Country 1
            </Button>
          </LinkContainer>
          <LinkContainer className="App-link" to="/country-instance-2">
            <Button variant="outline-secondary" size="lg">
              Country 2
            </Button>
          </LinkContainer>
          <LinkContainer className="App-link" to="/">
            <Button variant="outline-secondary">
              Click here to go back to the main page
            </Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}
