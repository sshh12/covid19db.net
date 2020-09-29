import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class Cases extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Case Page </h1>
          <LinkContainer className="App-link" to="/cases/GBR">
            <Button variant="outline-secondary" size="lg">
              Case 0
            </Button>
          </LinkContainer>
          <LinkContainer className="App-link" to="/cases/MEX">
            <Button variant="outline-secondary" size="lg">
              Case 1
            </Button>
          </LinkContainer>
          <LinkContainer className="App-link" to="/cases/USA">
            <Button variant="outline-secondary" size="lg">
              Case 2
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
