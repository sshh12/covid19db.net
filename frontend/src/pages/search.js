import React, { Component } from "react";
import Search from "react-search";
import axios from "../client";

// Sitewide search bar component
export default class SiteSearch extends Component {
  constructor(){
    super();
    this.state = { items: [] };
  }

  componentDidMount(){
    let curID = 0;
    // begin by adding pages
    let items = [
      {id: curID++, value: "Home", route: "/home"},
      {id: curID++, value: "About", route: "/about"},
      {id: curID++, value: "Countries", route: "/countries"},
      {id: curID++, value: "Cases", route: "/case-statistics"},
      {id: curID++, value: "Risks", route: "/risk-factor-statistics"},
      {id: curID++, value: "Global News", route: "/global-news"}
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
          value: "Country Info for " + identifier,
          route: `/countries/${alpha3Code}`
        });
        items.push({
          id: curID++,
          value: "Cases for " + identifier,
          route: `/case-statistics/${alpha3Code}`
        });
        items.push({
          id: curID++,
          value: "Risks for " + identifier,
          route: `/risk-factor-statistics/${alpha3Code}`
        });
      });
      this.setState({ items });
    });
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
    return (
      <div className="App">
        <h1 style={{fontWeight: 800, marginTop:20, marginBottom: 20, fontSize:'2em'}}>Search</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{width: "50vw", backgroundColor: "#323776", userSelect: "none"}}>
            <Search items={this.state.items}
                    placeholder=""
                    onItemsChanged={this.onSelect.bind(this)}
                    getItemsAsync={this.getItemsAsync.bind(this)}
                    NotFoundPlaceholder="No results match this query"
              />
          </div>
        </div>
      </div>
    );
  }
}
