import React, { Component } from "react";
import { Button, Table } from "antd";
import axios from "../client";
import { Link } from "react-router-dom";

import Search from "react-search";

export default class Risks extends Component {
  numPerPage = 10; // this number simply does not mean anything and is not used here

  constructor() {
    super();
    this.state = {
      riskData: [],
      firstEntryIndex: 0,
      lastEntryIndex: this.numPerPage,
      items: [],
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

  render() {
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
        <h1
          style={{
            fontWeight: "800",
            fontSize: "2em",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
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

        {/* filtering */}
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
