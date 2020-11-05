import React, { Component } from "react";
import { Col, Divider, Input, Pagination, Row, Space } from "antd";
import axios from "../client";

import CountryCard from "../components/country/countryCard.js";
import {
  CountryCardView,
  CountryGridControl,
  CountryPagination,
  CountrySortSelection,
  SORT_TYPES,
} from "../components/country/countryModelComponents.js";

export default class Countries extends Component {
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
      sortBy: SORT_TYPES.NAME, // Parameter to manage sorting process
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
        console.log(countryCardsData);
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
        console.log(caseStats);
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
            case SORT_TYPES.NAME:
              return reversed * a.name.localeCompare(b.name);
            case SORT_TYPES.ALPHA2:
              return (
                reversed * a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
              );
            case SORT_TYPES.ALPHA3:
              return (
                reversed * a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
              );
            case SORT_TYPES.NUM_CASES:
              return reversed * (a.cases - b.cases);
            case SORT_TYPES.POPULATION:
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
          var { sortLowVal, sortHiVal } = this.state;
          const filterNone = sortLowVal == -1 && sortHiVal == -1;
          switch (this.state.sortBy) {
            case SORT_TYPES.NAME:
              v = name.charAt(0).charCodeAt(0);
              break;
            case SORT_TYPES.ALPHA2:
              v = codes.alpha2Code.charAt(0).charCodeAt(0);
              break;
            case SORT_TYPES.ALPHA3:
              v = codes.alpha3Code.charAt(0).charCodeAt(0);
              break;
            // Numerical cases: default to no filter and return entire range
            case SORT_TYPES.NUM_CASES:
              return filterNone
                ? cases
                : (cases - sortLowVal) * (cases - sortHiVal) <= 0 &&
                    searchText.includes(searchValue);
            case SORT_TYPES.POPULATION:
              return filterNone
                ? population
                : (population - sortLowVal) * (population - sortHiVal) <= 0 &&
                    searchText.includes(searchValue);
          }
          sortLowVal = sortLowVal.charCodeAt(0);
          sortHiVal = sortHiVal.charCodeAt(0);
          return (
            (v - sortLowVal) * (v - sortHiVal) <= 0 &&
            searchText.includes(searchValue)
          );
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
    if (value == this.state.sortBy) return;

    var sortLowVal, sortHiVal;
    switch (value) {
      case SORT_TYPES.NAME:
      case SORT_TYPES.ALPHA2:
      case SORT_TYPES.ALPHA3:
        sortLowVal = "A";
        sortHiVal = "Z";
        break;
      case SORT_TYPES.NUM_CASES:
        // Numerical range: begin with max range
        sortLowVal = 20000000;
        sortHiVal = -1;
        break;
      case SORT_TYPES.POPULATION:
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
    const pagination = (
      <CountryPagination
        display={currentViewCards && filteredCountries}
        numCountries={filteredCountries?.length}
        pageNumber={this.state.pageNumber}
        numPerPage={this.state.numPerPage}
        onChange={this.changeNumDisplayed}
      />
    );
    const countrySortSelection = (
      <CountrySortSelection
        sortBy={this.state.sortBy}
        onChange={this.changeSort}
      />
    );
    const gridControl = (
      <CountryGridControl
        selectSort={countrySortSelection}
        sortBy={this.state.sortBy}
        sortHiVal={this.state.sortHiVal}
        sortLowVal={this.state.sortLowVal}
        onChange={this.handleUpdateRange}
        pagination={pagination}
      />
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
            this.setState({ searchValue: currValue, filteredCountries: null });
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
          <CountryCardView
            gutter={16}
            countryGrid={this.createCountryGrid(currentViewCards)}
          />
          {gridControl}
        </div>
      </div>
    );
  }
}
