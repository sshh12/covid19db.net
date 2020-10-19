// import { LinkContainer } from "react-router-bootstrap";
import React, { Component, Fragment } from "react";
import { Button, Card, Col, Pagination, Row } from "antd";
// import { Button, Table, Tag, Space } from "antd";
import axios from 'axios';
import RiskEntry from "../components/risks/riskEntry";

import USAData from "../components/risks/data/USA.json";
import GBRData from "../components/risks/data/GBR.json";
import MEXData from "../components/risks/data/MEX.json";

export default class Risks extends Component {
  numPerPage = 15;
  
  constructor() {
    super();
    this.state = {
      riskData : [],
      firstEntryIndex: 0,
      lastEntryIndex: this.numPerPage
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // https://api.covid19db.net/
  // risk-factor-statistics
  componentDidMount() {
    axios.get('sampleData.json', {
      params: {
        // attributes: "country,location,populationDensity,humanDevelopmentIndex,gini,gdpPerCapita,medianAge,aged65Older,aged70Older,extremePovertyRate,cardiovascDeathRate,diabetesPrevalence,femaleSmokers,maleSmokers,hospitalBedsPerThousand,lifeExpectancy,handwashingFacilities"
        attributes: "country,location,populationDensity,humanDevelopmentIndex,gini"
      }
    })
    .then(res => {
        const riskData = res.data;
        this.setState({ riskData })
      }, (error) => {
        console.log("error: Promise not fulfilled")
      })
  }

  handleChange = value => {
    console.log(value)
    this.setState({
      firstEntryIndex: (value - 1) * this.numPerPage,
      lastEntryIndex: value * this.numPerPage
    })
  }








  render() {
    // const columns = [
    //   {
    //     title: "Country",
    //     dataIndex: "country",
    //     key: "country",
    //     render: (country) => (
    //     <a href={`/countries/${country.codes.alpha3Code}`}>
    //       {country.name}
    //     </a>
    //     // <LinkContainer to={`/countries/${country.codes.alpha3Code}`}>
    //     //   <a>{country.name}</a>
    //     // </LinkContainer>
    //     ),
    //     sorter: (a, b) => a.country.name.localeCompare(b.country.name),
    //   },
    //   {
    //     title: "Life Expectancy",
    //     dataIndex: "lifeExpectancy",
    //     key: "lifeExpectancy",
    //     sorter: (a, b) => a.lifeExpectancy - b.lifeExpectancy,
    //   },
    //   {
    //     title: "Human Development Index",
    //     dataIndex: "humanDevelopmentIndex",
    //     key: "humanDevelopmentIndex",
    //     sorter: (a, b) => a.humanDevelopmentIndex - b.humanDevelopmentIndex,
    //   },
    //   {
    //     title: "Population Density",
    //     dataIndex: "populationDensity",
    //     key: "populationDensity",
    //     render: (population) => <>{population.toLocaleString()}</>,
    //     sorter: (a, b) => a.populationDensity - b.populationDensity,
    //   },
    //   {
    //     title: "Gini",
    //     dataIndex: "gini",
    //     key: "gini",
    //     sorter: (a, b) => a.gini - b.gini,
    //   },
    //   {
    //     title: "Explore Risks",
    //     dataIndex: "exploreRisk",
    //     key: "exploreRisk",
    //     render: (code) => (
    //       // <LinkContainer to={`/risks/${code}`}>
    //       //   <Button>Explore</Button>
    //       // </LinkContainer>

    //       <a href={`/risks/${code}`}>
    //         <Button>Explore</Button>
    //       </a>
    //     ),
    //   },
    //   {
    //     title: "Explore Cases",
    //     dataIndex: "exploreRisk",
    //     key: "exploreCase",
    //     render: (code) => (
    //       // <LinkContainer to={`/cases/${code}`}>
    //       //   <Button>Explore</Button>
    //       // </LinkContainer>
    //       <a href={`/cases/${code}`}>
    //         <Button>Explore</Button>
    //       </a>
    //     ),
    //   },
    // ];

    // const data = [
    //   {
    //     key: "1",
    //     country: GBRData.country,
    //     lifeExpectancy: GBRData.lifeExpectancy,
    //     humanDevelopmentIndex: GBRData.humanDevelopmentIndex,
    //     populationDensity: GBRData.populationDensity,
    //     gini: GBRData.gini,
    //     exploreRisk: GBRData.country.codes.alpha3Code,
    //   },
    //   {
    //     key: "2",
    //     country: MEXData.country,
    //     lifeExpectancy: MEXData.lifeExpectancy,
    //     humanDevelopmentIndex: MEXData.humanDevelopmentIndex,
    //     populationDensity: MEXData.populationDensity,
    //     gini: MEXData.gini,
    //     exploreRisk: MEXData.country.codes.alpha3Code,
    //   },
    //   {
    //     key: "3",
    //     country: USAData.country,
    //     lifeExpectancy: USAData.lifeExpectancy,
    //     humanDevelopmentIndex: USAData.humanDevelopmentIndex,
    //     populationDensity: USAData.populationDensity,
    //     gini: USAData.gini,
    //     exploreRisk: USAData.country.codes.alpha3Code,
    //   },
    // ];

    const data = this.state.riskData

    // get all country cards in the current view
    const currentView = data && data.length > 0 && data
      .slice(this.state.firstEntryIndex, this.state.lastEntryIndex)
      .map(riskData => <RiskEntry key={riskData.country.codes.alpha3Code} data={riskData}/>)
    console.log(this.state.firstEntryIndex, this.state.lastEntryIndex)
    const risks = data 
      ? (<Fragment>
        {currentView}
        <Pagination
          defaultCurrent={1} // default to first page
          defaultPageSize={this.numPerPage} // default size of page
          onChange={this.handleChange}
          total={data.length} //total number of countries
        />
      </Fragment>)
      : <div/>;

    return (
      // <div className="App">
      //   {/* <header className="App-header"> */}
      //   <h1
      //     style={{
      //       fontWeight: "800",
      //       fontSize: "2em",
      //       marginTop: "20px",
      //       marginBottom: "20px",
      //     }}
      //   >
      //     Risk Factors & Statistics{" "}
      //   </h1>
      //   <Table
      //     style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
      //     columns={columns}
      //     dataSource={data}
      //     pagination={false}
      //   />
      //   {/* </header> */}
      // </div>


    <div className="App">
      <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Risks </h1>
      <div style={{ margin: "0 5vw" }}>
        {risks}
      </div>
    </div>
    );
  }
}
