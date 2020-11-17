import React, { useEffect, useState } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import axios from "../../client";

export default function VisualizationA() {
  let [cases, setCases] = useState([]);
  let [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        setCases(res.data);
      });
    axios
      .get("countries", {
        params: {
          attributes: "population,region",
        },
      })
      .then((res) => {
        setCountries(res.data);
      });
  }, []);
  if (cases.length == 0 || countries.length == 0) {
    return <p>Loading...</p>;
  }
  let dataByRegion = {};
  for (let country of countries) {
    let region = country.region.region;
    let caseData = cases.find((cdata) => cdata.country.name == country.name);
    if (!(region in dataByRegion)) {
      dataByRegion[region] = {
        id: region,
        data: [],
      };
    }
    dataByRegion[region].data.push({
      x: Math.log(country.population),
      y: Math.log(caseData.totals.cases),
      pop: country.population,
      cases: caseData.totals.cases,
      name: country.name,
    });
  }
  return (
    <ResponsiveScatterPlot
      data={Object.values(dataByRegion)}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      yScale={{ type: "linear", min: 0, max: "auto" }}
      blendMode="multiply"
      tooltip={({ node }) => {
        return (
          <div>
            {node.data.name} ({node.data.pop.toLocaleString()} people,{" "}
            {node.data.cases.toLocaleString()} cases)
          </div>
        );
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "population (log)",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "cases (log)",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
