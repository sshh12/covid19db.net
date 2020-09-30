import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import "./countryInstance.css";
import { GeneralInfo } from './countryComponents';
import GBRData from './data/GBR.json';
import { GetImage } from './countryComponents';
import Map from "../../components/map";


export default class CountryInstanceGBR extends Component {
  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/countries'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {GBRData.name} ({GBRData.codes.alpha3Code})</h1>
          <h2 id='subtitle'> Capital - {GBRData.capital.name}</h2>

          {/* <div>{GetImage(GBRData.capital.img)}</div> */}

          {/* media / visual */}
          <div style={{ marginTop: '50px', height: '300px', width: '100%' }}>
            {/* <h2 id='subtitle'>Map - </h2> */}
            {/* <GetImage data={GBRData.capital.img} /> */}
            {/* <div id='pic'>{GetImage(GBRData.flag)}</div> */}
            <Map
              center={[GBRData.location.lng, GBRData.location.lat]}
              zoom={5}
              height={window.innerHeight - 400}
              width={window.innerWidth - 400}
            />
          </div>
          <div>
            <div id='title-div'>
              <h2 id='subtitle'>General Information</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Population" data={GBRData.population} />
              <GeneralInfo title="Currency" data={GBRData.currencies[0].code} />
              <GeneralInfo title="Longitude" data={GBRData.location.lng} />
              <GeneralInfo title="Latitude" data={GBRData.location.lat} />
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Region" data={GBRData.region.region} />
              <GeneralInfo title="Sub-Region" data={GBRData.region.subregion} />
              <GeneralInfo title="Border" data={GBRData.borders[0]} />
              <GeneralInfo title="Languages" data={GBRData.languages[0].name} />
            </div>
          </div>

          <div style={{ marginTop: '50px' }}></div>

        </header>
      </div>
    );
  }
}