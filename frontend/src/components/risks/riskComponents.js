import React from "react";
import { Tooltip } from "antd";
import "./riskInstance.css";

// component used to display economic/development related factors
function BigStat(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="big-stat" style={{ flex: "none" }}>
        <h2 className="big-stat-title">{props.title}</h2>
        <h2 className="big-stat-data">
          {props.prefix}
          {props.data}
          <h2 className="big-stat-suffix"> {props.suffix}</h2>
        </h2>
        <h2 className="compare-avg">
          vs. average: {props.avg} {props.suffix}
        </h2>
      </div>
    </Tooltip>
  );
}

// component used to display demographic related risk factors
function DemographicFactor(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="demogr-factor" style={{ flex: "none" }}>
        <h2 className="demogr-factor-title">{props.title}</h2>
        <h2 className="demogr-factor-data">
          {props.prefix}
          {props.data}
          <h2 className="demogr-factor-suffix">{props.suffix}</h2>
        </h2>
        <h2 className="compare-avg">
          vs. average: {props.avg} {props.suffix}
        </h2>
      </div>
    </Tooltip>
  );
}

// component used to display health related risk factors
function HealthFactor(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div
        className="health-factor"
        style={{ marginBottom: "20px", flex: "none" }}
      >
        <h2 className="health-factor-title">{props.title}</h2>
        <h2 className="health-factor-data">
          {props.prefix}
          {props.data}
          <h2 className="health-factor-suffix">{props.suffix}</h2>
        </h2>
        <h2 className="compare-avg">
          vs. average: {props.avg} {props.suffix}
        </h2>
      </div>
    </Tooltip>
  );
}

export { BigStat, DemographicFactor, HealthFactor };
