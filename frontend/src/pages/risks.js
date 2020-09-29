import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Table, Tag, Space } from "antd";

import USAData from '../components/riskInstances/data/USA.json';
import GBRData from '../components/riskInstances/data/GBR.json';
import MEXData from '../components/riskInstances/data/MEX.json';

export default class Risks extends Component {
  render() {
    const columns = [
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Life Expectancy',
        dataIndex: 'lifeExpectancy',
        key: 'lifeExpectancy',
      },
      {
        title: 'Human Development Index',
        dataIndex: 'humanDevelopmentIndex',
        key: 'humanDevelopmentIndex',
      },
      {
        title: 'Population Density',
        dataIndex: 'populationDensity',
        key: 'populationDensity',
      },
      {
        title: 'Gini',
        dataIndex: 'gini',
        key: 'gini',
      },
      // {
      //   title: 'Tags',
      //   key: 'tags',
      //   dataIndex: 'tags',
      //   render: tags => (
      //     <>
      //       {tags.map(tag => {
      //         let color = tag.length > 5 ? 'geekblue' : 'green';
      //         if (tag === 'loser') {
      //           color = 'volcano';
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
      // },
    ];
    
    const data = [
      {
        key: '1',
        country: GBRData.country.name,
        lifeExpectancy: GBRData.lifeExpectancy,
        humanDevelopmentIndex: GBRData.humanDevelopmentIndex,
        populationDensity: GBRData.populationDensity,
        gini: GBRData.gini,
      },
      {
        key: '2',
        country: MEXData.country.name,
        lifeExpectancy: MEXData.lifeExpectancy,
        humanDevelopmentIndex: MEXData.humanDevelopmentIndex,
        populationDensity: MEXData.populationDensity,
        gini: MEXData.gini,
      },
      {
        key: '3',
        country: USAData.country.name,
        lifeExpectancy: USAData.lifeExpectancy,
        humanDevelopmentIndex: USAData.humanDevelopmentIndex,
        populationDensity: USAData.populationDensity,
        gini: USAData.gini,
      },
    ];
    
    return(<Table columns={columns} dataSource={data} />);


    // return (


    //   <div className="App">
    //     <header className="App-header">
    //       <h1> Risk Page </h1>
    //       <LinkContainer className="App-link" to="/risk-instance-0">
    //         <Button variant="outline-secondary" size="lg">
    //           Risk 0
    //         </Button>
    //       </LinkContainer>
    //       <LinkContainer className="App-link" to="/risk-instance-1">
    //         <Button variant="outline-secondary" size="lg">
    //           Risk 1
    //         </Button>
    //       </LinkContainer>
    //       <LinkContainer className="App-link" to="/risk-instance-2">
    //         <Button variant="outline-secondary" size="lg">
    //           Risk 2
    //         </Button>
    //       </LinkContainer>
    //       <LinkContainer className="App-link" to="/">
    //         <Button variant="outline-secondary">
    //           Click here to go back to the main page
    //         </Button>
    //       </LinkContainer>
    //     </header>
    //   </div>
    // );
  }
}
