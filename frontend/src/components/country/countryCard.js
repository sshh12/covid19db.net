import React, { Component, Fragment } from "react";
import { Card, Col, Row, Layout} from "antd";
import { LinkContainer } from "react-router-bootstrap";
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
      
    //TODO actually format
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
      
    CardExtra({ code }) {
        return (
          <div>
            <LinkContainer to={`/cases/${code}`}>
              <a href="#">Cases</a>
            </LinkContainer>{" "}
            |{" "}
            <LinkContainer to={`/risks/${code}`}>
              <a href="#">Risks</a>
            </LinkContainer>
          </div>
        );
    }
      
    render() {  
      const {capital, codes, flag, languages, name, population } = this.props.data;
        return (
          <Layout style={{ height: 360, width: 300, border: "1px grey"}}>
            <Content style={{height: 310}}>
              <Link to={`/countries/${codes.alpha3Code}`}>
                <Card
                  hoverable
                  cover={<img alt="example" src={flag} style={{ height: 165, width: 300}}/>}
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
                  <LinkContainer to={`/cases/${codes.alpha3Code}`}><a href="#">Cases</a></LinkContainer>
                </Col>
                <Col span={12}>                  
                  <LinkContainer to={`/risks/${codes.alpha3Code}`}><a href="#">Risks</a></LinkContainer>
                </Col>               
              </Row>
            </Content>
          </Layout>
        )
    }
}