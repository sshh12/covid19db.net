import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "../../client";

export default function VisualizationC() {
  let [allCaseStats, setAllCaseStats] = useState(undefined);
  let [globalStats, setGlobalStats] = useState(undefined);
  // request data from API
  useEffect(() => {
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        // sort by total cases
        res.data.sort((a, b) => {
          return b.totals.cases - a.totals.cases;
        });
        // only need top 10
        setAllCaseStats(res.data.slice(0, 10));
      });
    axios.get("global-stats").then((res) => {
      setGlobalStats(res.data);
    });
  }, []);
  if (allCaseStats == undefined || globalStats == undefined) {
    return <p>Loading...</p>;
  }
  const totalGlobalCases = globalStats.totals.cases;
  const roundToPlace = (number, places) => {
    return +(Math.round(number + "e+" + places) + "e-" + places);
  };
  let data = [];
  // push necessary data to data array
  let sumAccountedCases = 0;
  for (let caseStats of allCaseStats) {
    data.push({
      id: caseStats.country.name,
      value: caseStats.totals.cases,
    });
    sumAccountedCases += caseStats.totals.cases;
  }
  data.push({
    id: "Other",
    value: totalGlobalCases - sumAccountedCases,
  });
  return (
    <ResponsivePie
      data={data}
      sliceLabel={(d) => {
        return roundToPlace((d.value / totalGlobalCases) * 100, 2) + "%";
      }}
      slicesLabelsSkipAngle={15}
      margin={{ top: 30, right: 0, left: 0, bottom: 30 }}
      cornerRadius={2}
      borderWidth={1}
    />
  );
}
