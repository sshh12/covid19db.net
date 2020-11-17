import React from "react";
import VisualizationA from "./../components/vis/visA";
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
      <Row>
        <Col>
          <Card hoverable style={{ height: "500px", width: "600px" }}>
            <h4>Cases vs Population (Log Scale)</h4>
            <div style={{ height: "450px", width: "550px" }}>
              <VisualizationA />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
