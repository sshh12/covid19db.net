import React from "react";
import { Tooltip } from "antd";
import "../caseInstance.css";

// component used to display totals (cases, deaths, active, etc.)
function Totals(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="totals">
        <h2 className="totals-title">{props.title}</h2>
        <h2 className="totals-data">{props.data?.toLocaleString()}</h2>
      </div>
    </Tooltip>
  );
}

export default Totals;
