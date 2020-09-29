import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Collapse, Statistic, Card, Row, Col } from 'antd';
import "./caseInstance.css";

import GBRData from './data/GBR.json';

function Totals(props) {
  return <div className='totals'>
    <h3 className='totals-title'>{props.title}</h3>
    <h2 className='totals-data'>{props.data}</h2>
  </div>
}

function NewStats(props) {
  return <div className='new-stats'>
    <h3>{props.title}</h3>
    <h2>{props.data}</h2>
  </div>
}

class CaseInstanceGBR extends Component {
  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <h1 id='page-title'> {GBRData.country.name} ({GBRData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <Totals title="Total Cases" data={GBRData.totals.cases} />
            <Totals title="Total Active" data={GBRData.totals.active} />
            <Totals title="Total Deaths" data={GBRData.totals.deaths} />
            <Totals title="Total Recovered" data={GBRData.totals.recovered} />
          </div>
          <div>
            <h1>New</h1>
            <h2>{GBRData.date}</h2>
            <NewStats title="Cases" data={GBRData.new.cases} />
            <NewStats title="Active" data={GBRData.new.active} />
            <NewStats title="Deaths" data={GBRData.new.deaths} />
            <NewStats title="Recovered" data={GBRData.new.recovered} />
          </div>


          <LinkContainer className='App-link' to='/cases'>
            <Button variant='outline-secondary'>Click here to go back to the cases page</Button>
          </LinkContainer>
          <p>Hello</p>
        </header>
      </div>
    );
  }
}

export default CaseInstanceGBR;