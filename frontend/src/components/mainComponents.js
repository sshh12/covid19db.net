import React from "react";
import "./../styling/main.css";

function TotalStats(props) {
  return (
    <div className="totals">
      <h2 className="totals-title">{props.title}</h2>
      <h2 className="totals-data">{props.data}</h2>
    </div>
  );
}

export { TotalStats };
