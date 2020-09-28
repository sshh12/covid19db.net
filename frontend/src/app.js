import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Routes from "./routes";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>COVID-19 DB</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/countries">
                <Nav.Link>Countries</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cases">
                <Nav.Link>Cases</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/risks">
                <Nav.Link>Risks</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search not ready yet... :("
                className="searchbar"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </Fragment>
    );
  }
}

export default App;
