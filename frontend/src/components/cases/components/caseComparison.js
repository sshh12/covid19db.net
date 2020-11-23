import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import "../caseInstance.css";

// component used to display various other COVID-19 statistics
function CaseComparison(props) {
  return (
    <div className="new-stats">
      <h2 className="new-stats-title">{`${props.country.country.name} (${props.country.country.codes.alpha3Code})`}</h2>
      <h2 className="new-stats-data">{`Cases: ${props.country.totalCases}`}</h2>
      <h2 className="new-stats-data">{`Deaths: ${props.country.totalDeaths}`}</h2>
      <h2 className="new-stats-data">{`Recovered: ${props.country.totalRecovered}`}</h2>
      <h2 className="new-stats-data">{`Active: ${props.country.totalActive}`}</h2>
      <Link to={`/case-statistics/${props.country.country.codes.alpha3Code}`}>
        See more
      </Link>
    </div>
  );
}

export default CaseComparison;
