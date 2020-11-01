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
        <h1 className="global-totals-title">Coronavirus is bad. Cases are rising. We're here to organize data. Please replace this crappy text.</h1>
        <div style={{ flex: 1, alignContent:'center'}}>
          <h1 className="global-totals-title">Global Statistics</h1>
          <div style={{ display: "flex", flexDirection: "row", marginLeft: 50}}>
            <TotalStats title="Total Cases" data={data.totals.cases}/>
            <TotalStats title="Total Deaths" data={data.totals.deaths}/>
            <TotalStats title="Total Recovered" data={data.totals.recovered}/>
            <TotalStats title="Total Active" data={data.totals.active}/>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <Map
            center={[15, 30]}
            zoom={1.95}
            height={window.innerHeight - 69 + (420 - 420)} // Perfect value to fit the map on the splash page... nice
            width={"100vw"}
          />
        </div>
      </div>
    );
  }
}


let style 