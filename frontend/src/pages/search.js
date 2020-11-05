import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "../client";
import { HighlighterText, SearchBar } from "./../components/searchComponents";
import { Button, Table } from "antd";

// sitewide search bar component
class SiteSearch extends Component {
  constructor() {
    super();
    this.state = { items: null, query: null, dataSource: null };
  }

  componentDidMount() {
    //Add basic static pages into data
    let items = [
      { type: "Page", value: { text: "Home", route: "/home" } },
      { type: "Page", value: { text: "About", route: "/about" } },
      {
        type: "Page",
        value: { text: "Countries", route: "/countries" },
      },
      {
        type: "Page",
        value: { text: "Cases", route: "/case-statistics" },
      },
      {
        type: "Page",
        value: { text: "Risks", route: "/risk-factor-statistics" },
      },
      {
        type: "Page",
        value: { text: "Global News", route: "/global-news" },
      },
    ];

    const options = {
      params: {
        attributes: "name,codes",
      },
    };

    // Use api to get rest of all the model and instance data
    // Push each country with a country, case-statistic, and risk-factor instance
    axios.get("countries", options).then((res) => {
      res.data.forEach((country) => {
        const alpha3Code = country.codes.alpha3Code;
        const identifier = `${country.name} (${country.codes.alpha2Code}, ${country.codes.alpha3Code})`;
        items.push({
          type: "Country",
          value: { text: identifier, route: `/countries/${alpha3Code}` },
        });
        items.push({
          type: "Case Statistic",
          value: { text: identifier, route: `/case-statistics/${alpha3Code}` },
        });
        items.push({
          type: "Risk Factor Statistic",
          value: {
            text: identifier,
            route: `/risk-factor-statistics/${alpha3Code}`,
          },
        });
      });
      this.setState({ items });
      this.setState({ dataSource: items });
    });
  }

  // Callback function to set table datasource
  setDataSource = (dataSource) => {
    this.setState({ dataSource: dataSource });
  };

  // Callback function to set current search query
  setQuery = (value) => {
    this.setState({ query: value });
  };

  render() {
    let { items, query, dataSource } = this.state;

    // Setup columns of table (type and name of type with link to page)
    let columns = [
      {
        title: "Results",
        dataIndex: "type",
        key: "type",
        render: (text) =>
          query != "" ? (
            <HighlighterText text={text} searchValue={query} />
          ) : (
            <>{text}</>
          ),
        width: 250,
      },
      {
        title: "",
        dataIndex: "value",
        key: "value",
        render: (value) => (
          <Link to={value.route}>
            {query != "" ? (
              <HighlighterText text={value.text} searchValue={query} />
            ) : (
              value.text
            )}
          </Link>
        ),
      },
    ];

    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#323776",
            paddingBottom: 40,
            paddingTop: 20,
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              marginTop: 0,
              marginBottom: 20,
              fontSize: "2em",
              color: "white",
            }}
          >
            Search
          </h1>
          <SearchBar
            style={{ width: "75vw" }}
            searchValue={query}
            data={items}
            setDataSource={this.setDataSource}
            setSearchValue={this.setQuery}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              width: "25vw",
            }}
          >
            <Button>All</Button>
            <Button>Countries</Button>
            <Button>Cases</Button>
            <Button>Risks</Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "75vw",
              backgroundColor: "#323776",
              userSelect: "none",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Table
              style={{ margin: "0 0vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={dataSource}
              pagination={{ position: ["bottomRight"] }}
              showHeader={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteSearch);
