import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

export default class RiskInstanceUSA extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> risk instance 2 </h1>
          <LinkContainer className='App-link' to='/risks'>
            <Button variant='outline-secondary'>Click here to go back to the risks page</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}