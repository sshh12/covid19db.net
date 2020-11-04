import React from "react";
import { Button, Table, Tag, Space, Input } from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";


function HighlighterText(props) {
  return(
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[props.searchValue]}
      autoEscape
      textToHighlight={props.text ? props.text.toString() : ''}
    /> 
  );
}


export {
  HighlighterText
};