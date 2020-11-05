import React from "react";
import { Input } from "antd";
import Highlighter from "react-highlight-words";

function HighlighterText(props) {
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={[props.searchValue]}
      autoEscape
      textToHighlight={props.text ? props.text.toString() : ""}
    />
  );
}

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

export { HighlighterText, SearchBar };
