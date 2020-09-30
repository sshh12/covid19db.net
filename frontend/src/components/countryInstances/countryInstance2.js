import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import "./countryInstance.css";
import { GeneralInfo, CaseResponseLine } from './countryComponents';
import USAData from './data/USA.json';

export default class CountryInstanceUSA extends Component {
  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/countries'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {USAData.name} ({USAData.codes.alpha3Code})</h1>
          <h2 id='subtitle'> Capital - {USAData.capital.name}</h2>

          {/* media / visual */}
          {/* <div style={{ marginTop: '50px', height: '500px', width: '100%' }}>
            <h2 id='subtitle'>Map</h2>
            <CaseResponseLine data={USAData} />
          </div> */}

          <div>
            <div id='title-div'>
              <h2 id='subtitle'>General Information</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Population" data={USAData.population} />
              <GeneralInfo title="Currency" data={USAData.currencies[0].code} />
              <GeneralInfo title="Longitude" data={USAData.location.lng} />
              <GeneralInfo title="Latitude" data={USAData.location.lat} />
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Region" data={USAData.region.region} />
              <GeneralInfo title="Sub-Region" data={USAData.region.subregion} />
              <GeneralInfo title="Border" data={USAData.borders[0]} />
              <GeneralInfo title="Languages" data={USAData.languages[0].name} />
            </div>
          </div>

        </header>
      </div>
    );
  }
}