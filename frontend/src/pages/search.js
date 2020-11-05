import React, { Component } from "react";
import Search from "react-search";
import { withRouter } from "react-router-dom";
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
    let items = [
      { id: curID++, value: "Home", route: "/home" },
      { id: curID++, value: "About", route: "/about" },
      { id: curID++, value: "Countries", route: "/countries" },
      { id: curID++, value: "Cases", route: "/case-statistics" },
      { id: curID++, value: "Risks", route: "/risk-factor-statistics" },
      { id: curID++, value: "Global News", route: "/global-news" },
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
          value: identifier,
          route: `/countries/${alpha3Code}`,
        });
        items.push({
          id: curID++,
          type: "Case Statistic",
          value: identifier,
          route: `/case-statistics/${alpha3Code}`,
        });
        items.push({
          id: curID++,
          type: "Risk Factor Statistic",
          value: identifier,
          route: `/risk-factor-statistics/${alpha3Code}`,
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
            render: (text) => <>{text.toLocaleString()}</>,
          },
          {
            title: "Name",
            dataIndex: "value",
            key: "value",
            render: (value) => (
              <Link to={`/countries/${country.codes.alpha3Code}`}>
                {searchValue != "" ? (
                  <HighlighterText
                    text={country.name}
                    searchValue={searchValue}
                  />
                ) : (
                  country.name
                )}
              </Link>
            ),
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
            <Search
              items={this.state.items}
              placeholder=""
              onItemsChanged={this.onSelect.bind(this)}
              getItemsAsync={this.getItemsAsync.bind(this)}
              NotFoundPlaceholder="No results match this query"
              onKeyChange={this.getQuery.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteSearch);
