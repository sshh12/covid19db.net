import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import "./countryInstance.css";
import { GeneralInfo } from './countryComponents';
import MEXData from './data/MEX.json';
import { GetImage } from './countryComponents';
import Map from "../../components/map";


export default class CountryInstanceMEX extends Component {
  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          <LinkContainer className='Back-link' to='/countries'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'> {MEXData.name} ({MEXData.codes.alpha3Code})</h1>
          <h2 id='subtitle'> Capital - {MEXData.capital.name}</h2>

          {/* <div>{GetImage(MEXData.capital.img)}</div> */}

          {/* media / visual */}
          <div style={{ marginTop: '50px', height: '300px', width: '100%' }}>
            {/* <h2 id='subtitle'>Map - </h2> */}
            {/* <GetImage data={MEXData.capital.img} /> */}
            {/* <div id='pic'>{GetImage(MEXData.flag)}</div> */}
            <Map
              center={[MEXData.location.lng, MEXData.location.lat]}
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
              <GeneralInfo title="Population" data={MEXData.population} />
              <GeneralInfo title="Currency" data={MEXData.currencies[0].code} />
              <GeneralInfo title="Longitude" data={MEXData.location.lng} />
              <GeneralInfo title="Latitude" data={MEXData.location.lat} />
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Region" data={MEXData.region.region} />
              <GeneralInfo title="Sub-Region" data={MEXData.region.subregion} />
              <GeneralInfo title="Border" data={MEXData.borders[0]} />
              <GeneralInfo title="Languages" data={MEXData.languages[0].name} />
            </div>
          </div>

          <div style={{ marginTop: '50px' }}></div>

        </header>
      </div>
    );
  }
}