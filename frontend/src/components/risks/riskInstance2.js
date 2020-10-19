import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import Map from "../map";
import { BigStat, DemographicFactor, HealthFactor } from './riskComponents';

import USAData from './data/USA.json';
import Agg from './data/Aggregate.json';

export default class RiskInstanceUSA extends Component {
  render() {
    return (
      <div className='App'>
        <header className='risk-header'>
          {/* <LinkContainer className='Back-link' to='/risks'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer> */}

          <h1 id='page-title'>Risk Factors in {USAData.country.name} ({USAData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <BigStat title="Human Development Index" data={USAData.humanDevelopmentIndex.toFixed(3)} avg={Agg.humanDevelopmentIndex.toFixed(3)} />
            <BigStat title="Gini Index" data={USAData.gini.toFixed(1)} avg={Agg.gini.toFixed(1)} />
            <BigStat title="GDP Per Capita" prefix='$' data={`${USAData.gdpPerCapita.toLocaleString()}`} suffix='/person' avg={`$${Agg.gdpPerCapita.toLocaleString()}`} />
          </div>
          <div style={{ marginTop: '80px' }}>
            <div id='demogr-factor-title-div'>
              <h2 id='subtitle'>Demographic Risk Factors</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
              <DemographicFactor title="Population Density" data={USAData.populationDensity.toFixed(3)} suffix='people/sq.mi.' avg={Agg.populationDensity.toFixed(3)} />
              <DemographicFactor title="Median Age" data={USAData.medianAge.toFixed(3)} suffix='yrs.' avg={Agg.medianAge.toFixed(3)} />
              <DemographicFactor title="Age 65 and Older" data={`${USAData.aged65Older.toFixed(3)}%`} avg={`${Agg.aged65Older.toFixed(3)} %`} />
              <DemographicFactor title="Age 70 and Older" data={`${USAData.aged70Older.toFixed(3)}%`} avg={`${Agg.aged70Older.toFixed(3)} %`} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h2 id='subtitle'>Health Risk Factors</h2>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
              <HealthFactor title="Life Expectancy" data={USAData.lifeExpectancy.toFixed(2)} suffix='yrs.' avg={`${Agg.lifeExpectancy.toFixed(2)}`} />
              <HealthFactor title="Extreme Poverty Rate" data={`${USAData.extremePovertyRate.toFixed(1)}%`} avg={`${Agg.extremePovertyRate.toFixed(1)}%`} />
              <HealthFactor title="Hospital Beds Per Thousand" data={USAData.hospitalBedsPerThousand.toFixed(3)} avg={Agg.hospitalBedsPerThousand.toFixed(3)} suffix='/thousand' />
              <HealthFactor title="Cardiovascular Death Rate" data={USAData.cardiovascDeathRate.toFixed(3)} avg={Agg.cardiovascDeathRate.toFixed(3)} suffix='/100,000' />
              <HealthFactor title="Diabetes Prevlaence" data={`${USAData.diabetesPrevalence.toFixed(3)}%`} avg={`${Agg.diabetesPrevalence.toFixed(3)}%`} suffix=' of adults' />
              <HealthFactor title="Female Smokers" data={`${USAData.femaleSmokers.toFixed(1)}%`} avg={`${Agg.femaleSmokers.toFixed(1)}%`} suffix='of adults' />
              <HealthFactor title="Male Smokers" data={`${USAData.maleSmokers.toFixed(1)}%`} avg={`${Agg.maleSmokers.toFixed(1)}%`} suffix='of adults' />
              <HealthFactor title="Handwashing Facilities" data={`${USAData.handwashingFacilities?.toFixed(3)}%`} avg={`${Agg.handwashingFacilities?.toFixed(3)}%`} suffix=' access' />
            </div>
          </div>
          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id='title-div'>
              <h2 id='subtitle'>Map</h2>
            </div>
            <Map
              center={[USAData.location.lng, USAData.location.lat]}
              zoom={4}
              height={window.innerHeight * 0.4}
              width={window.innerWidth * 0.4}
            />
          </div>
        </header>
      </div>
    );
  }
}