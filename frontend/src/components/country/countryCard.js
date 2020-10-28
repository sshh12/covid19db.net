import React, { Component } from "react";
import { Card, Col, Row, Layout } from "antd";
import { Link } from "react-router-dom";

import "./countryInstance.css";

const { Meta } = Card;
const { Content } = Layout;

export default class CountryCard extends Component {
  allLanguages(myList) {
    var str = myList[0].name;
    for (var i = 1; i < myList.length; i++) {
      str = str + ", " + myList[i].name;
    }
    return str;
  }

  format(code, languages, pop, capital) {
    var str =
      "Code: " +
      code +
      ", Population: " +
      pop +
      ", Capital: " +
      capital +
      ", languages: " +
      languages;
    return str;
  }

  render() {
    const {
      capital,
      codes,
      flag,
      languages,
      name,
      population,
    } = this.props.data;
    return (
      <Layout style={{ height: 360, width: 300, border: "1px grey" }}>
        <Content style={{ height: 310 }}>
          <Link to={`/countries/${codes.alpha3Code}`}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src={flag}
                  style={{ height: 165, width: 300 }}
                />
              }
              style={{ height: 310 }}
            >
              <Meta
                title={name}
                description={this.format(
                  codes.alpha3Code,
                  this.allLanguages(languages),
                  population,
                  capital.name
                )}
              />
            </Card>
          </Link>
        </Content>
        <Content style={{ height: 50, backgroundColor: "white" }}>
          <Row>
            <Col span={12}>
              <Link to={`/case-statistics/${codes.alpha3Code}`}>Cases</Link>
            </Col>
            <Col span={12}>
              <Link to={`/risk-factor-statistics/${codes.alpha3Code}`}>
                Risks
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
