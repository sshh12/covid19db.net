import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";

export default class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Main Page </h1>
          <ButtonGroup vertical>
            <LinkContainer className="App-link" to="/about" size="lg">
              <Button variant="outline-secondary">About Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/countries" size="lg">
              <Button variant="outline-secondary">Countries Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/cases" size="lg">
              <Button variant="outline-secondary">Cases Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/risks" size="lg">
              <Button variant="outline-secondary">Risks Page</Button>
            </LinkContainer>
          </ButtonGroup>
        </header>
      </div>
    );
  }
}
