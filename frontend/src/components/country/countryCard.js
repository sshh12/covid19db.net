import React, { Component, Fragment } from "react";
import { Card, Col, Row, Layout } from "antd";
import { Link } from "react-router-dom";
import Highlight from "../highlight";
import "./countryInstance.css";

const { Meta } = Card;
const { Content } = Layout;

export default class CountryCard extends Component {
  format(alpha3Code, alpha2Code, cases, pop, capital, region) {
    const code = `Code: ${alpha3Code}, ${alpha2Code}\n`;
    cases = `Cases: ${cases ? cases.toLocaleString() : "unknown"}\n`;
    pop = `Population: ${pop.toLocaleString()}\n`;
    capital = `Capital: ${capital}\n`;
    region = `Region: ${region.subregion}\n`;
    const { searchValue } = this.props;
    return this.props.searchValue != "" ? (
      <Fragment>
        <div>
          <Highlight searchValue={searchValue} text={code} />
        </div>
        <div>
          <Highlight searchValue={searchValue} text={cases} />
        </div>
        <div>
          <Highlight searchValue={searchValue} text={pop} />
        </div>
        <div>
          <Highlight searchValue={searchValue} text={capital} />
        </div>
        <div>
          <Highlight searchValue={searchValue} text={region} />
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div>{code}</div>
        <div>{cases}</div>
        <div>{pop}</div>
        <div>{capital}</div>
        <div>{region}</div>
      </Fragment>
    );
  }

  render() {
    const { capital, cases, codes, flag, name, population, region } =
      this.props.data || {};
    return (
      <Layout style={{ height: 390, width: 300, border: "1px grey" }}>
        <Content style={{ height: 340 }}>
          <Link to={`/countries/${codes?.alpha3Code}`}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src={flag}
                  style={{ height: 165, width: 300 }}
                />
              }
              style={{ height: 340 }}
            >
              <Meta
                title={
                  this.props.searchValue != "" ? (
                    <Highlight
                      searchValue={this.props.searchValue}
                      text={name}
                    />
                  ) : (
                    name
                  )
                }
                description={this.format(
                  codes?.alpha3Code,
                  codes?.alpha2Code,
                  cases,
                  population,
                  capital?.name,
                  region
                )}
              />
            </Card>
          </Link>
        </Content>
        <Content style={{ height: 50, backgroundColor: "white" }}>
          <Row>
            <Col span={12}>
              <Link to={`/case-statistics/${codes?.alpha3Code}`}>Cases</Link>
            </Col>
            <Col span={12}>
              <Link to={`/risk-factor-statistics/${codes?.alpha3Code}`}>
                Risks
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
