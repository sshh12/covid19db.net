import React, { Component } from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import axios from "../client";
import "../components/cases/caseInstance.css";
import filterData from "../components/cases/caseModelData.js";
import HighlighterText from "../components/search/highlighterText";
import SearchBar from "../components/search/casesSearchBar";

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: null,
      caseData: null,
      filteredInfo: null,
      sortedInfo: null,
      searchValue: null,
    };
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
        this.setState({ dataSource: caseData });
      });
  }

  handleChange = (pagination, filters) => {
    this.setState({ filteredInfo: filters });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };
  setDataSource = (dataSource) => {
    this.setState({ dataSource: dataSource });
  };
  setSearchValue = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    let { filteredInfo, caseData, searchValue } = this.state;
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/case-statistics/${country.codes.alpha3Code}`}>
            {searchValue != "" ? (
              <HighlighterText text={country.name} searchValue={searchValue} />
            ) : (
              country.name
            )}
          </Link>
        ),
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
        //width: 300,
      },
      {
        title: "Cases",
        dataIndex: "totalCases",
        key: "totalCases",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalCases - b.totalCases,
        filters: filterData.totalCasesFilterRanges,
        filteredValue: filteredInfo.totalCases || null,
        onFilter: (value, record) =>
          record.totalCases > value &&
          record.totalCases <
            value + filterData.totalCasesFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Deaths",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
        filters: filterData.totalDeathsFilterRanges,
        filteredValue: filteredInfo.totalDeaths || null,
        onFilter: (value, record) =>
          record.totalDeaths > value &&
          record.totalDeaths <
            value + filterData.totalDeathsFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Recovered",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
        filters: filterData.totalRecoveredFilterRanges,
        filteredValue: filteredInfo.totalRecovered || null,
        onFilter: (value, record) =>
          record.totalRecovered > value &&
          record.totalRecovered <
            value + filterData.totalRecoveredFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Active",
        dataIndex: "totalActive",
        key: "totalActive",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalActive - b.totalActive,
        filters: filterData.totalActiveFilterRanges,
        filteredValue: filteredInfo.totalActive || null,
        onFilter: (value, record) =>
          record.totalActive > value &&
          record.totalActive <
            value + filterData.totalActiveFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
    ];

    return (
      <div className="App">
        <div
          style={{
            backgroundColor: "#323776",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 40,
              paddingTop: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "75vw",
            }}
          >
            <h1
              style={{
                fontWeight: 800,
                marginBottom: 20,
                fontSize: "2em",
                color: "white",
              }}
            >
              Cases
            </h1>
            <p style={{ color: "white", fontSize: "1.1em", marginBottom: 20 }}>
              The table below displays the total case statistics in each
              country. Click a country's name to see more information.
            </p>
            <SearchBar
              style={{ width: "100vw", paddingBottom: 100 }}
              searchValue={searchValue}
              data={caseData}
              setDataSource={this.setDataSource}
              setSearchValue={this.setSearchValue}
            />
            <div style={{ paddingTop: 10, alignSelf: "start" }}>
              <Button onClick={this.clearFilters}>Clear filters</Button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "75vw",
              userSelect: "none",
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            <Table
              style={{
                margin: "0 0vw",
                outline: "1px solid lightgrey",
              }}
              columns={columns}
              dataSource={this.state.dataSource}
              onChange={this.handleChange}
              pagination={{ position: ["bottomRight", "topRight"] }}
            />
          </div>
        </div>
      </div>
    );
  }
}
