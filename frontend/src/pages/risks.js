import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap'
import '../app.css';

export default class Risks extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Risk Page </h1>
          <LinkContainer className='App-link' to='/risk-instance-0'><Button variant='outline-secondary' size='lg'>Risk 0</Button></LinkContainer>
          <LinkContainer className='App-link' to='/risk-instance-1'><Button variant='outline-secondary' size='lg'>Risk 1</Button></LinkContainer>
          <LinkContainer className='App-link' to='/risk-instance-2'><Button variant='outline-secondary' size='lg'>Risk 2</Button></LinkContainer>
          <LinkContainer className='App-link' to='/'>
            <Button variant='outline-secondary'>Click here to go back to the main page</Button>
          </LinkContainer>
        </header>
      </div>
    );
  }
}