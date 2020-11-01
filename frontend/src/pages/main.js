import React, { Component } from "react";
import Map from "../components/map";
import axios from "../client";
import {TotalStats} from './../components/mainComponents';
import './../styling/main.css';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      globalData: null,
    };
  }

  componentDidMount() {
    axios.get("global-stats").then(
      (res) => {
        const globalData = res.data;
        console.log(globalData);
        this.setState({ globalData });
      },
      (error) => {
        console.log("error: promise not fulfilled");
        console.log(error);
      }
    );
  }

  render() {
    const data = this.state.globalData;
    if (!data) {
      return <div />;
    }

    return (
      <div className="App" style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <h1>Global Statistics</h1>
          <div className="totals">
            <h2 className="totals-title">Total Cases</h2>
            <h2 className="totals-data">
              {data.totals.cases?.toLocaleString()}
            </h2>
          </div>
          <div className="totals">
            <h2 className="totals-title">Total Deaths</h2>
            <h2 className="totals-data">
              {data.totals.deaths?.toLocaleString()}
            </h2>
          </div>
          <div className="totals">
            <h2 className="totals-title">Total Recovered</h2>
            <h2 className="totals-data">
              {data.totals.recovered?.toLocaleString()}
            </h2>
          </div>
          <div className="totals">
            <h2 className="totals-title">Total Active</h2>
            <h2 className="totals-data">
              {data.totals.active?.toLocaleString()}
            </h2>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <Map
            center={[15, 30]}
            zoom={1.95}
            height={window.innerHeight - 79 + (420 - 420)} // Perfect value to fit the map on the splash page... nice
            width={"100vw"}
          />
        </div>
      </div>
    );
  }
}


let style 