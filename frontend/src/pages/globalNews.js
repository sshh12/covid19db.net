import React, { Component } from "react";
import { Card, Col, Row } from "antd";

import news from "../data/global-covid-news.json";

const { Meta } = Card;

// Helper function for creating a card component with article details
function NewsCard(props) {
  const author = props.author != null ? props.author : undefined;
  return (
    <Col>
      <a href={props.link} style={{ height: 300 }}>
        <Card
          hoverable
          style={{ width: 240, height: 500 }}
          cover={<img src={props.img} alt="Article image" />}
          title={props.title}
        >
          <Meta title={published.toLocaleString()} description={props.description} />
        </Card>
      </a>
    </Col>
  );
}

// Component class for presenting global COVID-19 news
export default class GlobalNews extends Component {
  render() {
    const newsList = articles.map((a) => (
      <NewsCard
        key={a.url}
        title={a.title}
        published={a.publishedAt}
        link={a.url}
        img={a.urlToImage}
        description={a.description}
        key={i}
      ></NewsCard>
    ));

    return (
      <div className="App">
        <h1
          style={{
            fontWeight: "800",
            fontSize: "2em",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Global News
        </h1>
        <div className="site-card-wrapper" style={{ margin: "0 5vw" }}>
          <Row gutter={8} type="flex">
            {newsList}
          </Row>
        </div>
      </div>
    );
  }
}
