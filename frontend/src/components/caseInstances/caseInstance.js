import React, { Component } from "react";
import { Totals, NewStats, GenStats, CaseResponseLine } from "./caseComponents";
import Map from "../../components/map";
import axios from "../../client";
import "./caseInstance.css";

class CaseInstance extends Component {
  constructor() {
    super();
    this.state = {
      caseData: null,
    };
  }

  componentDidMount() {
    axios.get("case-statistics/" + this.props.code).then(
      (res) => {
        const caseData = res.data;
        this.setState({ caseData });
      },
      (error) => {
        console.log("error: promise not fulfilled");
        console.log(error);
      }
    );
  }

  render() {
    //Need to make flex box items responsive when changing window size
    const data = this.state.caseData;
    if (!data) {
      return <div />;
    }
    console.log(data);

    return (
      <div className="App">
        <header className="Case-header">
          <h1 id="page-title">
            {" "}
            {data.country.name} ({data.country.codes.alpha3Code})
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <Totals title="Total Cases" data={data.totals.cases} />
            <Totals title="Total Active" data={data.totals.active} />
            <Totals title="Total Deaths" data={data.totals.deaths} />
            <Totals title="Total Recovered" data={data.totals.recovered} />
            <Totals title="Total Tests" data={3} />
          </div>
          <div>
            <div id="new-stats-title-div">
              <h2 id="subtitle">Today's Stats</h2>
              <h2 id="new-stats-date">{data.date}</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <NewStats
                title="Cases"
                data={data.new.cases}
                yesterday={
                  Math.round(
                    (data.derivativeNew.cases + Number.EPSILON) * 100
                  ) / 100
                }
              />
              <NewStats
                title="Active"
                data={data.new.active}
                yesterday={
                  Math.round(
                    (data.derivativeNew.active + Number.EPSILON) * 100
                  ) / 100
                }
              />
              <NewStats
                title="Deaths"
                data={data.new.deaths}
                yesterday={
                  Math.round(
                    (data.derivativeNew.deaths + Number.EPSILON) * 100
                  ) / 100
                }
              />
              <NewStats
                title="Recovered"
                data={data.new.recovered}
                yesterday={
                  Math.round(
                    (data.derivativeNew.recovered + Number.EPSILON) * 100
                  ) / 100
                }
              />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 id="subtitle">General Stats</h2>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <GenStats
                title="Fatality Rate"
                data={
                  Math.round(
                    (data.percentages.fatality + Number.EPSILON) * 100
                  ) / 100
                }
                description="total deaths/total cases"
              />
              <GenStats
                title="Infection Rate"
                data={
                  Math.round(
                    (data.percentages.infected + Number.EPSILON) * 100
                  ) / 100
                }
                description="total cases/total population"
              />
              <GenStats
                title="Recovery Rate"
                data={
                  Math.round(
                    (data.percentages.haveRecovered + Number.EPSILON) * 100
                  ) / 100
                }
                description="total recovered/total cases"
              />
              <GenStats
                title="Active Rate"
                data={
                  Math.round((data.percentages.active + Number.EPSILON) * 100) /
                  100
                }
                description="total active/total cases"
              />
            </div>
          </div>
          <div style={{ marginTop: "50px", height: "500px", width: "100%" }}>
            <h2 id="subtitle">Trends and Visuals</h2>
            <CaseResponseLine data={data.history} />
          </div>
          <div style={{ marginTop: "50px", height: "500px", width: "100%" }}>
            <h2 id="subtitle">Map</h2>
            <Map
              center={[data.location.lng, data.location.lat]}
              zoom={4}
              height={window.innerHeight - 400}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default CaseInstance;
