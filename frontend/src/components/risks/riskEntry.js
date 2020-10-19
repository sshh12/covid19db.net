import React, { Component } from "react";
import { Button, Table} from "antd";
import axios from 'axios';
// import "../risks/riskInstance.css";


export default class RiskEntry extends Component {
    render() {
        const {capital, codes, flag, languages, name, population } = this.props.data;
        return (
          <div className="App">
            {/* <header className="App-header"> */}
            <h1
              style={{
                fontWeight: "800",
                fontSize: "2em",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Risk Factors & Statistics{" "}
            </h1>
            {/* <Table
              style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={data}
              pagination={false}
            /> */}
            {/* </header> */}
          </div>           
        )
    }
}