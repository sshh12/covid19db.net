import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'antd';
import Map from "../map";
import { BigStat, DemographicFactor, HealthFactor, CaseResponseLine } from './riskComponents';

import MEXData from './data/MEX.json';
import Agg from './data/Aggregate.json';

export default class RiskInstanceMEX extends Component {
  render() {
    return (
      <div className='App'>
        <header className='risk-header'>
          <LinkContainer className='Back-link' to='/risks'>
            <Button variant='outline-secondary'>Go back</Button>
          </LinkContainer>

          <h1 id='page-title'>Risk Factors in {MEXData.country.name} ({MEXData.country.codes.alpha3Code})</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }} >
            <BigStat title="Human Development Index" data={MEXData.humanDevelopmentIndex.toFixed(3)} avg={Agg.humanDevelopmentIndex.toFixed(3)} />
            <BigStat title="Gini Index" data={MEXData.gini.toFixed(1)} avg={Agg.gini.toFixed(1)} />
            <BigStat title="GDP Per Capita" prefix='$' data={`${MEXData.gdpPerCapita.toLocaleString()}`} suffix='/person' avg={`$${Agg.gdpPerCapita.toLocaleString()}`} />
          </div>
          <div>
            <div id='demogr-factor-title-div'>
              <h2 id='subtitle'>Demographic Risk Factors</h2>
            </div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
              <DemographicFactor title="Population Density" data={MEXData.populationDensity.toFixed(3)} suffix='people/sq.mi.' avg={Agg.populationDensity.toFixed(3)} />
              <DemographicFactor title="Median Age" data={MEXData.medianAge.toFixed(3)} suffix='yrs.' avg={Agg.medianAge.toFixed(3)} />
              <DemographicFactor title="Age 65 and Older" data={`${MEXData.aged65Older.toFixed(3)}%`} avg={`${Agg.aged65Older.toFixed(3)} %`} />
              <DemographicFactor title="Age 70 and Older" data={`${MEXData.aged70Older.toFixed(3)}%`} avg={`${Agg.aged70Older.toFixed(3)} %`} />
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h2 id='subtitle'>Health Risk Factors</h2>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
              <HealthFactor title="Life Expectancy" data={MEXData.lifeExpectancy.toFixed(2)} suffix='yrs.' avg={`${Agg.lifeExpectancy.toFixed(2)}`} />
              <HealthFactor title="Extreme Poverty Rate" data={`${MEXData.extremePovertyRate.toFixed(1)}%`} avg={`${Agg.extremePovertyRate.toFixed(1)}%`} />
              <HealthFactor title="Hospital Beds Per Thousand" data={MEXData.hospitalBedsPerThousand.toFixed(3)} avg={Agg.hospitalBedsPerThousand.toFixed(3)} suffix='/thousand' />
              <HealthFactor title="Cardiovascular Death Rate" data={MEXData.cardiovascDeathRate.toFixed(3)} avg={Agg.cardiovascDeathRate.toFixed(3)} suffix='/100,000' />
              <HealthFactor title="Diabetes Prevlaence" data={`${MEXData.diabetesPrevalence.toFixed(3)}%`} avg={`${Agg.diabetesPrevalence.toFixed(3)}%`} suffix=' of adults' />
              <HealthFactor title="Female Smokers" data={`${MEXData.femaleSmokers.toFixed(1)}%`} avg={`${Agg.femaleSmokers.toFixed(1)}%`} suffix='of adults' />
              <HealthFactor title="Male Smokers" data={`${MEXData.maleSmokers.toFixed(1)}%`} avg={`${Agg.maleSmokers.toFixed(1)}%`} suffix='of adults' />
              <HealthFactor title="Handwashing Facilities" data={`${MEXData.handwashingFacilities?.toFixed(3)}%`} avg={`${Agg.handwashingFacilities?.toFixed(3)}%`} suffix=' access' />
            </div>
          </div>
          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id='title-div'>
              <h2 id='subtitle'>Map</h2>
            </div>
            <Map
              center={[MEXData.location.lng, MEXData.location.lat]}
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