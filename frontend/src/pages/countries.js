import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
// import Table from "react-router-bootstrap";

export default class CountriesPage extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <h1> Select a Country </h1>
        <Table className="App" striped bordered hover>
          <thead>
            <tr>
              <th >Country</th>
              <th>ISO alpha2 code</th>
              <th>Languages</th>
              <th>Population</th>
              <th>Capital</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-0">
                  <Button variant="outline-secondary" size="lg">
                    Great Britain
                  </Button>
                </LinkContainer>
              </td>
              <td>GB</td>
              <td>English</td>
              <td>65110000</td>
              <td>London</td>
            </tr>
            <tr>
              <td>
                <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-1">
                  <Button variant="outline-secondary" size="lg">
                    USA
                  </Button>
                </LinkContainer>
              </td>
              <td>US</td>
              <td>English</td>
              <td>323,947,000</td>
              <td>Washington, D.C.</td>
            </tr>
            <tr>
              <td>
                <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-2">
                  <Button variant="outline-secondary" size="lg">
                    Mexico
                  </Button>
                </LinkContainer>
              </td>
              <td>MX</td>
              <td>Spanish</td>
              <td>122273473</td>
              <td>Mexico City</td>
              {/* <td colSpan="2">Larry the Bird</td> */}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
