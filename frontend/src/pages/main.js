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
      <div className="App" style={{ display: "flex", flexDirection: "column"}}>
        <h1 style={{paddingTop:20, paddingBottom: 40}} className="main-text">Coronavirus sucks. Maybe this can help :)</h1>
        <div style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: 'center', marginTop: 5, marginBottom: 5}}>
          <TotalStats title="Total Global Cases" data={data.totals.cases?.toLocaleString()}/>
          <TotalStats title="Total Global Deaths" data={data.totals.deaths?.toLocaleString()}/>
          <TotalStats title="Total Global Recoveries" data={data.totals.recovered?.toLocaleString()}/>
          <TotalStats title="Total Global Active" data={data.totals.active?.toLocaleString()}/>
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