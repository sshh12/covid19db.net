import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Tag, Space } from "antd";
import axios from 'axios';
import "../components/caseInstances/caseInstance.css";

export default class Cases extends Component {

  constructor() {
    super();
    this.state = {
      caseData: null,
    };
    this.compileData = this.compileData.bind(this);
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios.get('case-statistics', {
      params: {
        attributes: "country,totals"
      }
    })
      .then(res => {
        const caseData = res.data.map((data) => {
          var compiledCase = {
            country: data.country,
            totalCases: data.totals.cases,
            totalCases: data.totals.cases,
            totalDeaths: data.totals.deaths,
            totalRecovered: data.totals.recovered,
            totalActive: data.totals.active,
            exploreCase: data.country.codes.alpha3Code,
            exploreRisk: data.country.codes.alpha3Code,
          };

          return compiledCase;
        });
        this.setState({ caseData })
        console.log(caseData);
      })

  }

  compileData(data) {
    var compiledCase = {
      country: data.country,
      totalCases: data.totals.cases,
      totalCases: data.totals.cases,
      totalDeaths: data.totals.deaths,
      totalRecovered: data.totals.recovered,
      totalActive: data.totals.active,
      exploreCase: data.country.codes.alpha3Code,
      exploreRisk: data.country.codes.alpha3Code,
    };

    return compiledCase;
  }


  render() {
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          // <LinkContainer to={`/countries/${country.codes.alpha3Code}`}>
          //   <a>{country.name}</a>
          // </LinkContainer>

          <a href={`/countries/${country.codes.alpha3Code}`}>
            {country.name}
          </a>
        ),
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: "Total Cases",
        dataIndex: "totalCases",
        key: "totalCases",
        render: (population) => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalCases - b.totalCases,
      },
      {
        title: "Total Deaths",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
        render: (population) => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
      },
      {
        title: "Total Recovered",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
        render: (population) => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
      },
      {
        title: "Total Active",
        dataIndex: "totalActive",
        key: "totalActive",
        render: (population) => <>{population.toLocaleString()}</>,
        sorter: (a, b) => a.totalActive - b.totalActive,
      },
      {
        title: "Explore Cases",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <a href={`/case-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </a>
        ),
      },
      {
        title: "Explore Risks",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <a href={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </a>
        )
      },
    ];

    return (
      <div className="App">
        {/* <header className="Case-header"> */}
        <h1
          style={{
            fontWeight: "800",
            fontSize: "2em",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {" "}
          Cases{" "}
        </h1>
        <Table
          style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
          columns={columns}
          dataSource={this.state.caseData}
          pagination={true}
        />
        {/* </header> */}
      </div>
    );
  }
}
