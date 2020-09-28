import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class CaseInstance1 extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> case instance 1 </h1>
          <LinkContainer className='App-link' to='/cases'>
          <Button variant='outline-secondary'>Click here to go back to the cases page</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}

export default CaseInstance1;