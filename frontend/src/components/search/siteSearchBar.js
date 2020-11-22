import React from "react";
import { Input } from "antd";

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

export default SearchBar;
