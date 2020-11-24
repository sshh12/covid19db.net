import React, { useEffect, useState } from "react";
import { ResponsiveBubble } from "@nivo/circle-packing";
import { Spin } from "antd";

const restaurantParams = [
  "id",
  "name",
  "address",
  "city",
  "state_code",
  "something",
  "lat",
  "lng",
  "price",
  "img",
];

export default function ProviderVisualizationB() {
  let [restaurants, setRestaurants] = useState([]);
  let [errMessage, setErrMessage] = useState(undefined);
  useEffect(() => {
    fetch(
      "http://ec2-18-188-243-226.us-east-2.compute.amazonaws.com/restaurant"
    )
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then((data) =>
        setRestaurants(
          data.map((row) => {
            let obj = {};
            for (let i in restaurantParams) {
              obj[restaurantParams[i]] = row[i];
            }
            return obj;
          })
        )
      )
      .catch((error) => {
        setErrMessage(`${error.message} (provider API error)`);
      });
  }, []);
  if (restaurants.length == 0) {
    // show spinner if not yet loaded
    if (errMessage === undefined) {
      return <Spin size="large" />;
    }
    // if error occurred show the message instead
    else {
      return <p>{errMessage}</p>;
    }
  }
  // agg data by region
  let dataByRegion = {};
  for (let rest of restaurants) {
    let region = rest.state_code;
    if (!(region in dataByRegion)) {
      dataByRegion[region] = {
        name: region,
        priceSum: 0,
        priceCnt: 0,
        price: 0,
      };
    }
    // store sum and length to calc avg price of nodes
    dataByRegion[region].priceSum += rest.price;
    dataByRegion[region].priceCnt++;
    dataByRegion[region].price =
      dataByRegion[region].priceSum / dataByRegion[region].priceCnt;
  }
  let root = {
    name: "USA",
    children: Object.values(dataByRegion),
  };
  return (
    <ResponsiveBubble
      root={root}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      identity="name"
      value="price"
      colorBy="name"
      colors={{ scheme: "set1" }}
      padding={6}
      borderWidth={2}
      animate={true}
      motionStiffness={90}
      motionDamping={12}
    />
  );
}
