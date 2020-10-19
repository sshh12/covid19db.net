import React, { Component } from "react";
import { Button, Card} from "antd";
import { LinkContainer } from "react-router-bootstrap";
import axios from 'axios';

import "../countryInstances/countryInstance.css";

const { Meta } = Card;

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
            <LinkContainer to={`/countries/${codes.alpha3Code}`}>
                <Card
                extra={<this.CardExtra code={codes.alpha3Code} />}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={flag} />}
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
            </LinkContainer>            
        )
    }
}