import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Routes from "./routes";
import { Menu, Form, Input, Button } from "antd";
import Visualizations from "./pages/vis";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Menu
          mode="horizontal"
          theme="light"
          style={{
            backgroundColor: "#323776",
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            color: "white",
            borderBottomColor: "#323776",
          }}
        >
          <Menu.Item className="ant-menu-horizontal">
            <Link to="/">
              <h2 style={{ fontWeight: 800, fontSize: 20, color: "white" }}>
                COVID-19 DB
              </h2>
            </Link>
          </Menu.Item>
          <Menu.Item className="ant-menu-horizontal">
            <Link
              to="/home"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/about"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              About
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/countries"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Countries
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/case-statistics"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Cases
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/risk-factor-statistics"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Risks
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/global-news"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Global News
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/vis"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Visualizations
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/search"
              style={{ fontWeight: "bold", fontsize: 20, color: "white" }}
            >
              Search
            </Link>
          </Menu.Item>
        </Menu>
        <Routes />
      </Fragment>
    );
  }
}

export default App;
