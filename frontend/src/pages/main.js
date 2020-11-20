import React, { useEffect, useState } from "react";
import InfectionsMap from "../components/infectionsMap";
import axios from "../client";
import TotalStats from "./../components/mainComponents";
import { Spinner } from "react-bootstrap";
import "./../styling/main.css";

export default function Main() {
  let [data, setGlobalData] = useState(null);
  let [cases, setCases] = useState(null);
  useEffect(() => {
    axios.get("global-stats").then((res) => {
      setGlobalData(res.data);
    });
    axios
      .get("case-statistics", {
        params: {
          attributes: "location,totals",
        },
      })
      .then((res) => setCases(res.data));
  }, []);
  if (!data || !cases) {
    return (
      <div className="App" style={{ padding: "30px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ paddingTop: 20, paddingBottom: 40 }} className="main-text">
        Coronavirus sucks. Maybe this can help :)
      </h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <TotalStats
          title="Total Global Cases"
          data={data.totals.cases?.toLocaleString()}
        />
        <TotalStats
          title="Total Global Deaths"
          data={data.totals.deaths?.toLocaleString()}
        />
        <TotalStats
          title="Total Global Recoveries"
          data={data.totals.recovered?.toLocaleString()}
        />
        <TotalStats
          title="Total Global Active"
          data={data.totals.active?.toLocaleString()}
        />
      </div>
      <div style={{ flex: 3 }}>
        <InfectionsMap
          caseStats={cases}
          center={[15, 30]}
          zoom={1.95}
          height={window.innerHeight - 79 + (420 - 420)}
          width={"100vw"}
        />
      </div>
    </div>
  );
}
