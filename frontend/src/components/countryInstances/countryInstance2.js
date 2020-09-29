import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

// Area
// ISO alpha3 code
// Alternate names
// Region
// Subregion
// Latitude
// Longitude
// Regional blocs
// Currencies
// Bordering countries
// Time zones
// Calling codes
// Media: flag, interactive map, related COVID-19 news, 
//         image of capital, interactive map of capital


export default class CountryInstance2 extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Mexico </h1>
          <LinkContainer className='App-link' to='/countries'>
            <Button variant='outline-secondary'>Click here to go back to the countries page</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}