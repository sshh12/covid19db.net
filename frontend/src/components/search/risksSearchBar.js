import React from "react";
import { Input } from "antd";

function SearchBar(props) {
  return (
    <Input
      placeholder="Search"
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.setSearchValue(currValue);
        const filteredData = props.data.filter(
          (entry) =>
            entry?.country?.name?.toLowerCase().includes(currValue) ||
            entry?.lifeExpectancy?.toString().includes(currValue) ||
            entry?.humanDevelopmentIndex?.toString().includes(currValue) ||
            entry?.populationDensity?.toString().includes(currValue) ||
            entry?.gini?.toString().includes(currValue)
        );
        props.setDataSource(filteredData);
      }}
    />
  );
}

export default SearchBar;
