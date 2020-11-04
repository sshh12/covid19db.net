import React, { Component } from "react";
import { Totals, NewStats, GenStats, CaseResponseLine } from "./caseComponents";
import { Link } from "react-router-dom";
import { Button } from 'antd';
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
          <Link to="/case-statistics">
            <Button variant="outline-secondary">Go back to cases</Button>
          </Link>
          <h1 id="page-title">
            Cases in {data.country.name} ({data.country.codes.alpha3Code})
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <Totals
              title="Total Cases"
              data={data.totals.cases}
              description="Total number of confirmed cases"
            />
            <Totals
              title="Total Active"
              data={data.totals.active}
              description="Total number of active cases"
            />
            <Totals
              title="Total Deaths"
              data={data.totals.deaths}
              description="Total number of deaths"
            />
            <Totals
              title="Total Recovered"
              data={data.totals.recovered}
              description="Total number of recoveries"
            />
            <Totals
              title="Total Tests"
              data={data.testing.totalTests.value}
              description="Total number of tests"
            />
          </div>
          <div>
            <div id="new-stats-title-div">
              <h2 id="subtitle">Recent Statistics</h2>
              <h2 id="new-stats-date">{data.date}</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: 'wrap'
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
                description="Number of new confirmed cases"
              />
              <NewStats
                title="Active"
                data={data.new.active}
                yesterday={
                  Math.round(
                    (data.derivativeNew.active + Number.EPSILON) * 100
                  ) / 100
                }
                description="Number of new active cases"
              />
              <NewStats
                title="Deaths"
                data={data.new.deaths}
                yesterday={
                  Math.round(
                    (data.derivativeNew.deaths + Number.EPSILON) * 100
                  ) / 100
                }
                description="Number of new deaths"
              />
              <NewStats
                title="Recovered"
                data={data.new.recovered}
                yesterday={
                  Math.round(
                    (data.derivativeNew.recovered + Number.EPSILON) * 100
                  ) / 100
                }
                description="Number of new recoveries"
              />
              <NewStats
                title="Tests"
                data={data.testing.newTests.value}
                yesterday={
                  Math.round(
                    (data.testing.newTestsSmoothed.value + Number.EPSILON) * 100
                  ) / 100
                }
                description="Number of new tests"
              />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 id="subtitle">General Statistics</h2>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: 'wrap'
              }}
            >
              <GenStats
                title="Fatality Rate"
                data={
                  Math.round(
                    (data.percentages.fatality + Number.EPSILON) * 100
                  ) / 100
                }
                description="Total deaths/total cases * 100"
              />
              <GenStats
                title="Infection Rate"
                data={
                  Math.round(
                    (data.percentages.infected + Number.EPSILON) * 100
                  ) / 100
                }
                description="Total cases/total population * 100"
              />
              <GenStats
                title="Positivity Rate"
                data={
                  Math.round(
                    (data.testing.positiveRate.value + Number.EPSILON) * 100
                  ) / 100
                }
                description="Posititive tests/total tests * 100"
              />
              <GenStats
                title="Recovery Percentage"
                data={
                  Math.round(
                    (data.percentages.haveRecovered + Number.EPSILON) * 100
                  ) / 100
                }
                description="Total recovered/total cases * 100"
              />
              <GenStats
                title="Active Rate"
                data={
                  Math.round((data.percentages.active + Number.EPSILON) * 100) /
                  100
                }
                description="Total active/total cases * 100"
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
