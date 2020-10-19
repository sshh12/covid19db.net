import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Routes from "./routes";
import { Menu, Form, Input, Button } from 'antd';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Menu mode="horizontal">
          <Menu.Item>
            <a href="/" rel="noopener noreferrer" style={{ fontWeight: "bold", fontSize: 20 }}>
              COVID-19 DB
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/home" rel="noopener noreferrer">
              Home
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/about" rel="noopener noreferrer">
              About
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/countries" rel="noopener noreferrer">
              Countries
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/case-statistics" rel="noopener noreferrer">
              Cases
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/risk-factor-statistics" rel="noopener noreferrer">
              Risks
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="globalNews" rel="noopener noreferrer">
              Global News
            </a>
          </Menu.Item>
          <Menu.Item>
            {/* TODO search bar here */}
            <Form>
              <Form.Item style={{ marginTop: '25px' }}>
                <Input placeholder="Search bar not ready yet ... :(" />
                <Button type="primary">Search</Button>
              </Form.Item>
            </Form>
          </Menu.Item>
        </Menu>
        <Routes />
      </Fragment>

    );
  }
}

export default App;