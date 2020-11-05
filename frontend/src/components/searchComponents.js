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
      placeholder="Search by country name, code, model type, or a page"
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.setSearchValue(currValue);
        const filteredData = props.data.filter(
          (entry) =>
            entry.value.text.toLowerCase().includes(currValue) ||
            entry.type.toLowerCase().includes(currValue)
        );
        props.setDataSource(filteredData);
      }}
    />
  );
}

export { HighlighterText, SearchBar };
