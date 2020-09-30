import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import "./caseInstance.css";

function Totals(props) {
  return <div className='totals'>
    <h2 className='totals-title'>{props.title}</h2>
    <h2 className='totals-data'>{props.data}</h2>
  </div>
}

function NewStats(props) {
  return <div className='new-stats'>
    <h2 className='new-stats-title'>{props.title}</h2>
    <h2 className='new-stats-data'>{props.data}</h2>
    <h2 className='new-stats-title'>{props.yesterday} from yesterday</h2>
  </div>
}

function GenStats(props) {
  return <div className='new-stats'>
    <h2 className='new-stats-title'>{props.title}</h2>
    <h2 className='new-stats-data'>{props.data}%</h2>
    <h2 className='gen-stats-description'>{props.description}</h2>
  </div>
}

function compileData(data) {
  var history = data.history;
  var confirmed = [];
  var deaths = [];
  var recovered = [];
  var active = [];
  var dailyCases = [];
  for (var i = 7; i < history.length; i += 3) {
    var date = i;//history[i].Date;
    //date = 0
    dailyCases.push({ "x": date, "y": history[i].Confirmed - history[i - 7].Confirmed });
    confirmed.push({ "x": date, "y": history[i].Confirmed });
    deaths.push({ "x": date, "y": history[i].Deaths });
    recovered.push({ "x": date, "y": history[i].Recovered });
    active.push({ "x": date, "y": history[i].Active });

  }

  var lineData = [];
  lineData.push({ "id": 'New Cases', "data": dailyCases });
  // lineData.push({ "id": 'Confirmed', "data": confirmed });
  // lineData.push({ "id": 'Deaths', "data": deaths });
  // lineData.push({ "id": 'Recovered', "data": recovered });
  // lineData.push({ "id": 'Active', "data": active });

  console.log(lineData);
  return lineData;
}

function CaseResponseLine(props) {
  return <ResponsiveLine
    data={compileData(props.data)}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Date',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Amount',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
}


export {
  Totals,
  NewStats,
  GenStats,
  CaseResponseLine
}