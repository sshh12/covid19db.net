import React, { Component } from "react";
import { Button, Table, Tag, Space, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "../client";
import "../components/caseInstances/caseInstance.css";
import Highlighter from "react-highlight-words";
import {filterData} from './../components/caseInstances/caseModelData.js';
import {HighlighterText} from './../components/caseInstances/casePageComponents';

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: null,
      caseData: null,
      filteredInfo: null,
      sortedInfo: null,
      searchValue: null
    };
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals,new",
        },
      })
      .then((res) => {
        const caseData = res.data.map((data) => {
          var compiledCase = {
            country: data.country,
            newCases: data.new.cases,
            totalCases: data.totals.cases,
            totalCases: data.totals.cases,
            totalDeaths: data.totals.deaths,
            totalRecovered: data.totals.recovered,
            totalActive: data.totals.active,
            exploreCase: data.country.codes.alpha3Code,
            exploreRisk: data.country.codes.alpha3Code,
          };

          return compiledCase;
        });
        this.setState({ caseData });
        this.setState({dataSource: caseData});
        //console.log(caseData);
      });
  }


  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    this.setState({ filteredInfo: filters });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  setDataSource = (dataSource) => {
    this.setState({dataSource:dataSource});
  }

  setSearchValue = (value) => {
    this.setState({searchValue:value});
  }

  // const FilterByNameInput = (
  //   <Input
  //     placeholder="Search Name"
  //     value={value}
  //     onChange={e => {
  //       const currValue = e.target.value;
  //       setValue(currValue);
  //       const filteredData = data.filter(entry =>
  //         entry.name.includes(currValue)
  //       );
  //       setDataSource(filteredData);
  //     }}
  //   />
  // );

  render() {
    let { filteredInfo, caseData, searchValue } = this.state;
    filteredInfo = filteredInfo || {};
    
    const columns = [
      {
        title:         
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={e => {
              const currValue = e.target.value;
              this.setState({searchValue:currValue});
              const filteredData = caseData.filter(entry =>
                entry.country.name.toLowerCase().includes(currValue) ||
                entry.totalCases.toString().includes(currValue) ||
                entry.totalDeaths.toString().includes(currValue) ||
                entry.totalRecovered.toString().includes(currValue) ||
                entry.totalActive.toString().includes(currValue)
              );
              this.setState({dataSource:filteredData});
            }}
          />,
        children: [
          {
            title: "Country",
            dataIndex: "country",
            key: "country",
            render: (country) =>  
              searchValue != '' ?  (
                <Link to={`/countries/${country.codes.alpha3Code}`}>
                  <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchValue]}
                  autoEscape
                  textToHighlight={country ? country.name.toString() : ''}
                  /> 
                </Link>
                
              ):( 
                <Link to={`/countries/${country.codes.alpha3Code}`}>
                  {country.name}
                </Link>
              ),
            sorter: (a, b) => a.country.name.localeCompare(b.country.name),
          },
          {
            title: "Total Cases",
            dataIndex: "totalCases",
            key: "totalCases",
            render: (text) =>  
              searchValue != '' ?  (
                // <Highlighter
                // highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                // searchWords={[searchValue]}
                // autoEscape
                // textToHighlight={text ? text.toString() : ''}
                // /> 
                <HighlighterText text={text} searchValue={searchValue} />
              ):( 
                <>{text.toLocaleString()}</>
              ),
            sorter: (a, b) => a.totalCases - b.totalCases,
            filters: filterData.totalCasesFilterRanges,
            filteredValue: filteredInfo.totalCases || null,
            onFilter: (value, record) => (record.totalCases > value && record.totalCases < value + filterData.totalCasesFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Deaths",
            dataIndex: "totalDeaths",
            key: "totalDeaths",
            render: (text) =>  
              searchValue != '' ?  (
                <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
                /> 
              ):( 
                <>{text.toLocaleString()}</>
              ),
            sorter: (a, b) => a.totalDeaths - b.totalDeaths,
            filters: filterData.totalDeathsFilterRanges,
            filteredValue: filteredInfo.totalDeaths || null,
            onFilter: (value, record) => (record.totalDeaths > value && record.totalDeaths < value + filterData.totalDeathsFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Recovered",
            dataIndex: "totalRecovered",
            key: "totalRecovered",
            render: (text) =>  
              searchValue != '' ?  (
                <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
                /> 
              ):( 
                <>{text.toLocaleString()}</>
              ),
            sorter: (a, b) => a.totalRecovered - b.totalRecovered,
            filters: filterData.totalRecoveredFilterRanges, 
            filteredValue: filteredInfo.totalRecovered || null,
            onFilter: (value, record) => (record.totalRecovered > value && record.totalRecovered < value + filterData.totalRecoveredFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Total Active",
            dataIndex: "totalActive",
            key: "totalActive",
            render: (text) =>  
              searchValue != '' ?  (
                <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
                /> 
              ):( 
                <>{text.toLocaleString()}</>
              ),
            sorter: (a, b) => a.totalActive - b.totalActive,
            filters: filterData.totalActiveFilterRanges, 
            filteredValue: filteredInfo.totalActive || null,
            onFilter: (value, record) => (record.totalActive > value && record.totalActive < value + filterData.totalActiveFilterMappings[value]),
            ellipsis: true
          },
          {
            title: "Explore Cases",
            dataIndex: "country",
            key: "country",
            render: (country) => (
              <Link to={`/case-statistics/${country?.codes?.alpha3Code}`}>
                <Button>Explore</Button>
              </Link>
            ),
          },
          {
            title: "Explore Risks",
            dataIndex: "country",
            key: "country",
            render: (country) => (
              <Link to={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}>
                <Button>Explore</Button>
              </Link>
            ),
          },
        ]
      }
    ];

    return (
      <div className="App">
        <h1 style={{fontWeight: "800",fontSize: "2em",marginTop: "20px",marginBottom: "20px"}}>
          {" "}Cases{" "}
        </h1>
        <Button onClick={this.clearFilters}>Clear filters</Button>
        <Table
          style={{ margin: "0 5vw", outline: "1px solid lightgrey" }}
          columns={columns}
          dataSource={this.state.dataSource}
          onChange={this.handleChange}
          pagination={{ position: ["bottomRight", "topRight"] }}
        />
      </div>
    );
  }
}
