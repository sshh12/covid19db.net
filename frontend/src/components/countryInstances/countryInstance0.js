import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

// Area - 242900.0
// ISO alpha3 code - GBR
// Alternate names - United Kingdom of Great Britain and Northern Ireland, GB, UK, Great Britain
// Region - Europe
// Subregion - Northern Europe
// Latitude lat - 54.0
// Longitude lng - -2.0
// Regional blocs - European Union
// Currencies - British pound
// Bordering countries - IRL
// Time zones         "UTC-08:00","UTC-05:00","UTC-04:00","UTC-03:00","UTC-02:00",
// "UTC","UTC+01:00","UTC+02:00","UTC+06:00"
// Calling codes - 44
// Media: flag, interactive map, related COVID-19 news, 
//         image of capital, interactive map of capital


export default class CountryInstance0 extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Great Britain </h1>
          <LinkContainer className='App-link' to='/countries'>
            <Button variant='outline-secondary'>Click here to go back</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}