import React, { Component } from "react";
import { Button, Table } from "antd";
import axios from "../client";
import { Link } from "react-router-dom";

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
          <Link to={`/countries/${country?.codes?.alpha3Code}`}>{country?.name}</Link>
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
          <Link to={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}><Button>Explore</Button></Link>
        ),
      },
      {
        title: "Explore Cases",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/case-statistics/${country?.codes?.alpha3Code}`}><Button>Explore</Button></Link>
        ),
      },
    ];

    const data = this.state.riskData;

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
