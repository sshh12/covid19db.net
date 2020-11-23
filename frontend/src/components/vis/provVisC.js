import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

const collegeParams = [
  "id",
  "name",
  "city",
  "state",
  "level",
  "control",
  "lng",
  "lat",
  "website",
  "num_students",
  "percent_full_time",
  "median_sat_score",
  "avg_financial_aid",
  "financial_aid_percentile",
];

export default function ProviderVisualizationC() {
  let [colleges, setColleges] = useState([]);
  let [tmpMessage, setTmpMessage] = useState("Loading...");
  // request data from provider API
  useEffect(() => {
    /* can't directly request from the API because no CORS or HTTPS enabled
    on their end */
    fetch("http://ec2-18-188-243-226.us-east-2.compute.amazonaws.com/college")
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then((data) =>
        setColleges(
          data.map((row) => {
            let obj = {};
            for (let i in collegeParams) {
              obj[collegeParams[i]] = row[i];
            }
            return obj;
          })
        )
      )
      .catch((error) => {
        setTmpMessage(`${error.message} (provider API error)`);
      });
  }, []);
  if (colleges.length == 0) {
    return <p>{tmpMessage}</p>;
  }
  // perform state wide analysis on data
  let stateData = {};
  for (let college of colleges) {
    if (!Object.keys(stateData).includes(college.state)) {
      stateData[college.state] = {
        id: college.state,
        sumPercentFullTime: 0,
        numColleges: 0,
      };
    }
    stateData[college.state].sumPercentFullTime += college.percent_full_time;
    ++stateData[college.state].numColleges;
  }
  // transform stateData into usable format for bar graph
  let data = [];
  for (let state of Object.keys(stateData)) {
    const stateObj = stateData[state];
    data.push({
      id: stateObj.id,
      value: Math.round(stateObj.sumPercentFullTime / stateObj.numColleges),
    });
  }
  // sort data by state name
  data.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });
  // function to generate a custom tooltip for a pie graph slice
  const customTooltip = (node) => {
    return (
      <div>
        <div
          style={{
            float: "left",
            width: 13,
            height: 13,
            margin: 5,
            backgroundColor: node.color,
          }}
        ></div>
        <strong>{node.data.id}</strong>
        {`: ${node.data.value}%`}
      </div>
    );
  };
  return (
    <ResponsiveBar
      data={data}
      margin={{ top: 20, right: 50, bottom: 80, left: 50 }}
      padding={0.15}
      maxValue={100}
      labelFormat={(d) => {
        return `${d}%`;
      }}
      labelSkipHeight={15}
      tooltip={customTooltip}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        legend: "Average Percentage of Full-Time Enrollment",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "State",
        legendPosition: "middle",
        legendOffset: 40,
      }}
    />
  );
}
