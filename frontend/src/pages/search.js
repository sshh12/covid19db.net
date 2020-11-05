import React, { Component } from "react";
import Search from "react-search";
import { Link, withRouter } from "react-router-dom";
import axios from "../client";
import Highlight from "react-highlighter";
import { Button, Table } from "antd";

// sitewide search bar component
class SiteSearch extends Component {
  constructor() {
    super();
    this.state = { items: null, query: null, dataSource: null };
  }

  componentDidMount() {
    let curID = 0;

    let items = [
      { id: curID++, type: "Page", value: { text: "Home", route: "/home" } },
      { id: curID++, type: "Page", value: { text: "About", route: "/about" } },
      {
        id: curID++,
        type: "Page",
        value: { text: "Countries", route: "/countries" },
      },
      {
        id: curID++,
        type: "Page",
        value: { text: "Cases", route: "/case-statistics" },
      },
      {
        id: curID++,
        type: "Page",
        value: { text: "Risks", route: "/risk-factor-statistics" },
      },
      {
        id: curID++,
        type: "Page",
        value: { text: "Global News", route: "/global-news" },
      },
    ];

    const options = {
      params: {
        attributes: "name,codes",
      },
    };

    axios.get("countries", options).then((res) => {
      res.data.forEach((country) => {
        const alpha3Code = country.codes.alpha3Code;
        const identifier = `${country.name} (${country.codes.alpha2Code}, ${country.codes.alpha3Code})`;
        items.push({
          id: curID++,
          type: "Country",
          value: { text: identifier, route: `/countries/${alpha3Code}` },
        });
        items.push({
          id: curID++,
          type: "Case Statistic",
          value: { text: identifier, route: `/case-statistics/${alpha3Code}` },
        });
        items.push({
          id: curID++,
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

  render() {
    let columns = [
      {
        title: "Search by country name, code, model type, or a page",
        children: [
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (text) => <>{text}</>,
          },
          {
            title: "Name",
            dataIndex: "value",
            key: "value",
            render: (value) => <Link to={value.route}>{value.text}</Link>,
          },
        ],
      },
    ];

    return (
      <div className="App">
        <h1
          style={{
            fontWeight: 800,
            marginTop: 20,
            marginBottom: 20,
            fontSize: "2em",
          }}
        >
          Search
        </h1>
        <h3 style={{ fontWeight: 400, fontSize: "1.7em" }}>
          Try searching for pages, countries, and ISO 3166-1 codes.
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "50vw",
              backgroundColor: "#323776",
              userSelect: "none",
            }}
          >
            <Table
              style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={this.state.dataSource}
              pagination={{ position: ["bottomRight", "topRight"] }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteSearch);
