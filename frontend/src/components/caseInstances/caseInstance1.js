import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import { Totals, NewStats, GenStats, CaseResponseLine } from './caseComponents';
import "./caseInstance.css";
import MEXData from './data/MEX.json';


class CaseInstanceMEX extends Component {

  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/cases'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {MEXData.country.name} ({MEXData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <Totals title="Total Cases" data={MEXData.totals.cases} />
            <Totals title="Total Active" data={MEXData.totals.active} />
            <Totals title="Total Deaths" data={MEXData.totals.deaths} />
            <Totals title="Total Recovered" data={MEXData.totals.recovered} />
          </div>
          <div>
            <div id='new-stats-title-div'>
              <h2 id='subtitle'>Today's Stats</h2>
              <h2 id='new-stats-date'>{MEXData.date}</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <NewStats title="Cases" data={MEXData.new.cases} yesterday={MEXData.derivativeNew.cases} />
              <NewStats title="Active" data={MEXData.new.active} yesterday={MEXData.derivativeNew.active} />
              <NewStats title="Deaths" data={MEXData.new.deaths} yesterday={MEXData.derivativeNew.deaths} />
              <NewStats title="Recovered" data={MEXData.new.recovered} yesterday={MEXData.derivativeNew.recovered} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h2 id='subtitle'>General Stats</h2>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GenStats title="Fatality Rate" data={MEXData.percentages.fatality} description='total deaths/total cases' />
              <GenStats title="Infection Rate" data={MEXData.percentages.infected} description='total cases/total population' />
              <GenStats title="Recovery Rate" data={MEXData.percentages.haveRecovered} description='total recovered/total cases' />
              <GenStats title="Active Rate" data={MEXData.percentages.active} description='total active/total cases' />
            </div>
          </div>
          <div style={{ marginTop: '50px', height: '500px', width: '100%' }}>
            <h2 id='subtitle'>Trends and Visuals</h2>
            <CaseResponseLine data={MEXData} />
          </div>
        </header>
      </div>
    );
  }
}

export default CaseInstanceMEX;