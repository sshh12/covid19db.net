import React, { Component } from "react";
import { Table, Tag, Space } from "antd";

import USAData from '../components/countryInstances/data/USA.json';
import GBRData from '../components/countryInstances/data/GBR.json';
import MEXData from '../components/countryInstances/data/MEX.json';

function allLanguages(myList) {
  var str = myList[0].name;
  for (var i = 1; i < myList.length; i++) {
    str = str + ", " + myList[i].name;
  }
  return str;
}

export default class CountriesPage extends Component {
  render() {
    const columns = [
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Alpha 2 Code',
        dataIndex: 'alpha2Code',
        key: 'alpha2Code',
      },
      {
        title: 'Languages',
        dataIndex: 'languages',
        key: 'languages',
      },
      {
        title: 'Population',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: 'Capital',
        dataIndex: 'capital',
        key: 'capital',
      },
    ];

    const data = [
      {
        key: '1',
        country: GBRData.name,
        alpha2Code: GBRData.codes.alpha2Code,
        // languages: GBRData.languages[0].name,
        languages: allLanguages(GBRData.languages),
        population: GBRData.population,
        capital: GBRData.capital.name,
      },
      {
        key: '2',
        country: USAData.name,
        alpha2Code: USAData.codes.alpha2Code,
        languages: allLanguages(USAData.languages),
        population: USAData.population,
        capital: USAData.capital.name,
      },
      {
        key: '3',
        country: MEXData.name,
        alpha2Code: MEXData.codes.alpha2Code,
        languages: allLanguages(MEXData.languages),
        population: MEXData.population,
        capital: MEXData.capital.name,
      },
    ];

    return (<Table columns={columns} dataSource={data} />);
  }
}




























// import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Button } from "react-bootstrap";
// import Table from 'react-bootstrap/Table'
// // import Table from "react-router-bootstrap";

// export default class CountriesPage extends Component {
//   render() {
//     return (
//       <div className="App">
//         {/* <header className="App-header"> */}
//         <h1> Select a Country </h1>
//         <Table className="App" striped bordered hover>
//           <thead>
//             <tr>
//               <th >Country</th>
//               <th>ISO alpha2 code</th>
//               <th>Languages</th>
//               <th>Population</th>
//               <th>Capital</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-0">
//                   <Button variant="outline-secondary" size="lg">
//                     Great Britain
//                   </Button>
//                 </LinkContainer>
//               </td>
//               <td>GB</td>
//               <td>English</td>
//               <td>65110000</td>
//               <td>London</td>
//             </tr>
//             <tr>
//               <td>
//                 <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-1">
//                   <Button variant="outline-secondary" size="lg">
//                     USA
//                   </Button>
//                 </LinkContainer>
//               </td>
//               <td>US</td>
//               <td>English</td>
//               <td>323,947,000</td>
//               <td>Washington, D.C.</td>
//             </tr>
//             <tr>
//               <td>
//                 <LinkContainer className="App-link" style={{ color: "black" }} to="/country-instance-2">
//                   <Button variant="outline-secondary" size="lg">
//                     Mexico
//                   </Button>
//                 </LinkContainer>
//               </td>
//               <td>MX</td>
//               <td>Spanish</td>
//               <td>122273473</td>
//               <td>Mexico City</td>
//               {/* <td colSpan="2">Larry the Bird</td> */}
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     );
//   }
// }
