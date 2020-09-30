import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Tag, Space } from "antd";

import USAData from '../components/riskInstances/data/USA.json';
import GBRData from '../components/riskInstances/data/GBR.json';
import MEXData from '../components/riskInstances/data/MEX.json';

export default class Risks extends Component {
  render() {
    const columns = [
      {
        title: 'Explore Risk',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: countryCode => <LinkContainer to={`/risks/${countryCode}`}><Button>Explore</Button></LinkContainer>,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: country => <LinkContainer to={`/countries/${country.codes.alpha3Code}`}><a>{country.name}</a></LinkContainer>,
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: 'Life Expectancy',
        dataIndex: 'lifeExpectancy',
        key: 'lifeExpectancy',
        sorter: (a, b) => a.lifeExpectancy - b.lifeExpectancy,
      },
      {
        title: 'Human Development Index',
        dataIndex: 'humanDevelopmentIndex',
        key: 'humanDevelopmentIndex',
        sorter: (a, b) => a.humanDevelopmentIndex - b.humanDevelopmentIndex,
      },
      {
        title: 'Population Density',
        dataIndex: 'populationDensity',
        key: 'populationDensity',
        render: population => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.populationDensity - b.populationDensity,
      },
      {
        title: 'Gini',
        dataIndex: 'gini',
        key: 'gini',
        sorter: (a, b) => a.gini - b.gini,
      },
      {
        title: 'Explore Risk',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: countryCode => <LinkContainer to={`/risks/${countryCode}`}><Button>Explore</Button></LinkContainer>,
      },
    ];

    const data = [
      {
        key: '1',
        country: GBRData.country,
        lifeExpectancy: GBRData.lifeExpectancy,
        humanDevelopmentIndex: GBRData.humanDevelopmentIndex,
        populationDensity: GBRData.populationDensity,
        gini: GBRData.gini,
        exploreRisk: GBRData.country.codes.alpha3Code,
      },
      {
        key: '2',
        country: MEXData.country,
        lifeExpectancy: MEXData.lifeExpectancy,
        humanDevelopmentIndex: MEXData.humanDevelopmentIndex,
        populationDensity: MEXData.populationDensity,
        gini: MEXData.gini,
        exploreRisk: MEXData.country.codes.alpha3Code,
      },
      {
        key: '3',
        country: USAData.country,
        lifeExpectancy: USAData.lifeExpectancy,
        humanDevelopmentIndex: USAData.humanDevelopmentIndex,
        populationDensity: USAData.populationDensity,
        gini: USAData.gini,
        exploreRisk: USAData.country.codes.alpha3Code,
      },
    ];

    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Risk Factors & Statistics </h1>
        <Table style={{ margin: '0 5vw', outline: '1px solid lightgrey' }} columns={columns} dataSource={data} pagination={false} />
        {/* </header> */}
      </div>
    );
  }
}
