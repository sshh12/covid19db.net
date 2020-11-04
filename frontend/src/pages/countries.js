import React, { Component } from "react";
import { Col, Divider, Input, Pagination, Row, Select, Space } from "antd";
import axios from "../client";

import CountryCard from "../components/country/countryCard.js";
import RangeInputFilter from "../components/rangeFilterInput";

const { Option, OptGroup } = Select;

export default class Countries extends Component {
  SORT_TYPES = {
    NAME: 1,
    ALPHA2: 2,
    ALPHA3: 3,
    NUM_CASES: 4,
    POPULATION: 5,
  };

  constructor() {
    super();
    this.state = {
      countryCardsData: null, // Raw country JSON from API request
      filteredCountries: null, // All countries filtered/sorted by user
      currentViewCards: null, // JSX for all country cards in current page view
      firstCardIndex: 0,
      lastCardIndex: 20,
      numPerPage: 20, // Number of countries displayed per page
      pageNumber: 1,
      searchValue: "",
      sortBy: this.SORT_TYPES.NAME, // Parameter to manage sorting process
      sortLowVal: "A",
      sortHiVal: "Z",
      casesRetrieved: false,
    };
    this.changeNumDisplayed = this.changeNumDisplayed.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.handleUpdateRange = this.handleUpdateRange.bind(this);
    this.retrieveCases = this.retrieveCases.bind(this);
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("countries", {
        params: {
          attributes: "codes,flag,population,capital,region",
        },
      })
      .then((res) => {
        const countryCardsData = res.data;
        this.setState({ countryCardsData });
      });
  }

