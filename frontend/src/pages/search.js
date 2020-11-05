import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "../client";
import { HighlighterText, SearchBar } from "./../components/searchComponents";
import { Table } from "antd";

// sitewide search bar component
class SiteSearch extends Component {
  constructor() {
    super();
    this.state = { query: null, dataSource: null };
  }

  onChange(e){
    // get user typed query from search bar change
    const query = e.target.value;
    // add and filter basic static pages into data
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
    ].filter((entry) =>
      entry.value.text.toLowerCase().includes(query.toLowerCase()) ||
      entry.type.toLowerCase().includes(query.toLowerCase())
    );
    const options = {
      params: {
        query: query
      },
    };
    // send request to API search endpoint to populate items with relevant data
    axios.get("search", options).then((res) => {
      res.data.forEach((country) => {
        const alpha3Code = country.codes.alpha3Code;
        const identifier = `${country.name} (${country.codes.alpha2Code}, \
          ${country.codes.alpha3Code})`;
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
      // set state
      this.setState({ dataSource: items });
      this.setState({ query: query });
    });
  }

  render() {
    let { query, dataSource } = this.state;

    // Setup columns of table (type and name of type with link to page)
    let columns = [
      {
        title: (
          <SearchBar
            placeholder="Try searching for countries, ISO codes, pages, capitals, or regions"
            onChange={this.onChange.bind(this)}
          />
        ),
        children: [
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

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "75vw",
              backgroundColor: "#323776",
              userSelect: "none",
              marginBottom: 20,
            }}
          >
            <Table
              style={{ margin: "0 0vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={dataSource}
              pagination={{ position: ["bottomRight"] }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteSearch);
