import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Button, ButtonGroup } from "react-bootstrap";
import Map from "../components/map";
import axios from 'axios';

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      globalData: null
    };
  }

  componentDidMount() {
    axios.get('global-stats')
      .then(res => {
        const globalData = res.data;
        console.log(globalData);
        this.setState({ globalData })
      }, (error) => {
        console.log("error: promise not fulfilled")
        console.log(error)
      })
  }

  render() {
    const data = this.state.globalData;
    if (!data) {
      return <div />
    }

    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <header
          className="App-header"
          style={{ minHeight: "10rem", padding: "18px" }}
        >
          <h1 style={{ color: "#fff" }}>Main Page</h1>
          <ButtonGroup vertical>
            <LinkContainer className="App-link" to="/about" size="lg">
              <Button variant="outline-secondary">About Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/countries" size="lg">
              <Button variant="outline-secondary">Countries Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/cases" size="lg">
              <Button variant="outline-secondary">Cases Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/risks" size="lg">
              <Button variant="outline-secondary">Risks Page</Button>
            </LinkContainer>
          </ButtonGroup>
        </header> */}
        <div style={{ flex: 1 }}>
          <h1>Global Statistics</h1>
          <div className='totals'>
            <h2 className='totals-title'>Total Cases</h2>
            <h2 className='totals-data'>{data.totals.cases}</h2>
          </div>
          <div className='totals'>
            <h2 className='totals-title'>Total Deaths</h2>
            <h2 className='totals-data'>{data.totals.deaths}</h2>
          </div>
          <div className='totals'>
            <h2 className='totals-title'>Total Recovered</h2>
            <h2 className='totals-data'>{data.totals.recovered}</h2>
          </div>
          <div className='totals'>
            <h2 className='totals-title'>Total Active</h2>
            <h2 className='totals-data'>{data.totals.active}</h2>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <Map
            center={[15, 30]}
            zoom={1.95}
            height={window.innerHeight - 69 + (420 - 420)} // Perfect value to fit the map on the splash page... nice
            width={'100vw'}
          />
        </div>

      </div>
    );
  }
}
