import React, { Fragment } from "react";
import VisualizationA from "./../components/vis/visA";
import VisualizationB from "./../components/vis/visB";
import VisualizationC from "./../components/vis/visC";
import ProviderVisualizationA from "./../components/vis/provVisA";
import ProviderVisualizationB from "./../components/vis/provVisB";
import ProviderVisualizationC from "./../components/vis/provVisC";
import { Card, Col, Row } from "antd";

export default function Visualizations() {
  // provider's visualizations
  const providerVis = (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontWeight: "800",
            fontSize: "2em",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <a
            href="https://collegesearch.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Provider
          </a>{" "}
          Visualizations
        </h1>
      </div>
      <Row justify="center">
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Veterans vs Total Residents (Log Scale)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationA />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Average Restaurant Price Level by State</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationB />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Average Percentage of Full-Time College Enrollment by State</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationC />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );

  // our team's visualizations
  const myVis = (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontWeight: "800",
            fontSize: "2em",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Visualizations
        </h1>
      </div>
      <Row justify="center">
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Cases vs Population (Log Scale)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationA />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Deaths by Country (Top 20)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationB />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Share of Global Cases</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationC />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
  return (
    <div className="App">
      {myVis}
      <hr />
      {providerVis}
    </div>
  );
}
