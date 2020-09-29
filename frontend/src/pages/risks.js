import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Tag, Space } from "antd";

import USAData from '../components/riskInstances/data/USA.json';
import GBRData from '../components/riskInstances/data/GBR.json';
import MEXData from '../components/riskInstances/data/MEX.json';

export default class Risks extends Component {
  render() {
    const columns = [
      {
        title: 'Explore Risk',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: code => <LinkContainer to={`/risks/${code}`}><Button>Explore</Button></LinkContainer>,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: country => <LinkContainer to={`/countries/${country.codes.alpha3Code}`}><a>{country.name}</a></LinkContainer>,
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: 'Life Expectancy',
        dataIndex: 'lifeExpectancy',
        key: 'lifeExpectancy',
        sorter: (a, b) => a.lifeExpectancy - b.lifeExpectancy,
      },
      {
        title: 'Human Development Index',
        dataIndex: 'humanDevelopmentIndex',
        key: 'humanDevelopmentIndex',
        sorter: (a, b) => a.humanDevelopmentIndex - b.humanDevelopmentIndex,
      },
      {
        title: 'Population Density',
        dataIndex: 'populationDensity',
        key: 'populationDensity',
        sorter: (a, b) => a.populationDensity - b.populationDensity,
      },
      {
        title: 'Gini',
        dataIndex: 'gini',
        key: 'gini',
        sorter: (a, b) => a.gini - b.gini,
      },
      {
        title: 'Explore Risk',
        dataIndex: 'exploreRisk',
        key: 'exploreRisk',
        render: code => <LinkContainer to={`/risks/${code}`}><Button>Explore</Button></LinkContainer>,
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
        country: GBRData.country,
        lifeExpectancy: GBRData.lifeExpectancy,
        humanDevelopmentIndex: GBRData.humanDevelopmentIndex,
        populationDensity: GBRData.populationDensity,
        gini: GBRData.gini,
        exploreRisk: GBRData.country.codes.alpha3Code,
      },
      {
        key: '2',
        country: MEXData.country,
        lifeExpectancy: MEXData.lifeExpectancy,
        humanDevelopmentIndex: MEXData.humanDevelopmentIndex,
        populationDensity: MEXData.populationDensity,
        gini: MEXData.gini,
        exploreRisk: MEXData.country.codes.alpha3Code,
      },
      {
        key: '3',
        country: USAData.country,
        lifeExpectancy: USAData.lifeExpectancy,
        humanDevelopmentIndex: USAData.humanDevelopmentIndex,
        populationDensity: USAData.populationDensity,
        gini: USAData.gini,
        exploreRisk: USAData.country.codes.alpha3Code,
      },
    ];
<<<<<<< HEAD

    return (<Table columns={columns} dataSource={data} />);


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
=======
    
    return(
      <div className="App">
        <header className="App-header">
          <h1> Risk Page </h1>
          <Table columns={columns} dataSource={data} />
        </header>
      </div>
    );
>>>>>>> d7e4c413ebbe55e1d7362f635158f5f0cb0ed95a
  }
}
