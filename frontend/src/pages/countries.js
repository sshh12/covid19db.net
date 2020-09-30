import React, { Component } from "react";
import { Button, Table, Tag, Space } from "antd";
import { LinkContainer } from "react-router-bootstrap";

import USAData from '../components/countryInstances/data/USA.json';
import GBRData from '../components/countryInstances/data/GBR.json';
import MEXData from '../components/countryInstances/data/MEX.json';

function allLanguages(myList) {
  var str = myList[0].name;
  for (var i = 1; i < myList.length; i++) {
    str = str + ", " + myList[i].name;
  }
  return str;
}

export default class Countries extends Component {
  render() {
    const columns = [
      {
        title: 'Explore Country',
        dataIndex: 'exploreCountry',
        key: 'exploreCountry',
        render: code => <LinkContainer to={`/countries/${code}`}><Button>Explore</Button></LinkContainer>,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        // sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Alpha 2 Code',
        dataIndex: 'alpha2Code',
        key: 'alpha2Code',
        // sorter: (a, b) => a.codes.alpha2Code.localeCompare(b.codes.alpha2Code),
      },
      {
        title: 'Languages',
        dataIndex: 'languages',
        key: 'languages',
      },
      {
        title: 'Population',
        dataIndex: 'population',
        key: 'population',
        // sorter: (a, b) => a.population - b.population,
      },
      {
        title: 'Capital',
        dataIndex: 'capital',
        key: 'capital',
        // sorter: (a, b) => a.capital.name.localeCompare(b.capital.name),
      },
      {
        title: 'Explore Country',
        dataIndex: 'exploreCountry',
        key: 'exploreCountry',
        render: code => <LinkContainer to={`/countries/${code}`}><Button>Explore</Button></LinkContainer>,
      },
    ];

    const data = [
      {
        key: '1',
        country: GBRData.name,
        alpha2Code: GBRData.codes.alpha2Code,
        // languages: GBRData.languages[0].name,
        languages: allLanguages(GBRData.languages),
        population: GBRData.population,
        capital: GBRData.capital.name,
        exploreCountry: GBRData.codes.alpha3Code,
      },
      {
        key: '2',
        country: USAData.name,
        alpha2Code: USAData.codes.alpha2Code,
        languages: allLanguages(USAData.languages),
        population: USAData.population,
        capital: USAData.capital.name,
        exploreCountry: USAData.codes.alpha3Code,
      },
      {
        key: '3',
        country: MEXData.name,
        alpha2Code: MEXData.codes.alpha2Code,
        languages: allLanguages(MEXData.languages),
        population: MEXData.population,
        capital: MEXData.capital.name,
        exploreCountry: MEXData.codes.alpha3Code,
      },
    ];

    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <h1> Country Page </h1>
        <Table columns={columns} dataSource={data} />
        {/* </header> */}
      </div>
    );
  }
}