  retrieveCases() {
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        const caseStats = res.data;
        const { countryCardsData } = this.state;
        const dataWithCases = countryCardsData?.map((data) => {
          data.cases = caseStats.find(
            (c) => c.country.codes.alpha3Code == data.codes.alpha3Code
          ).totals.cases;
          return data;
        });
        if (!dataWithCases) {
          return;
        }
        this.setState({
          countryCardsData: dataWithCases,
          casesRetrieved: true,
        });
      });
  }

  componentDidUpdate() {
    const data = this.state.countryCardsData;
    var { filteredCountries } = this.state;
    if (!data || data.length == 0) {
      return; // Do not update if no data or data is not populated
    }
    if (!this.state.casesRetrieved) {
      this.retrieveCases();
      return;
    }
    // Re-filter countries for model
    if (!filteredCountries) {
      // Get all loaded country cards in the current view
      filteredCountries = data
        .sort((a, b) => {
          // Sort cards by chosen category, reversing if necessary
          var reversed = this.state.sortLowVal > this.state.sortHiVal ? -1 : 1;
          switch (this.state.sortBy) {
            case this.SORT_TYPES.NAME:
              return reversed * a.name.localeCompare(b.name);
            case this.SORT_TYPES.ALPHA2:
              return (
                reversed * a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
              );
            case this.SORT_TYPES.ALPHA3:
              return (
                reversed * a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
              );
            case this.SORT_TYPES.NUM_CASES:
              return reversed * (a.cases - b.cases);
            case this.SORT_TYPES.POPULATION:
              return reversed * (a.population - b.population);
          }
        })
        .filter((v) => {
          const { searchValue } = this.state;
          const { name, cases, codes, population, capital, region } = v;
          const searchText = `
                ${name.toString().toLowerCase()} 
                Code: ${codes.alpha3Code.toString().toLowerCase()}, 
                ${codes.alpha3Code.toString().toLowerCase()} 
                Cases: ${cases?.toLocaleString()}
                Population: ${population.toLocaleString()} 
                Capital: ${capital?.name.toString().toLowerCase()}
                Region: ${region?.region?.toString().toLowerCase()}
              `;
          // Filter any instances outside of range
          var lo = this.state.sortLowVal;
          var hi = this.state.sortHiVal;
          const filterNone = lo == -1 && hi == -1;
          switch (this.state.sortBy) {
            case this.SORT_TYPES.NAME:
              v = name.charAt(0).charCodeAt(0);
              break;
            case this.SORT_TYPES.ALPHA2:
              v = codes.alpha2Code.charAt(0).charCodeAt(0);
              break;
            case this.SORT_TYPES.ALPHA3:
              v = codes.alpha3Code.charAt(0).charCodeAt(0);
              break;
            // Numerical cases: default to no filter and return entire range
            case this.SORT_TYPES.NUM_CASES:
              return filterNone
                ? cases
                : (cases - lo) * (cases - hi) <= 0 &&
                    searchText.includes(searchValue);
            case this.SORT_TYPES.POPULATION:
              return filterNone
                ? population
                : (population - lo) * (population - hi) <= 0 &&
                    searchText.includes(searchValue);
          }
          lo = lo.charCodeAt(0);
          hi = hi.charCodeAt(0);
          return (v - lo) * (v - hi) <= 0 && searchText.includes(searchValue);
        });
      this.setState({
        filteredCountries: filteredCountries,
        pageNumber: 1,
        firstCardIndex: 0,
        lastCardIndex: this.state.numPerPage,
        currentViewCards: null,
      });
    }
    if (!this.state.currentViewCards) {
      const currentViewCards = filteredCountries
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)
        .map((cardData) => (
          <Col key={cardData.codes.alpha3Code}>
            <CountryCard data={cardData} searchValue={this.state.searchValue} />
          </Col>
        ));
      this.setState({ currentViewCards: currentViewCards });
    }
  }

  changeNumDisplayed(page, numPerPage) {
    // Update pagination for current page and cards
    this.setState({
      numPerPage,
      pageNumber: page,
      firstCardIndex: (page - 1) * numPerPage,
      lastCardIndex: page * numPerPage,
      currentViewCards: null,
    });
  }

  changeSort(value) {
    if (value == this.state.sortBy) {
      return;
    }

    var sortLowVal, sortHiVal;
    switch (value) {
      case this.SORT_TYPES.NAME:
      case this.SORT_TYPES.ALPHA2:
      case this.SORT_TYPES.ALPHA3:
        sortLowVal = "A";
        sortHiVal = "Z";
        break;
      case this.SORT_TYPES.NUM_CASES:
        // Numerical range: begin with max range
        sortLowVal = 20000000;
        sortHiVal = -1;
        break;
      case this.SORT_TYPES.POPULATION:
        // Numerical range: begin with max range
        sortLowVal = 2000000000;
        sortHiVal = -1;
        break;
    }
    this.setState({
      sortBy: value,
      filteredCountries: null,
      sortLowVal,
      sortHiVal,
    });
  }

  createCountryGrid(countryCards) {
    return countryCards;
  }

  // Update hi or low value for range
  handleUpdateRange(target, value) {
    this.setState({
      [target]: value,
      filteredCountries: null,
    });
  }

  render() {
    // Get all loaded country cards in the current view
    const { currentViewCards, filteredCountries, searchValue } = this.state;
    // Form model view if data has been loaded
    const pagination =
      currentViewCards && filteredCountries ? (
        <Pagination
          style={{ display: "inline-block", verticalAlign: "top" }}
          current={this.state.pageNumber} // current page number
          pageSize={this.state.numPerPage} // default size of page
          pageSizeOptions={["10", "20", "50", "100"]}
          onChange={this.changeNumDisplayed}
          total={filteredCountries.length} //total number of countries
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          showSizeChanger
          showQuickJumper
        />
      ) : (
        <div />
      );

    const gridControl = (
      <Space className="country-display-header">
        <div>Sort by:</div>
        <Select
          style={{ width: 200, display: "inline-block", verticalAlign: "top" }}
          value={this.state.sortBy}
          onChange={this.changeSort}
        >
          <OptGroup label="Name">
            <Option value={this.SORT_TYPES.NAME} key="cName">
              Country Name
            </Option>
            <Option value={this.SORT_TYPES.ALPHA2} key="iso2">
              ISO Alpha 2 Code
            </Option>
            <Option value={this.SORT_TYPES.ALPHA3} key="iso3">
              ISO Alpha 3 Code
            </Option>
          </OptGroup>
          <OptGroup label="Statistics">
            <Option value={this.SORT_TYPES.NUM_CASES} key="cases">
              Total Cases
            </Option>
            <Option value={this.SORT_TYPES.POPULATION} key="population">
              Population
            </Option>
          </OptGroup>
        </Select>
        <RangeInputFilter
          style={{ textAlign: "center" }}
          type={
            this.state.sortBy > this.SORT_TYPES.ALPHA3 ? "numeric" : "alpha"
          }
          active={this.state.sortHiVal != -1}
          rangeLo={this.state.sortLowVal}
          rangeHi={this.state.sortHiVal}
          onChange={this.handleUpdateRange}
        />
        <Divider type="vertical" />
        {pagination}
      </Space>
    );

    return (
      <div className="App">
        <h1 style={{ fontWeight: "800", fontSize: "2em", margin: "20px 0" }}>
          Countries{" "}
        </h1>
        <Input
          style={{ width: "50vw", margin: "2vh" }}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            const currValue = e.target.value;
            this.setState({
              searchValue: currValue,
              filteredCountries: null,
            });
          }}
        />
        <div
          className="country-grid-wrapper"
          style={{
            margin: "0 2vw",
            outline: "1px solid lightgrey",
            paddingTop: 20,
          }}
        >
          {gridControl}
          <div className="site-card-wrapper" style={{ margin: "2vh 5vw" }}>
            <Row gutter={16} justify="center">
              {currentViewCards?.length != 0 ? (
                this.createCountryGrid(currentViewCards)
              ) : (
                <div>No country matches found...</div>
              )}
            </Row>
          </div>
          {gridControl}
        </div>
      </div>
    );
  }
}
