import React, { Component } from "react";
import { Table, Tag, Space } from "antd";
import { Button } from "react-bootstrap";
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

export default class CountriesPage extends Component {
  render() {
    const columns = [
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        // render: text => <a>{text}</a>,
        render: code => <LinkContainer to={`/countries/${code}`}>
          <Button>{code}</Button>
        </LinkContainer>,
      },
      {
        title: 'Alpha 2 Code',
        dataIndex: 'alpha2Code',
        key: 'alpha2Code',
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
      },
      {
        title: 'Capital',
        dataIndex: 'capital',
        key: 'capital',
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
      },
      {
        key: '2',
        country: USAData.name,
        alpha2Code: USAData.codes.alpha2Code,
        languages: allLanguages(USAData.languages),
        population: USAData.population,
        capital: USAData.capital.name,
      },
      {
        key: '3',
        country: MEXData.name,
        alpha2Code: MEXData.codes.alpha2Code,
        languages: allLanguages(MEXData.languages),
        population: MEXData.population,
        capital: MEXData.capital.name,
      },
    ];

    return (<Table columns={columns} dataSource={data} />);
  }
}

