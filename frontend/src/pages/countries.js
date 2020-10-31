import React, { Component } from "react";
import { Button, Col, Divider, Dropdown, Input, Pagination, Row, Select, Slider, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';

import axios from "../client";

// import "../components/country/countryInstance.css";
import CountryCard from "../components/country/countryCard.js";

const { Option, OptGroup } = Select;

export default class Countries extends Component {
  SORT_TYPES = {
    NAME: 1,
    ALPHA3: 2,
    ALPHA2: 3,
    NUM_CASES: 4,
    POPULATION: 5,
  };

  constructor() {
    super();
    this.state = {
      countryCardsData: null,
      filteredCountries: null,
      currentViewCards: null,
      firstCardIndex: 0,
      lastCardIndex: 20,
      numPerPage: 20,
      pageNumber: 1,
      sortBy: this.SORT_TYPES.NAME,
      sortLowVal: 'A',
      sortHiVal: 'Z',
    };
    this.changeNumDisplayed = this.changeNumDisplayed.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("countries", {
        params: {
          attributes: "codes,flag,population,capital,languages",
        },
      })
      .then((res) => {
        const countryCardsData = res.data;
        console.log(res.data)
        this.setState({ countryCardsData });
      });
  }

  componentDidUpdate() {
    const data = this.state.countryCardsData;
    var { filteredCountries } = this.state;
    if(!data || data.length == 0) {
      return
    }
    // Re-filter countries for model
    if(!filteredCountries) {
      // Get all loaded country cards in the current view
      filteredCountries = 
        data
          .sort((a, b) => {
            // Sort cards by chosen category, reversing if necessary
            var reversed = this.state.sortLowVal > this.state.sortHiVal ? -1 : 1;
            switch(this.state.sortBy){
              case this.SORT_TYPES.NAME:
                return reversed * a.name.localeCompare(b.name)
              case this.SORT_TYPES.ALPHA3:
                return reversed * a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
              case this.SORT_TYPES.ALPHA2:
                return reversed * a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
              case this.SORT_TYPES.POPULATION:
                return reversed * a.population - b.population
              case this.SORT_TYPES.NUM_CASES:
                return reversed * a.population - b.population
            }
          })
          .filter(v => {
            // Filter any instances outside of range
            var lo = this.state.sortLowVal;
            var hi = this.state.sortHiVal;
            switch(this.state.sortBy){
              case this.SORT_TYPES.NAME:
                v = v.name.charAt(0).charCodeAt(0);
                break;
              case this.SORT_TYPES.ALPHA3:
                v = v.codes.alpha3Code.charAt(0).charCodeAt(0);
                break;
              case this.SORT_TYPES.ALPHA2:
                v = v.codes.alpha2Code.charAt(0).charCodeAt(0);
                break;
              case this.SORT_TYPES.POPULATION:
                return (v.population-lo)*(v.population-hi)<=0
              case this.SORT_TYPES.NUM_CASES:
                return (v.population-lo)*(v.population-hi)<=0
            }
            lo = lo.charCodeAt(0)
            hi = hi.charCodeAt(0)
            return (v-lo)*(v-hi) <= 0
          })
          this.setState({ 
            filteredCountries: filteredCountries,
            pageNumber: 1,   
            firstCardIndex: 0,
            lastCardIndex: this.state.pageSize,
            currentViewCards: null
          });
    }
    if(!this.state.currentViewCards) {
      const currentViewCards = filteredCountries
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)
        .map((cardData) => (
          <Col key={cardData.codes.alpha3Code}>
            <CountryCard data={cardData} />
          </Col>
        ));

      this.setState({ 
        currentViewCards: currentViewCards,
      })
    }
  }

  changeNumDisplayed(page, pageSize) {
    // Update pagination for current page and cards
    this.setState({
      numPerPage: pageSize,
      pageNumber: page,
      firstCardIndex: (page - 1) * pageSize,
      lastCardIndex: page * pageSize,
      currentViewCards: null
    });
  };

  changeSort(value) {
    this.setState({
      sortBy: value
    })
  }

  createCountryGrid(countryCards) {
    return countryCards;
  }

  handleChange(e) {
    console.log(e.target.value);
  }

  render() {
    const data = this.state.countriesCardData;
    // Get all loaded country cards in the current view
    var currentViewCards =
      data &&
      data.length > 0 &&
      data
        .sort((a, b) => {
          switch(this.state.sortBy){
            case this.SORT_TYPES.NAME:
              return a.name.localeCompare(b.name)
            case this.SORT_TYPES.ALPHA3:
              return a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
            case this.SORT_TYPES.ALPHA2:
              return a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
            case this.SORT_TYPES.POPULATION:
              return a.population - b.population
            case this.SORT_TYPES.NUM_CASES:
              return a.population - b.population
          }
        })
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)
      console.log(currentViewCards)
      currentViewCards = currentViewCards?.map((cardData) => (
          <Col>
            <CountryCard key={cardData.codes.alpha3Code} data={cardData} />
          </Col>
        ));
    // Form model view if data has been loaded
    const pagination = currentViewCards && this.state.filteredCountries ? (
      <Pagination
        style={{ display: "inline-block", verticalAlign: "top" }}
        current={this.state.pageNumber} // current page number
        defaultPageSize={this.state.numPerPage} // default size of page
        pageSizeOptions={["10", "20", "50", "100"]}
        onChange={this.changeNumDisplayed}
        total={this.state.filteredCountries.length} //total number of countries
      />
    ) : (
      <div />
    );

    const styles = {
      siteCardWrapper: {
        margin: "2vh 5vw",
      },
    };
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
          Countries{" "}
        </h1>
        <Space className="country-display-header">
          <div>Sort by:</div>
          <Select 
            style={{ width: 200, display: "inline-block", verticalAlign: "top"}} 
            defaultValue="Country Name" 
            onChange={this.changeSort}
          >  
            <OptGroup label="Name">
              <Option value={this.SORT_TYPES.NAME} key="cName">Country Name</Option>
              <Option value={this.SORT_TYPES.ALPHA2} key="iso2">ISO Alpha 2 Code</Option>
              <Option value={this.SORT_TYPES.ALPHA3} key="iso3">ISO Alpha 3 Code</Option>
            </OptGroup>
            <OptGroup label="Statistics">
              <Option value={this.SORT_TYPES.NUM_CASES} key="casesHi">Cases, Low-High</Option>
              <Option value={this.SORT_TYPES.POPULATION} key="popHi">Population, Low-High</Option>
            </OptGroup>
          </Select>
          <div>from</div>
          <Input.Group>
            <Input style={{ width: 40, textAlign: 'center', textTransform: "uppercase" }} defaultValue="A" maxLength="1" onPressEnter={e => this.setState({sortLowVal: e.target.value.toUpperCase(), filteredCountries: null})}/>
            <Input
              style={{
                width: 40,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="to"
              disabled
            />
            <Input
              style={{
                width: 40,
                textAlign: 'center',
                textTransform: "uppercase"
              }}
              defaultValue="Z"
              maxLength="1"
              onPressEnter={e => this.setState({sortHiVal: e.target.value.toUpperCase(), filteredCountries: null})}
            />
          </Input.Group>
          <Divider type="vertical" />
          {pagination}          
        </Space>

        <div className="site-card-wrapper" style={styles.siteCardWrapper}>
          <Row gutter={16} justify="center">
            {currentViewCards?.length!=0 ? this.createCountryGrid(currentViewCards) : <div>oh no</div>}
          </Row>
        </div>
      </div>
    );
  }
}
