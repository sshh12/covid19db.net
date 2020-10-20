import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row } from "antd";
import axios from "../../client";

import "./countryInstance.css";
import { GeneralInfo, AllNews } from "./countryComponents";
import Map from "../map";

export default class CountryInstance extends Component {
  constructor() {
    super();
    this.state = {
      countryData: null,
    };
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios.get("countries/" + this.props.code).then((res) => {
      const countryData = res.data;
      this.setState({ countryData });
    });
  }

  render() {
    const data = this.state.countryData;
    console.log(this.props.code);
    if (!data) {
      return <div />;
    }

    const {
      alternateNames,
      area,
      borders,
      callingCodes,
      capital,
      codes,
      currencies,
      flag,
      languages,
      location,
      name,
      news,
      population,
      region,
      regionalBlocs,
      sources,
      timezones,
    } = data;

    return (
      <div className="App">
        <header className="Case-header">
          <LinkContainer className="Back-link" to="/countries">
            <Button variant="outline-secondary">Go back</Button>
          </LinkContainer>

          <h1 id="page-title">
            {" "}
            {name} ({codes.alpha3Code})
          </h1>
          <div>
            <div id="title-div">
              <h2 id="subtitle"> Capital - {capital.name}</h2>
            </div>
            <img
              src={capital.img}
              alt={"Image of " + capital.name}
              id="capital-image"
            />
          </div>

          <div>
            <div id="title-div">
              <h2 id="subtitle">General Information</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <GeneralInfo title="Population" data={population} />
              <GeneralInfo title="Currency" data={currencies[0].code} />
              <GeneralInfo title="Longitude" data={location.lng} />
              <GeneralInfo title="Latitude" data={location.lat} />
            </div>
          </div>
          <div style={{ marginTop: "1vh" }}>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <GeneralInfo title="Region" data={region.region} />
              <GeneralInfo title="Sub-Region" data={region.subregion} />
              <GeneralInfo title="Border Country" data={borders[0]} />
              <GeneralInfo title="Languages" data={languages[0].name} />
            </div>
          </div>

          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id="title-div">
              <h2 id="subtitle">Map of Capital</h2>
            </div>
            <Map
              center={[capital.location.lng, capital.location.lat]}
              zoom={8}
              height={window.innerHeight * 0.4}
              width={window.innerWidth * 0.4}
            />
          </div>

          <div style={{ marginTop: "1vh", marginBottom: "10vh" }}>
            <div id="title-div">
              <h2 id="subtitle">News</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Row gutter={8}>{AllNews(news)}</Row>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
