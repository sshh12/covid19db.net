import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import { Totals, NewStats, GenStats, CaseResponseLine } from './caseComponents';
import Map from "../../components/map";
import "./caseInstance.css";
import USAData from './data/USA.json';
import TestData from './data/testing-data.json';


class CaseInstanceUSA extends Component {

  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/cases'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {USAData.country.name} ({USAData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <Totals title="Total Cases" data={USAData.totals.cases} />
            <Totals title="Total Active" data={USAData.totals.active} />
            <Totals title="Total Deaths" data={USAData.totals.deaths} />
            <Totals title="Total Recovered" data={USAData.totals.recovered} />
            <Totals title="Total Tests" data={TestData.USA.totalTests.value} />
          </div>
          <div>
            <div id='new-stats-title-div'>
              <h2 id='subtitle'>Today's Stats</h2>
              <h2 id='new-stats-date'>{USAData.date}</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <NewStats title="Cases" data={USAData.new.cases} yesterday={USAData.derivativeNew.cases} />
              <NewStats title="Active" data={USAData.new.active} yesterday={USAData.derivativeNew.active} />
              <NewStats title="Deaths" data={USAData.new.deaths} yesterday={USAData.derivativeNew.deaths} />
              <NewStats title="Recovered" data={USAData.new.recovered} yesterday={USAData.derivativeNew.recovered} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h2 id='subtitle'>General Stats</h2>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GenStats title="Fatality Rate" data={USAData.percentages.fatality} description='total deaths/total cases' />
              <GenStats title="Infection Rate" data={USAData.percentages.infected} description='total cases/total population' />
              <GenStats title="Recovery Rate" data={USAData.percentages.haveRecovered} description='total recovered/total cases' />
              <GenStats title="Active Rate" data={USAData.percentages.active} description='total active/total cases' />
            </div>
          </div>
          <div style={{ marginTop: '50px', height: '500px', width: '100%' }}>
            <h2 id='subtitle'>Trends and Visuals</h2>
            <CaseResponseLine data={USAData} />
          </div>
          <div style={{ marginTop: '50px', height: '500px', width: '100%' }}>
            <h2 id='subtitle'>Map</h2>
            <Map
              center={[USAData.location.lng, USAData.location.lat]}
              zoom={3}
              height={window.innerHeight - 400}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default CaseInstanceUSA;