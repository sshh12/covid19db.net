import React, { Component } from "react";
import { Card, Col, Row } from 'antd';

import news from "../data/global-covid-news.json"

const { Meta } = Card;
const { articles } = news

function NewsCard(props) {
  const author = props.author != null ? props.author : undefined
  return (
    <Col>
      <a href={props.link}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img src={props.img} alt="Article image" />}
          title={props.title}
        >
          <Meta title={author} description={props.description} />
        </Card>
      </a>
    </Col>
  )
}

export default class GlobalNews extends Component {
  render() {
    let newsList = new Array()
    // accumulate newscards into an array
    for (let i = 0; i < articles.length; ++i) {
      let article = articles[i]
      let newsCard = (
        <NewsCard
          title={article.title}
          author={article.author}
          link={article.url}
          img={article.urlToImage}
          description={article.description}
        ></NewsCard>)
      newsList.push(newsCard);
    }

    return (
      <div className="App">
        <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Global News</h1>
        <div className="site-card-wrapper" style={{ margin: '0 5vw' }}>
          <Row gutter={8}>
            {newsList}
          </Row>
        </div>
      </div>
    );
  }
}
