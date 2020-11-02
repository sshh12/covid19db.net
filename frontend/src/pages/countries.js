import React, { Component } from "react";
import { Button, Col, Divider, Dropdown, Input, Pagination, Row, Select, Slider, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';

import axios from "../client";

// import "../components/country/countryInstance.css";
import CountryCard from "../components/country/countryCard.js";

const { Option, OptGroup } = Select;

export default class Countries extends Component {
  SORT_TYPES = {
    NAME_A: 1,
    NAME_Z: 2,
    ALPHA3_A: 3,
    ALPHA3_Z: 4,
    ALPHA2_A: 5,
    ALPHA2_Z: 6,
    NUM_CASES_HI: 7,
    NUM_CASES_LOW: 8,
    POPULATION_HI: 9,
    POPULATION_LOW: 10,
  };

  constructor() {
    super();
    this.state = {
      countriesCardData: null,
      firstCardIndex: 0,
      lastCardIndex: 20,
      numPerPage: 20,
      sortBy: this.SORT_TYPES.NAME_A,
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
        const countriesCardData = res.data;
        this.setState({ countriesCardData });
      });
  }

  changeNumDisplayed(page, pageSize) {
    // Update pagination for current page and cards
    console.log(page, pageSize);
    this.setState({
      numPerPage: pageSize,
      firstCardIndex: (page - 1) * pageSize,
      lastCardIndex: page * pageSize,
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
            case this.SORT_TYPES.NAME_A:
              return a.name.localeCompare(b.name)
            case this.SORT_TYPES.NAME_Z:
              return b.name.localeCompare(a.name)
            case this.SORT_TYPES.ALPHA3_A:
              return a.codes.alpha3Code.localeCompare(b.codes.alpha3Code)
            case this.SORT_TYPES.ALPHA3_Z:
              return b.codes.alpha3Code.localeCompare(a.codes.alpha3Code)
            case this.SORT_TYPES.ALPHA2_A:
              return a.codes.alpha2Code.localeCompare(b.codes.alpha2Code)
            case this.SORT_TYPES.ALPHA2_Z:
              return b.codes.alpha2Code.localeCompare(a.codes.alpha2Code)
            case this.SORT_TYPES.POPULATION_LOW:
              return a.population - b.population
            case this.SORT_TYPES.POPULATION_HI:
              return b.population - a.population
            case this.SORT_TYPES.NUM_CASES_LOW:
              return a.population - b.population
            case this.SORT_TYPES.NUM_CASES_HI:
              return b.population - a.population
          }
        })
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)

      currentViewCards = currentViewCards?.map((cardData) => (
          <Col key={cardData.codes.alpha3Code}>
            <CountryCard data={cardData} />
          </Col>
        ));
    // Form model view if data has been loaded
    const pagination = data ? (
      <Pagination
        style={{ display: "inline-block", verticalAlign: "top" }}
        defaultCurrent={1} // default to first page
        defaultPageSize={this.state.numPerPage} // default size of page
        pageSizeOptions={["10", "20", "50", "100"]}
        onChange={this.changeNumDisplayed}
        total={data.length} //total number of countries
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
            listHeight="auto"
          >  
            <OptGroup label="Name">
              <Option value={this.SORT_TYPES.NAME_A}>Country Name</Option>
              <Option value={this.SORT_TYPES.ALPHA2_A}>ISO Alpha 2 Code</Option>
              <Option value={this.SORT_TYPES.ALPHA3_A}>ISO Alpha 3 Code</Option>
            </OptGroup>
            <OptGroup label="Statistics">
              <Option value={this.SORT_TYPES.NUM_CASES_LOW}>Cases, Low-High</Option>
              <Option value={this.SORT_TYPES.NUM_CASES_HI}>Cases, High-Low</Option>
              <Option value={this.SORT_TYPES.POPULATION_LOW}>Population, Low-High</Option>
              <Option value={this.SORT_TYPES.POPULATION_HI}>Population, High-Low</Option>
            </OptGroup>
          </Select>
          <div>from</div>
          <Input.Group>
            <Input style={{ width: 40, textAlign: 'center' }} defaultValue="A" maxLength="1" onChange={this.handleChange}/>
            <Input
              style={{
                width: 40,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="to"
            />
            <Input
              style={{
                width: 40,
                textAlign: 'center',
              }}
              defaultValue="Z"
              maxLength="1"
            />
          </Input.Group>
          <Divider type="vertical" />
          {pagination}          
        </Space>

        <div className="site-card-wrapper" style={styles.siteCardWrapper}>
          <Row gutter={16} justify="center">
            {this.createCountryGrid(currentViewCards)}
          </Row>
        </div>
      </div>
    );
  }
}
