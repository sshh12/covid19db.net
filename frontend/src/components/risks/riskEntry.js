import React, { Component } from "react";
import { Button, Table} from "antd";
import axios from 'axios';
// import "../risks/riskInstance.css";


export default class RiskEntry extends Component {
    render() {

      const {country, location, populationDensity, humanDevelopmentIndex, gini, gdpPerCapita, medianAge, aged65Older, aged70Older, extremePovertyRate, cardiovascDeathRate, diabetesPrevalence, femaleSmokers, maleSmokers, hospitalBedsPerThousand, lifeExpectancy, handwashingFacilities} = this.props.data;
      // const {country, location, populationDensity, humanDevelopmentIndex, gini} = this.props.data;
    //   const columns = [
    //   {
    //     title: "Country",
    //     dataIndex: "country",
    //     key: "country",
    //     render: (country) => (
    //     <a href={`/countries/${country.codes.alpha3Code}`}>
    //       {country.name}
    //     </a>
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
    //       <a href={`/cases/${code}`}>
    //         <Button>Explore</Button>
    //       </a>
    //     ),
    //   },
    // ];
    
    // const {country, location, populationDensity, humanDevelopmentIndex, gini, 
    //   gdpPerCapita, medianAge, aged65Older, aged70Older, extremePovertyRate, 
    //   cardiovascDeathRate, diabetesPrevalence, femaleSmokers, maleSmokers, 
    //   hospitalBedsPerThousand, lifeExpectancy, handwashingFacilities}

    const data = [
      {
        key: "1",
        country: country.name,
        lifeExpectancy: lifeExpectancy,
        humanDevelopmentIndex: humanDevelopmentIndex,
        populationDensity: populationDensity,
        gini: gini,
        exploreRisk: country.codes.alpha3Code,
      }
    ];





        
        return (
          <div className="App">
            {/* <header className="App-header"> */}
            <h1 style={{ fontWeight: "800", fontSize: "2em", marginTop: "20px", marginBottom: "20px" }}
            >
            </h1>
            <div>
            | country: {country.name} | Life Ex: {lifeExpectancy} | HDI: {humanDevelopmentIndex}
              | Pop Density: {populationDensity} | GINI: {gini} | 
            <a href={`/cases/${country.codes.alpha3Code}`}>
              <Button>Explore</Button>
            </a>
            </div>
            {/* <Table
              style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={data}
              // pagination={false}
            /> */}
            {/* </header> */}
          </div>           
        )
    }
}