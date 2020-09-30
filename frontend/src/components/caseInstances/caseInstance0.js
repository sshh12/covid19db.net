import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import { Totals, NewStats, GenStats, CaseResponseLine } from './caseComponents';
import "./caseInstance.css";
import GBRData from './data/GBR.json';


class CaseInstanceGBR extends Component {

  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/cases'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {GBRData.country.name} ({GBRData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <Totals title="Total Cases" data={GBRData.totals.cases} />
            <Totals title="Total Active" data={GBRData.totals.active} />
            <Totals title="Total Deaths" data={GBRData.totals.deaths} />
            <Totals title="Total Recovered" data={GBRData.totals.recovered} />
          </div>
          <div>
            <div id='new-stats-title-div'>
              <h2 id='subtitle'>Today's Stats</h2>
              <h2 id='new-stats-date'>{GBRData.date}</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <NewStats title="Cases" data={GBRData.new.cases} yesterday={GBRData.derivativeNew.cases} />
              <NewStats title="Active" data={GBRData.new.active} yesterday={GBRData.derivativeNew.active} />
              <NewStats title="Deaths" data={GBRData.new.deaths} yesterday={GBRData.derivativeNew.deaths} />
              <NewStats title="Recovered" data={GBRData.new.recovered} yesterday={GBRData.derivativeNew.recovered} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h2 id='subtitle'>General Stats</h2>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GenStats title="Fatality Rate" data={GBRData.percentages.fatality} description='total deaths/total cases' />
              <GenStats title="Infection Rate" data={GBRData.percentages.infected} description='total cases/total population' />
              <GenStats title="Recovery Rate" data={GBRData.percentages.haveRecovered} description='total recovered/total cases' />
              <GenStats title="Active Rate" data={GBRData.percentages.active} description='total active/total cases' />
            </div>
          </div>
          <div style={{ marginTop: '50px', height: '500px', width: '100%' }}>
            <h2 id='subtitle'>Trends and Visuals</h2>
            <CaseResponseLine data={GBRData} />
          </div>
        </header>
      </div>
    );
  }
}

export default CaseInstanceGBR;