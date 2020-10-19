import React from 'react';
import "./riskInstance.css";

function BigStat(props) {
  return <div className='big-stat'  style={{flex:'none'}}>
    <h2 className='big-stat-title'>{props.title}</h2>  
    <h2 className='big-stat-data'>
      {props.prefix}{props.data}
      <h2 className='big-stat-suffix'> {props.suffix}</h2>
    </h2>
    <h2 className='compare-avg'>vs. average: {props.avg} {props.suffix}</h2>
  </div>
}

function DemographicFactor(props) {
  return <div className='demogr-factor' style={{flex: 'none' }}>
    <h2 className='demogr-factor-title'>{props.title}</h2>
    <h2 className='demogr-factor-data'>
      {props.prefix}{props.data} 
      <h2 className='demogr-factor-suffix'>{props.suffix}</h2>
    </h2>
    <h2 className='compare-avg'>vs. average: {props.avg} {props.suffix}</h2>
  </div>
}

function HealthFactor(props) {
  return <div className='health-factor' style={{ marginBottom: '20px', flex: 'none' }}>
    <h2 className='health-factor-title'>{props.title}</h2>
    <h2 className='health-factor-data'>
      {props.prefix}{props.data} 
      <h2 className='health-factor-suffix'>{props.suffix}</h2>
    </h2>
    <h2 className='health-factor-description'>{props.description}</h2>
    <h2 className='compare-avg'>vs. average: {props.avg} {props.suffix}</h2>
  </div>
}

export {
  BigStat,
  DemographicFactor,
  HealthFactor
}