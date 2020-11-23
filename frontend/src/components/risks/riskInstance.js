import React, { Component } from "react";
import Map from "../map";
import { BigStat, DemographicFactor, HealthFactor } from "./riskComponents";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "../../client";
import Agg from "./data/Aggregate.json";

export default class RiskInstance extends Component {
  constructor() {
    super();
    this.state = {
      riskData: null,
      caseData: null,
    };
  }

  componentDidMount() {
    axios.get("risk-factor-statistics/" + this.props.code).then((res) => {
      const riskData = res.data;
      this.setState({ riskData });
    });

    axios
      .get("case-statistics/" + this.props.code, {
        params: {
          attributes: "new",
        },
      })
      .then((res) => {
        const caseData = res.data;
        this.setState({ caseData });
      });
  }

  render() {
    const data = this.state.riskData;
    const caseData = this.state.caseData;
    if (!data || !caseData) {
      return <div />;
    }
    const activeCases = caseData.new.active;

    const {
      country,
      location,
      populationDensity,
      humanDevelopmentIndex,
      gini,
      gdpPerCapita,
      medianAge,
      aged65Older,
      aged70Older,
      extremePovertyRate,
      cardiovascDeathRate,
      diabetesPrevalence,
      femaleSmokers,
      maleSmokers,
      hospitalBedsPerThousand,
      lifeExpectancy,
      handwashingFacilities,
    } = data;

    return (
      <div className="App">
        <header className="risk-header">
          <Link to="/risk-factor-statistics">
            <Button variant="outline-secondary">Go back to Risk Factors</Button>
          </Link>
          <h1 id="page-title">
            Risk Factors in {country?.name} ({country?.codes?.alpha3Code})
          </h1>
          <h3>{country?.name}</h3>
          <span>
            <h5 style={{ display: "inline" }}>Risk Level: </h5>
            <h5
              style={{
                display: "inline",
                color: `${activeCases > 500 ? "red" : "orange"}`,
              }}
            >
              {activeCases > 500 ? "High" : "Medium"}
            </h5>
          </span>
          <div style={{ marginTop: "50px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                flexWrap: "wrap",
              }}
            >
              <BigStat
                title="Human Development Index"
                data={humanDevelopmentIndex?.toFixed(3)}
                avg={Agg.humanDevelopmentIndex.toFixed(3)}
                description="Indicator of level of human development (larger values imply more development)"
              />
              <BigStat
                title="GINI"
                data={gini?.toFixed(1)}
                avg={Agg.gini.toFixed(1)}
                description="Coefficient which measures the level of wealth inequality (larger values imply more inequality)"
              />
              <BigStat
                title="GDP Per Capita"
                prefix="$"
                data={`${gdpPerCapita?.toLocaleString()}`}
                suffix="/person"
                avg={`$${Agg.gdpPerCapita?.toLocaleString()}`}
                description="Gross domestic product at purchasing power parity"
              />
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <div id="demogr-factor-title-div">
              <h2 id="subtitle">Demographic Risk Factors</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
              }}
            >
              <DemographicFactor
                title="Population Density"
                data={populationDensity?.toFixed(1)}
                suffix="people/sq.km."
                avg={Agg.populationDensity.toFixed(1)}
                description="Number of people per square kilometer"
              />
              <DemographicFactor
                title="Median Age"
                data={medianAge?.toFixed(1)}
                suffix="yrs."
                avg={Agg.medianAge.toFixed(1)}
                description="The median age of the population"
              />
              <DemographicFactor
                title="Age 65 and Older"
                data={`${aged65Older?.toFixed(1)}%`}
                avg={`${Agg.aged65Older.toFixed(1)} %`}
                description="Percentage of population that is 65 or older"
              />
              <DemographicFactor
                title="Age 70 and Older"
                data={`${aged70Older?.toFixed(1)}%`}
                avg={`${Agg.aged70Older.toFixed(1)} %`}
                description="Percentage of population that is 70 or older"
              />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 id="subtitle">Health Risk Factors</h2>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
              }}
            >
              <HealthFactor
                title="Life Expectancy"
                data={lifeExpectancy?.toFixed(1)}
                suffix="yrs."
                avg={`${Agg.lifeExpectancy.toFixed(1)}`}
                description="Life expectancy at birth"
              />
              <HealthFactor
                title="Extreme Poverty Rate"
                data={`${extremePovertyRate?.toFixed(1)}%`}
                avg={`${Agg.extremePovertyRate.toFixed(1)}%`}
                description="Percentage of population living in extreme poverty"
              />
              <HealthFactor
                title="Hospital Beds Per Thousand"
                data={hospitalBedsPerThousand?.toFixed(1)}
                avg={Agg.hospitalBedsPerThousand.toFixed(1)}
                suffix="/thousand"
                description="Number of hospital beds per 1,000 people"
              />
              <HealthFactor
                title="Cardiovascular Death Rate"
                data={cardiovascDeathRate?.toFixed(1)}
                avg={Agg.cardiovascDeathRate.toFixed(1)}
                suffix="/100,000"
                description="Annual number of deaths per 100,000 people resulting from cardiovascular disease"
              />
              <HealthFactor
                title="Diabetes Prevlaence"
                data={`${diabetesPrevalence?.toFixed(1)}%`}
                avg={`${Agg.diabetesPrevalence.toFixed(1)}%`}
                suffix=" of adults"
                description="Percentage of population which has diabetes"
              />
              <HealthFactor
                title="Female Smokers"
                data={`${femaleSmokers?.toFixed(1)}%`}
                avg={`${Agg.femaleSmokers.toFixed(1)}%`}
                suffix="of adults"
                description="Percentage of women who smoke"
              />
              <HealthFactor
                title="Male Smokers"
                data={`${maleSmokers?.toFixed(1)}%`}
                avg={`${Agg.maleSmokers.toFixed(1)}%`}
                suffix="of adults"
                description="Percentage of men who smoke"
              />
              <HealthFactor
                title="Handwashing Facilities"
                data={`${handwashingFacilities?.toFixed(1)}%`}
                avg={`${Agg.handwashingFacilities?.toFixed(1)}%`}
                suffix=" access"
                description="Percentage of the population with access to basic handwashing facilities"
              />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 id="subtitle">Links</h2>
            <Link
              to={`/countries/${country.codes.alpha3Code}`}
              style={{ marginRight: 10 }}
            >
              <Button variant="outline-secondary">{`Country Information for ${country.name}`}</Button>
            </Link>
            <Link to={`/case-statistics/${country.codes.alpha3Code}`}>
              <Button variant="outline-secondary">{`Case Statistics for ${country.name}`}</Button>
            </Link>
          </div>
          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id="title-div">
              <h2 id="subtitle">Map</h2>
            </div>
            <Map
              center={[location?.lng, location?.lat]}
              zoom={4}
              height={window.innerHeight * 0.4}
              width={window.innerWidth * 0.4}
            />
          </div>
        </header>
      </div>
    );
  }
}
