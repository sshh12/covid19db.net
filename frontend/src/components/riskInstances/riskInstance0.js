import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Collapse, Statistic, Card, Row, Col } from 'antd';
import "./riskInstance.css";

import GBRData from './data/GBR.json';
import AggregateData from './data/Aggregate.json';

const { Panel } = Collapse;

export default class RiskInstanceGBR extends Component {
  render() {
    function callback(key) {
      console.log(key);
    }

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>{GBRData.country.name}</h1>
          <div className="site-statistic-card">
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Population Density"
                    value={GBRData.populationDensity}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="people/sq.mi."
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Population Density"
                    value={AggregateData.populationDensity}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="people/sq.mi."
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Median Age"
                    value={GBRData.medianAge}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="yrs."
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Median Age"
                    value={AggregateData.medianAge}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="yrs."
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Age 65 or Older"
                    value={GBRData.aged65Older}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Age 65 or Older"
                    value={AggregateData.aged65Older}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Age 70 or Older"
                    value={GBRData.aged70Older}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Age 70 or Older"
                    value={AggregateData.aged70Older}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="GDP Per Capita"
                    value={GBRData.gdpPerCapita}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    prefix="$"
                    suffix="/person"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average GDP Per Capita"
                    value={AggregateData.gdpPerCapita}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    prefix="$"
                    suffix="/person"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Gini Index"
                    value={GBRData.gini}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Gini Index"
                    value={AggregateData.gini}
                    precision={1}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="people/sq.mi."
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Extreme Poverty Rate"
                    value={GBRData.extremePovertyRate}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Extreme Poverty Rate"
                    value={AggregateData.extremePovertyRate}
                    precision={1}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Cardiovascular Death Rate"
                    value={GBRData.cardiovascDeathRate}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="deaths/100,000"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Cardiovascular Death Rate"
                    value={AggregateData.cardiovascDeathRate}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="deaths/100,000"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Diabetes Prevalence"
                    value={GBRData.diabetesPrevalence}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="% of adults"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Diabetes Prevalence"
                    value={AggregateData.diabetesPrevalence}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="% of adults"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Female Smokers"
                    value={GBRData.femaleSmokers}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Female Smokers"
                    value={AggregateData.femaleSmokers}
                    precision={1}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Male Smokers"
                    value={GBRData.maleSmokers}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Male Smokers"
                    value={AggregateData.maleSmokers}
                    precision={1}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="# Hospital Beds"
                    value={GBRData.hospitalBedsPerThousand}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="/1,000 people"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average # Hospital Beds"
                    value={AggregateData.diabetesPrevalence}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="/1,000 people"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Life Expectancy"
                    value={GBRData.lifeExpectancy}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    suffix="yrs."
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Life Expectancy"
                    value={AggregateData.lifeExpectancy}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    suffix="yrs."
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Human Development Index"
                    value={GBRData.humanDevelopmentIndex}
                    precision={3}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Average Human Development Index"
                    value={AggregateData.humanDevelopmentIndex}
                    precision={3}
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </header>
      </div>
    );
  }
}