import React, { Fragment } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">
              <h2 style={{ fontweight: "bold", fontsize: 20 }}>
                COVID-19 DB
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/home" style={{ fontweight: "bold", fontsize: 20 }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about">
              About
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/countries">
              Countries
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/case-statistics">
              Cases
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/risk-factor-statistics">
              Risks
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/globalnews">
              Global News
            </Link>
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