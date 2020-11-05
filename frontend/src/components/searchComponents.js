import React from "react";
import { Input } from "antd";
import Highlighter from "react-highlight-words";

//Component to highlight text
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

//Searchbar component to add in table header specific for search page
function SearchBar(props) {
  return (
    <Input
      style={props.style}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export { HighlighterText, SearchBar };
