import React, { Component, Fragment } from "react";
import { Button, Card, Col, Pagination, Row } from "antd";
import { LinkContainer } from "react-router-bootstrap";
import axios from 'axios';

import "../components/countryInstances/countryInstance.css";
import CountryCard from "../components/country/countryCard";

import { lang } from "moment";
const { Meta } = Card;

export default class Countries extends Component {
  numPerPage = 4;
  
  constructor() {
    super();
    this.state = {
      countriesCardData : [],
      firstCardIndex: 0,
      lastCardIndex: this.numPerPage
    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    axios.get('countries', {
      params: {
        attributes: "codes,flag,population,capital,languages"
      }
    })
    .then(res => {
        const countriesCardData = res.data;
        this.setState({ countriesCardData })
      })
  }

  handleChange = value => {
    console.log(value)
    this.setState({
      firstCardIndex: (value - 1) * this.numPerPage,
      lastCardIndex: value * this.numPerPage
    })
  }

  render() {
    const data = this.state.countriesCardData

    // get all country cards in the current view
    const currentViewCards = data && data.length > 0 && data
      .slice(this.state.firstCardIndex, this.state.lastCardIndex)
      .map(cardData => <CountryCard key={cardData.codes.alpha3Code} data={cardData}/>)
    console.log(this.state.firstCardIndex, this.state.lastCardIndex)
    const countries = data 
      ? (<Fragment>
        {currentViewCards}
        <Pagination
          defaultCurrent={1} // default to first page
          defaultPageSize={this.numPerPage} // default size of page
          onChange={this.handleChange}
          total={data.length} //total number of countries
        />
      </Fragment>)
      : <div/>;

    return (
      <div className="App">
        <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Countries </h1>
        <div className="site-card-wrapper" style={{ margin: "0 5vw" }}>
          {countries}
        </div>
      </div>
    );
  }
}
