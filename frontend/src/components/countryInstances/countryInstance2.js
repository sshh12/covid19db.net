import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

export default class CountryInstance2 extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> country instance 2 </h1>
          <LinkContainer className='App-link' to='/countries'>
            <Button variant='outline-secondary'>Click here to go back to the countries page</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}