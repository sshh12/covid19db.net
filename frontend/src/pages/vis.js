import React from "react";
import VisualizationA from "./../components/vis/visA";
import VisualizationB from "./../components/vis/visB";
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
      </Row>
    </div>
  );
}
