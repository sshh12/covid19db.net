import React, { Component } from "react";
import { Button, Table, Tag, Space, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "../client";
import "../components/caseInstances/caseInstance.css";
import {
  newCaseFilterMappings,
  totalActiveFilterMappings,
  totalCasesFilterMappings,
  totalDeathsFilterMappings,
  totalRecoveredFilterMappings,
} from './../components/caseInstances/caseModelData.js';

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      caseData: null,
      filteredInfo: null,
      sortedInfo: null,
      searchValue: null
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
    this.setState({ filteredInfo: filters });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  setDataSource = (dataSource) => {
    this.setState({caseData:dataSource});
  }

  setSearchValue = (value) => {
    this.setState({searchValue:value});
  }

  // const FilterByNameInput = (
  //   <Input
  //     placeholder="Search Name"
  //     value={value}
  //     onChange={e => {
  //       const currValue = e.target.value;
  //       setValue(currValue);
  //       const filteredData = data.filter(entry =>
  //         entry.name.includes(currValue)
  //       );
  //       setDataSource(filteredData);
  //     }}
  //   />
  // );

  render() {
    let { sortedInfo, filteredInfo, caseData, searchValue } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    
    const columns = [
      {
        title: "Search",
        children: [
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
            title: "Total Cases",
            dataIndex: "totalCases",
            key: "totalCases",
            render: (population) => <>{population.toLocaleString()}</>,
            sorter: (a, b) => a.totalCases - b.totalCases,
            filters: [
              { text: '500,000+', value: 500000 },
              { text: '100,000 - 500,000', value: 100000 },
              { text: '20,000 - 100,000', value: 20000 },
              { text: '5,000 - 20,000', value: 5000 },
              { text: '0 - 5,000', value: 0 },
            ], 
            filteredValue: filteredInfo.totalCases || null,
            onFilter: (value, record) => (record.totalCases > value && record.totalCases < value + totalCasesFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Deaths",
            dataIndex: "totalDeaths",
            key: "totalDeaths",
            render: (population) => <>{population.toLocaleString()}</>,
            sorter: (a, b) => a.totalDeaths - b.totalDeaths,
            filters: [
              { text: '50,000+', value: 50000 },
              { text: '25,000 - 50,000', value: 25000 },
              { text: '10,000 - 25,000', value: 10000 },
              { text: '5,000 - 10,000', value: 5000 },
              { text: '0 - 5,000', value: 0 },
            ], 
            filteredValue: filteredInfo.totalDeaths || null,
            onFilter: (value, record) => (record.totalDeaths > value && record.totalDeaths < value + totalDeathsFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Recovered",
            dataIndex: "totalRecovered",
            key: "totalRecovered",
            render: (population) => <>{population.toLocaleString()}</>,
            sorter: (a, b) => a.totalRecovered - b.totalRecovered,
            filters: [
              { text: '500,000+', value: 500000 },
              { text: '100,000 - 500,000', value: 100000 },
              { text: '20,000 - 100,000', value: 20000 },
              { text: '5,000 - 20,000', value: 5000 },
              { text: '0 - 5,000', value: 0 },
            ], 
            filteredValue: filteredInfo.totalRecovered || null,
            onFilter: (value, record) => (record.totalRecovered > value && record.totalRecovered < value + totalRecoveredFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Active",
            dataIndex: "totalActive",
            key: "totalActive",
            render: (population) => <>{population.toLocaleString()}</>,
            sorter: (a, b) => a.totalActive - b.totalActive,
            filters: [
              { text: '200,000+', value: 200000 },
              { text: '50,000 - 200,000', value: 50000 },
              { text: '20,000 - 50,000', value: 20000 },
              { text: '5,000 - 20,000', value: 5000 },
              { text: '0 - 5,000', value: 0 },
            ], 
            filteredValue: filteredInfo.totalActive || null,
            onFilter: (value, record) => (record.totalActive > value && record.totalActive < value + totalActiveFilterMappings[value]),
            ellipsis: true
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
        ]
      }
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
        <Button onClick={this.clearFilters}>Clear filters</Button>
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
