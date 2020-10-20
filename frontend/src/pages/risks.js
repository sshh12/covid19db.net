import React, { Component, Fragment } from "react";
import { Button, Col, Pagination, Row, Table } from "antd";
import axios from "../client";

export default class Risks extends Component {
  numPerPage = 10; // this number simply does not mean anything and is not used here

  constructor() {
    super();
    this.state = {
      riskData: [],
      firstEntryIndex: 0,
      lastEntryIndex: this.numPerPage,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // https://api.covid19db.net/
  // risk-factor-statistics
  // 'sampleData.json'
  componentDidMount() {
    axios
      .get("risk-factor-statistics", {
        params: {
          attributes:
            "country,location,populationDensity,humanDevelopmentIndex,gini,gdpPerCapita,medianAge,aged65Older,aged70Older,extremePovertyRate,cardiovascDeathRate,diabetesPrevalence,femaleSmokers,maleSmokers,hospitalBedsPerThousand,lifeExpectancy,handwashingFacilities",
        },
      })
      .then(
        (res) => {
          const riskData = res.data;
          this.setState({ riskData });
        },
        (error) => {
          console.log("error: Promise not fulfilled");
        }
      );
  }

  // handleChange = value => {
  //   console.log(value)
  //   this.setState({
  //     firstEntryIndex: (value - 1) * this.numPerPage,
  //     lastEntryIndex: value * this.numPerPage
  //   })
  // }

  handleChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  render() {
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <a href={`/countries/${country?.codes?.alpha3Code}`}>
            {country?.name}
          </a>
        ),
        sorter: (a, b) => a.country?.name?.localeCompare(b.country?.name),
      },
      {
        title: "Life Expectancy",
        dataIndex: "lifeExpectancy",
        key: "lifeExpectancy",
        sorter: (a, b) => a?.lifeExpectancy - b?.lifeExpectancy,
      },
      {
        title: "Human Development Index",
        dataIndex: "humanDevelopmentIndex",
        key: "humanDevelopmentIndex",
        sorter: (a, b) => a?.humanDevelopmentIndex - b?.humanDevelopmentIndex,
      },
      {
        title: "Population Density",
        dataIndex: "populationDensity",
        key: "populationDensity",
        render: (population) => <>{population?.toLocaleString()}</>,
        sorter: (a, b) => a?.populationDensity - b?.populationDensity,
      },
      {
        title: "Gini",
        dataIndex: "gini",
        key: "gini",
        sorter: (a, b) => a?.gini - b?.gini,
      },
      {
        title: "Explore Risks",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <a href={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </a>
        ),
      },
      {
        title: "Explore Cases",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <a href={`/case-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </a>
        ),
      },
    ];

    const data = this.state.riskData;
    // get all risk entries in the current view
    // const currentView = data && data.length > 0 && data
    //   .slice(this.state.firstEntryIndex, this.state.lastEntryIndex)
    //   .map(riskData => <Table columns={columns} dataSource={data} onChange={this.handleChange} />);
    //   // .map(riskData => <div key={riskData.country}>| {riskData.populationDensity} | {riskData.gini}| </div>);

    // console.log(this.state.firstEntryIndex, this.state.lastEntryIndex);
    // const risks = data
    //   ? (<Fragment>
    //     {currentView}
    //     <Pagination
    //       defaultCurrent={1} // default to first page
    //       defaultPageSize={this.numPerPage} // default size of page
    //       onChange={this.handleChange}
    //       total={data.length} //total number of countries
    //     />
    //   </Fragment>)
    //   : <div/>;

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
          Risk Factors & Statistics{" "}
        </h1>
        <Table
          style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
        ></Table>
      </div>
    );
  }
}
