import React from "react";
import { Divider, Pagination, Row, Select, Space } from "antd";
import RangeInputFilter from "../rangeFilterInput";

const { Option, OptGroup } = Select;

const SORT_TYPES = {
  NAME: 1,
  ALPHA2: 2,
  ALPHA3: 3,
  NUM_CASES: 4,
  POPULATION: 5,
};

function CountrySortSelection(props) {
  return (
    <Select
      style={{ width: 200, display: "inline-block", verticalAlign: "top" }}
      value={props.sortBy}
      onChange={props.onChange}
    >
      <OptGroup label="Name">
        <Option value={SORT_TYPES.NAME} key="cName">
          Country Name
        </Option>
        <Option value={SORT_TYPES.ALPHA2} key="iso2">
          ISO Alpha 2 Code
        </Option>
        <Option value={SORT_TYPES.ALPHA3} key="iso3">
          ISO Alpha 3 Code
        </Option>
      </OptGroup>
      <OptGroup label="Statistics">
        <Option value={SORT_TYPES.NUM_CASES} key="cases">
          Total Cases
        </Option>
        <Option value={SORT_TYPES.POPULATION} key="population">
          Population
        </Option>
      </OptGroup>
    </Select>
  );
}

function CountryPagination(props) {
  return props.display ? (
    <Pagination
      display={props.display ?? true}
      style={{ display: "inline-block", verticalAlign: "top" }}
      current={props.pageNumber} // current page number
      pageSize={props.numPerPage} // default size of page
      pageSizeOptions={["10", "20", "50", "100"]}
      onChange={props.onChange}
      total={props.numCountries} //total number of countries
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      showSizeChanger
      showQuickJumper
    />
  ) : (
    <div />
  );
}

function CountryGridControl(props) {
  return (
    <Space className="country-display-header">
      <div>Sort by:</div>
      {props.selectSort}
      <RangeInputFilter
        style={{ textAlign: "center" }}
        type={props.sortBy > SORT_TYPES.ALPHA3 ? "numeric" : "alpha"}
        active={props.sortHiVal != -1}
        rangeLo={props.sortLowVal}
        rangeHi={props.sortHiVal}
        onChange={props.onChange}
      />
      <Divider type="vertical" />
      {props.pagination}
    </Space>
  );
}

function CountryCardView(props) {
  return (
    <div className="site-card-wrapper" style={{ margin: "2vh 5vw" }}>
      <Row gutter={props.gutter ?? 16} justify="center">
        {props.countryGrid?.length != 0 ? (
          props.countryGrid
        ) : (
          <div>No country matches found...</div>
        )}
      </Row>
    </div>
  );
}
export {
  CountryCardView,
  CountryGridControl,
  CountryPagination,
  CountrySortSelection,
  SORT_TYPES,
};
