import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import "./countryInstance.css";
import { GeneralInfo, News, GetImage, AllNews } from './countryComponents';
import GBRData from './data/GBR.json';
import Map from "../../components/map";


export default class CountryInstanceGBR extends Component {
  render() {
    return (
      <div className='App'>
        <header className='Case-header'>
          {/* <LinkContainer className='Back-link' to='/countries'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer> */}

          <h1 id='page-title'> {GBRData.name} ({GBRData.codes.alpha3Code})</h1>
          <div>
            <div id="title-div">
              <h2 id='subtitle'> Capital - {GBRData.capital.name}</h2>
            </div>
            <img src={GBRData.capital.img} alt={"Image of " + GBRData.capital.name} id="capital-image" />
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
          <div style={{ marginTop: '1vh' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <GeneralInfo title="Region" data={GBRData.region.region} />
              <GeneralInfo title="Sub-Region" data={GBRData.region.subregion} />
              <GeneralInfo title="Border Country" data={GBRData.borders[0]} />
              <GeneralInfo title="Languages" data={GBRData.languages[0].name} />
            </div>
          </div>

          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id='title-div'>
              <h2 id='subtitle'>Map of Capital</h2>
            </div>
            <Map
              center={[GBRData.capital.location.lng, GBRData.capital.location.lat]}
              zoom={8}
              height={window.innerHeight * 0.4}
              width={window.innerWidth * 0.4}
            />
          </div>

          <div style={{ marginTop: '1vh', marginBottom: '10vh' }}>
            <div id='title-div'>
              <h2 id='subtitle'>News</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <News title={GBRData.news[0].title} url={GBRData.news[0].url} source={GBRData.news[0].source.name} />
              <News title={GBRData.news[1].title} url={GBRData.news[1].url} source={GBRData.news[1].source.name} />
              <News title={GBRData.news[2].title} url={GBRData.news[2].url} source={GBRData.news[2].source.name} />
              <News title={GBRData.news[3].title} url={GBRData.news[3].url} source={GBRData.news[3].source.name} />
            </div>
          </div>

          {/* //news
          <div style={{ marginTop: '50px' }}>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
              <News title={GBRData.news[0].url} data={GBRData.news[0].title} source={GBRData.news[0].source.name} />
            </div>
          </div> */}
          {/* <div>{AllNews(GBRData, GBRData.news)}</div> */}
        </header>
      </div>
    );
  }
}