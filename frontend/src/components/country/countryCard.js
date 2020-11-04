import React, { Component, Fragment } from "react";
import { Card, Col, Row, Layout } from "antd";
import { Link } from "react-router-dom";
import Highlight from "../highlight";
import "./countryInstance.css";

const { Meta } = Card;
const { Content } = Layout;

export default class CountryCard extends Component {
  format(code, pop, capital) {
    code = `Code: ${code}\n`;
    pop = `Population: ${pop.toLocaleString()}\n`;
    capital = `Capital: ${capital}\n`;
    const { searchValue } = this.props;
    return this.props.searchValue != '' ? 
      (
        <Fragment>
          <div><Highlight searchValue={searchValue} text={code}/></div>
          <div><Highlight searchValue={searchValue} text={pop}/></div>
          <div><Highlight searchValue={searchValue} text={capital}/></div>
        </Fragment>
      ) : (
        <Fragment>
          <div>{code}</div>
          <div>{pop}</div>
          <div>{capital}</div>
        </Fragment>
      );
  }

  render() {
    const { capital, codes, flag, name, population } = this.props.data || {};
    return (
      <Layout style={{ height: 360, width: 300, border: "1px grey" }}>
        <Content style={{ height: 310 }}>
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
              style={{ height: 310 }}
            >
              <Meta
                title={this.props.searchValue != '' ? (<Highlight searchValue={this.props.searchValue} text={name}/>) : name}
                description={this.format(
                  codes?.alpha3Code,
                  population,
                  capital?.name
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
