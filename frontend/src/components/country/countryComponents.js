import React from 'react';
import { Card, Col } from 'antd'
import "./countryInstance.css";

const { Meta } = Card;

function GeneralInfo(props) {
  return <div className='new-stats'>
    <h2 className='title' style={{ color: 'grey', fontSize: 'medium' }}>{props.title}</h2>
    <h2 className='data'>{props.data}</h2>
  </div>
}

function News(props) {
  return <div className='news'>
    <a className='title' href={props.url}>{props.title}</a>
    <h2 className='source'>({props.source})</h2>
  </div>
}

function AllNews(news) {
  return news.map(n => 
    <Col>
      <a href={n.url}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img src={n.urlToImage} alt="Article image" />}
          title={n.title}
        >
          <Meta title={n.author} description={n.description} />
        </Card>
      </a>
    </Col>
  )
}

function GetImage(url) {
  var image = document.createElement('img');
  image.src = url;
  document.body.appendChild(image);
}

export {
  GeneralInfo,
  GetImage, News, AllNews
}