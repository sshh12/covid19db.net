import React from "react";
import { Input } from "antd";

function SearchBar(props) {
  return (
    <Input
      style={{ width: "75vw" }}
      allowClear
      placeholder="Search"
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.setSearchValue(currValue);
        const filteredData = props.data.filter(
          (entry) =>
            entry.country.name.toLowerCase().includes(currValue) ||
            entry.totalCases.toString().includes(currValue) ||
            entry.totalDeaths.toString().includes(currValue) ||
            entry.totalRecovered.toString().includes(currValue) ||
            entry.totalActive.toString().includes(currValue)
        );
        props.setDataSource(filteredData);
      }}
    />
  );
}

export default SearchBar;
