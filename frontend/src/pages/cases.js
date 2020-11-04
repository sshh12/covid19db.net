import React, { Component } from "react";
import { Button, Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "../client";
import "../components/caseInstances/caseInstance.css";

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      caseData: null,
      filteredInfo: null,
      sortedInfo: null,
    };
    this.compileData = this.compileData.bind(this);
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals,new",
        },
      })
      .then((res) => {
        const caseData = res.data.map((data) => {
          var compiledCase = {
            country: data.country,
            newCases: data.new.cases,
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
        this.setState({ caseData });
        console.log(caseData);
      });
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

  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    this.setState({
      filteredInfo: filters,
    });
  };



  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    let newCaseFilterMappings = {
      0: 10000,
      10000: 10000,
      20000: 10000,
      30000: 10000,
      40000: 200000
    };
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/countries/${country.codes.alpha3Code}`}>
            {country.name}
          </Link>
        ),
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: "New Cases Today",
        dataIndex: "newCases",
        key: "newCases",
        sorter: (a, b) => a.newCases - b.newCases,
        filters: [
          { text: '40,000+', value: 40000 },
          { text: '30,000 - 40,000', value: 30000 },
          { text: '20,000 - 30,000', value: 20000 },
          { text: '10,000 - 20,000', value: 10000 },
          { text: '0 - 10,000', value: 0 },
        ], 
        filteredValue: filteredInfo.newCases || null,
        onFilter: (value, record) => (record.newCases > value && record.newCases < value + newCaseFilterMappings[value]),
        ellipsis: true
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
          <Link to={`/case-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </Link>
        ),
      },
      {
        title: "Explore Risks",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </Link>
        ),
      },
    ];

    return (
      <div className="App">
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
          onChange={this.handleChange}
          pagination={{ position: ["bottomRight", "topRight"] }}
        />
      </div>
    );
  }
}
