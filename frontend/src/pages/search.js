import React, { Component } from "react";
import { Form, Button, Input } from 'antd';
import './../styling/main.css';

export default class Search extends Component {
  render() { 

    return (
      <div className="App">
        <div style={{backgroundColor:"#323776", paddingBottom: 15}}>
        <h1 style={{paddingTop:20, paddingBottom: 20, fontSize:'2em'}} className="main-text">Search</h1>
        <Form style={{display: 'block'}}>
          <Form.Item style={{display: 'inline-block', width: "25%"}}>
            <Input placeholder="Search bar not ready yet ... :(" />
            <Button style={{backgroundColor:"#ededed", color: "#323776", fontWeight:"bold", margin:15}}>Search</Button>
          </Form.Item>
        </Form>
        </div>
      </div>
    );
  }
}

