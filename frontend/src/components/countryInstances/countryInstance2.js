import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import "./countryInstance.css";
import { GeneralInfo, News, GetImage, AllNews } from './countryComponents';
import USAData from './data/USA.json';
import Map from "../../components/map";


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

          {/* <div>{GetImage(USAData.capital.img)}</div> */}

          {/* media / visual */}
          <div style={{ marginTop: '50px', height: '300px', width: '100%', marginBottom: '100px' }}>
            {/* <h2 id='subtitle'>Map - </h2> */}
            {/* <GetImage data={USAData.capital.img} /> */}
            {/* <div id='pic'>{GetImage(USAData.flag)}</div> */}
            <Map
              center={[USAData.location.lng, USAData.location.lat]}
              zoom={3}
              height={window.innerHeight - 400}
              width={window.innerWidth - 400}
            />
          </div>
          <div>
            <div id='title-div'>
              <h2 id='subtitle'>General Information:</h2>
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
              <GeneralInfo title="Border Country" data={USAData.borders[0]} />
              <GeneralInfo title="Languages" data={USAData.languages[0].name} />
            </div>
          </div>


          <div style={{ marginTop: '50px' }}>
            <div id='title-div'>
              <h2 id='subtitle'>News:</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <News title={USAData.news[0].title} url={USAData.news[0].url} source={USAData.news[0].source.name} />
              <News title={USAData.news[1].title} url={USAData.news[1].url} source={USAData.news[1].source.name} />
              <News title={USAData.news[2].title} url={USAData.news[2].url} source={USAData.news[2].source.name} />
              <News title={USAData.news[3].title} url={USAData.news[3].url} source={USAData.news[3].source.name} />
            </div>
          </div>

          {/* //news
          <div style={{ marginTop: '50px' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <News title={USAData.news[0].url} data={USAData.news[0].title} source={USAData.news[0].source.name} />
            </div>
          </div> */}
          {/* <div>{AllNews(USAData, USAData.news)}</div> */}



          <div style={{ marginTop: '50px' }}></div>

        </header>
      </div>
    );
  }
}