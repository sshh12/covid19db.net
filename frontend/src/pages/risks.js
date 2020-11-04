import React, { Component } from "react";
import axios from "../client";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import Search from "react-search";

export default class Risks extends Component {
  constructor() {
    super();
    this.state = {
      riskData: [],
      items: [],
      filteredInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
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

      // searching stuff
      let curID = 0;
      // begin by adding pages
      let items = [
        {id: curID++, value: "Risks", route: "/risk-factor-statistics"},
      ];
      // retrieve necessary data from API and populate remainder
      const options = {
        params: {
          attributes: "name,codes"
        }
      };
      // api call
      axios.get("countries", options).then((res)=>{
        // sort countries by name
        res.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        // for each country, push possible results
        res.data.forEach(country => {
          const alpha3Code = country.codes.alpha3Code;
          const identifier = `${country.name} (${country.codes.alpha2Code}, ${country.codes.alpha3Code})`;
          items.push({
            id: curID++,
            value: "Risks for " + identifier,
            route: `/risk-factor-statistics/${alpha3Code}`
          });
        });
        this.setState({ items });
      });
  }

  handleChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  // navigate to route upon item selection
  onSelect(items){
    const selected = items[0];
    // navigate to selected item if not undefined
    if(selected !== undefined){
      const route = this.state.items[selected.id].route;
      window.open(route, "_self");
    }
  }

  // load search results asynchronously
  getItemsAsync(query, cb){
    cb(query);
  }

  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    this.setState({
      filteredInfo: filters,
    });
  };


  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/countries/${country?.codes?.alpha3Code}`}>
            {country?.name}
          </Link>
        ),
        sorter: (a, b) => a.country?.name?.localeCompare(b.country?.name),
      },
      {
        title: "Life Expectancy",
        dataIndex: "lifeExpectancy",
        key: "lifeExpectancy",
        sorter: (a, b) => a?.lifeExpectancy - b?.lifeExpectancy,

        filters: [
          { text: '80 - 90', value: 80 },
          { text: '70 - 80', value: 70 },
          { text: '60 - 70', value: 60 },
          { text: '50 - 60', value: 50 },
          { text: '40 - 50', value: 40 },
        ],
        filteredValue: filteredInfo.lifeExpectancy || null,
        onFilter: (value, record) => (record.lifeExpectancy > value && record.lifeExpectancy < value + 10),
        ellipsis: true,
      },
      {
        title: "HDI",
        dataIndex: "humanDevelopmentIndex",
        key: "humanDevelopmentIndex",
        sorter: (a, b) => a?.humanDevelopmentIndex - b?.humanDevelopmentIndex,
        filters: [
          { text: '0.500 - 0.550', value: 0.500 },
          { text: '0.450 - 0.500', value: 0.450 },
          { text: '0.400 - 0.450', value: 0.400 },
          { text: '0.350 - 0.400', value: 0.350 },
          { text: '0.300 - 0.350', value: 0.300 },  
        ],
        filteredValue: filteredInfo.humanDevelopmentIndex || null,
        onFilter: (value, record) => (record.humanDevelopmentIndex > value && record.humanDevelopmentIndex < value + 0.050),
        ellipsis: true,
      },
      {
        title: "Population Density",
        dataIndex: "populationDensity",
        key: "populationDensity",
        render: (population) => <>{population?.toLocaleString()}</>,
        sorter: (a, b) => a?.populationDensity - b?.populationDensity,
        filters: [
          { text: '15000 - 20000', value: 15000 },
          { text: '10000 - 15000', value: 10000 },
          { text: '5000 - 10000', value: 5000 },
          { text: '0 - 5000', value: 0 },
        ],
        filteredValue: filteredInfo.populationDensity || null,
        onFilter: (value, record) => (record.populationDensity > value && record.populationDensity < value + 5000),
        ellipsis: true,
      },
      {
        title: "Gini",
        dataIndex: "gini",
        key: "gini",
        sorter: (a, b) => a?.gini - b?.gini,
        filters: [
          { text: '75 - 100', value: 75 },
          { text: '50 - 75', value: 50 },
          { text: '25 - 50', value: 25 },
          { text: '0 - 25', value: 0 },
        ],
        filteredValue: filteredInfo.gini || null,
        onFilter: (value, record) => (record.gini > value && record.gini < value + 25),
        ellipsis: true,
      },
      {
        title: "Explore Risks",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </Link>
        ),
      },
      {
        title: "Explore Cases",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link to={`/case-statistics/${country?.codes?.alpha3Code}`}>
            <Button>Explore</Button>
          </Link>
        ),
      },
    ];
    const data = this.state.riskData;
    return (
      <div className="App">
        <h1 style={{ fontWeight: "800", fontSize: "2em", marginTop: "20px", marginBottom: "20px", }} >
          Risk Factors &amp; Statistics{" "}
        </h1>
        {/* search bar */}
        <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{width: "50vw", backgroundColor: "#323776", userSelect: "none"}}>
            <Search items={this.state.items}
                    placeholder="Search for Risks"
                    onItemsChanged={this.onSelect.bind(this)}
                    getItemsAsync={this.getItemsAsync.bind(this)}
                    NotFoundPlaceholder="No results match this query"
              />
          </div>
        </div>
        {/* Table of risk data */}
        <Table
          style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          pagination={{ position: ["bottomRight", "topRight"] }}
        ></Table>
      </div>
    );
  }
}
