import React, { Component } from "react";
import { Col, Pagination, Row } from "antd";
import axios from "../client";

import "../components/country/countryInstance.css";
import CountryCard from "../components/country/countryCard.js";

export default class Countries extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      countriesCardData: null,
      firstCardIndex: 0,
      lastCardIndex: 20,
      numPerPage: 20,
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange = (page, pageSize) => {
    // Update pagination for current page and cards
    this.setState({
      page: page,
      numPerPage: pageSize,
      firstCardIndex: (page - 1) * pageSize,
      lastCardIndex: page * pageSize,
    });
  };

  createCountryGrid(countryCards) {
    return countryCards;
  }

  render() {
    const data = this.state.countriesCardData;

    // Get all loaded country cards in the current view
    const currentViewCards =
      data &&
      data.length > 0 &&
      data
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)
        .map((cardData) => (
          <Col>
            <CountryCard key={cardData.codes.alpha3Code} data={cardData} />
          </Col>
        ));

    // Form model view if data has been loaded
    const CustomPagination = data ? (
      <Pagination
        current={this.state.page} // default to first page
        pageSize={this.state.numPerPage} // default size of page
        pageSizeOptions={["10", "20", "50", "100"]}
        onChange={this.handleChange}
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
        {CustomPagination}
        <div className="site-card-wrapper" style={styles.siteCardWrapper}>
          <Row gutter={16} justify="center">
            {this.createCountryGrid(currentViewCards)}
          </Row>
        </div>
        {CustomPagination}
      </div>
    );
  }
}
