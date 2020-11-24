import React, { Fragment } from "react";
import VisualizationA from "./../components/vis/visA";
import VisualizationB from "./../components/vis/visB";
import VisualizationC from "./../components/vis/visC";
import { Card, Col, Row } from "antd";

export default function Visualizations() {
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
  return <div className="App">{myVis}</div>;
}
