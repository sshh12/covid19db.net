import React, { Component } from 'react';
import "./countryInstance.css";

function GeneralInfo(props) {
  return <div className='new-stats'>
    <h2 className='title'>{props.title}</h2>
    <h2 className='data'>{props.data}</h2>
  </div>
}
//TODO add function to display map, flag, etc

export {
  GeneralInfo,
}