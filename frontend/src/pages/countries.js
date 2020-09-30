import React, { Component } from "react";
import { Button, Table } from "antd";
import { Card, Col, Row } from 'antd';
import { LinkContainer } from "react-router-bootstrap";
import '../components/countryInstances/countryInstance.css';

import USAData from '../components/countryInstances/data/USA.json';
import GBRData from '../components/countryInstances/data/GBR.json';
import MEXData from '../components/countryInstances/data/MEX.json';

import { lang } from "moment";
const { Meta } = Card;

function allLanguages(myList) {
  var str = myList[0].name;
  for (var i = 1; i < myList.length; i++) {
    str = str + ", " + myList[i].name;
  }
  return str;
}

//TODO actually format
function format(code, languages, pop, capital) {
  var str = "Code: " + code + ", Population: " + pop + ", Capital: " + capital + ", languages: " + languages;
  return str;
}

export default class Countries extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{ fontWeight: '800', fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Countries </h1>

        <div className="site-card-wrapper" style={{ margin: '0 5vw' }}>
          <Row gutter={16}>
            <Col span={8}>
              <LinkContainer to={`/countries/${GBRData.codes.alpha3Code}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={GBRData.flag} />}
                >
                  <Meta title={GBRData.name} description={format(GBRData.codes.alpha3Code, allLanguages(GBRData.languages),
                    GBRData.population, GBRData.capital.name)} />
                </Card>
              </LinkContainer>
            </Col>
            <Col span={8}>
              <LinkContainer to={`/countries/${MEXData.codes.alpha3Code}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={MEXData.flag} />}
                >
                  <Meta title={MEXData.name} description={format(MEXData.codes.alpha3Code, allLanguages(MEXData.languages),
                    MEXData.population, MEXData.capital.name)} />
                </Card>
              </LinkContainer>
            </Col>

            <Col span={8}>
              <LinkContainer to={`/countries/${USAData.codes.alpha3Code}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={USAData.flag} />}
                >
                  <Meta title={USAData.name} description={format(USAData.codes.alpha3Code, allLanguages(USAData.languages),
                    USAData.population, USAData.capital.name)} />
                </Card>
              </LinkContainer>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

