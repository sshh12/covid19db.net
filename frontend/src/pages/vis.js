import React from "react";
import VisualizationA from "./../components/vis/visA";
import VisualizationB from "./../components/vis/visB";
import VisualizationC from "./../components/vis/visC";
import ProviderVisualizationA from "./../components/vis/provVisA";
import ProviderVisualizationB from "./../components/vis/provVisB";
import { Card, Col, Row } from "antd";

export default function Visualizations() {
  return (
    <div className="App">
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
            <h4>Deaths By Country (Top 20)</h4>
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
      <hr />
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h4>Provider</h4>
        <a href="https://collegesearch.me">collegesearch.me</a>
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
            <h4>Average Restaurant Price Level By State</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationB />
            </div>
          </Card>
        </Col>
        {/* <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Share of Global Cases</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationC />
            </div>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
}
