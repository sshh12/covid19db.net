import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import "./countryInstance.css";
import { getMinimumRangeTransitionRange } from 'rc-tree/lib/NodeList';

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

function AllNews(GBRData, news) {
  // for (var i = 0; i < news.length; i += 1) {
  //   <html>
  //     <div style={{ marginTop: '50px' }}>
  //       <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'left' }}>
  //         <News title={GBRData.news[i].url} data={GBRData.news[i].title} source={GBRData.news[i].source.name} />
  //       </div>
  //     </div>
  //   </html>
  // }
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