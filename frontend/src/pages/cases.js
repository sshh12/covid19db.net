import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Tag, Space } from "antd";

import USAData from '../components/caseInstances/data/USA.json';
import GBRData from '../components/caseInstances/data/GBR.json';
import MEXData from '../components/caseInstances/data/MEX.json';
import '../components/caseInstances/caseInstance.css';

export default class Cases extends Component {
  render() {
    const columns = [
      {
        title: 'Explore Case',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: code => <LinkContainer to={`/cases/${code}`}><Button>Explore</Button></LinkContainer>,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: country => <LinkContainer to={`/countries/${country.codes.alpha3Code}`}><a>{country.name}</a></LinkContainer>,
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: 'Total Cases',
        dataIndex: 'totalCases',
        key: 'totalCases',
        render: population => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalCases - b.totalCases,
      },
      {
        title: 'Total Deaths',
        dataIndex: 'totalDeaths',
        key: 'totalDeaths',
        render: population => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
      },
      {
        title: 'Total Recovered',
        dataIndex: 'totalRecovered',
        key: 'totalRecovered',
        render: population => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
      },
      {
        title: 'Total Active',
        dataIndex: 'totalActive',
        key: 'totalActive',
        render: population => <>{population.toLocaleString()}</>,

        sorter: (a, b) => a.totalActive - b.totalActive,
      },
      {
        title: 'Explore Case',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: code => <LinkContainer to={`/cases/${code}`}><Button>Explore</Button></LinkContainer>,
      },
    ];

    const data = [
      {
        key: '1',
        country: GBRData.country,
        totalCases: GBRData.totals.cases,
        totalDeaths: GBRData.totals.deaths,
        totalRecovered: GBRData.totals.recovered,
        totalActive: GBRData.totals.active,
        exploreRisk: GBRData.country.codes.alpha3Code,
      },
      {
        key: '2',
        country: MEXData.country,
        totalCases: MEXData.totals.cases,
        totalDeaths: MEXData.totals.deaths,
        totalRecovered: MEXData.totals.recovered,
        totalActive: MEXData.totals.active,
        exploreRisk: MEXData.country.codes.alpha3Code,
      },
      {
        key: '3',
        country: USAData.country,
        totalCases: USAData.totals.cases,
        totalDeaths: USAData.totals.deaths,
        totalRecovered: USAData.totals.recovered,
        totalActive: USAData.totals.active,
        exploreRisk: USAData.country.codes.alpha3Code,
      },
    ];

    return (
      <div className="App">
        {/* <header className="Case-header"> */}
        <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}> Cases </h1>
        <Table style={{ margin: '0 5vw', outline: '1px solid lightgrey' }} columns={columns} dataSource={data} pagination={false} />
        {/* </header> */}
      </div>
    );
  }
}