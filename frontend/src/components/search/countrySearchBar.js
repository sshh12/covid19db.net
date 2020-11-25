import React from "react";
import { Input } from "antd";

function SearchBar(props) {
  return (
    <Input
      style={{ width: "50vw", margin: "2vh" }}
      allowClear
      placeholder="Search"
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.onSearchChange(currValue);
      }}
    />
  );
}

export default SearchBar;
