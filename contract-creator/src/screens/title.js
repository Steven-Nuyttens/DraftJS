import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import _ from "lodash";
import styled from "styled-components";
import {
  Editor,
  convertToRaw,
  RichUtils,
  convertFromRaw,
  Modifier,
  EditorState,
} from "draft-js";

class Titles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentDidMount() {
    axios
      .get("/api/EditContract")
      .then((response) => {
        const content = response.data;
        console.log(content)
        
        //this.setState({editorState: EditorState.createWithContent(content)})
      })
      .catch(function (error) {
        console.log(error);
      });
    };
    
    renderContracts(Contract, index) {
      let contractList = _.partition(Contract, index);
      console.log(contractList);
      console.log('hey')
    let result = contractList[0].map((Contract) => {
      return (
        <Editor
          editorState={this.setState({editorState: EditorState.createWithContent(Contract)})}
        />
      );
    });
    console.log(result);
    return result;
  }

  render() {
    const {editorState} = this.state;
    return <div>
      <div>{this.renderContracts(this.state.Contract)}</div>
      <p>hey</p></div>;
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style;
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] };
    } else {
      style = styles.styleButton;
    }

    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  { label: "Red", style: "red" },
  { label: "Orange", style: "orange" },
  { label: "Yellow", style: "yellow" },
  { label: "Green", style: "green" },
  { label: "Blue", style: "blue" },
  { label: "Indigo", style: "indigo" },
  { label: "Violet", style: "violet" },
  { label: "roboto", style: "roboto" },
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {COLORS.map((type) => (
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    padding: 20,
    width: "75%",
  },
  editor: {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: 16,
    padding: "2px 0",
  },
};

const Container = styled.div`
  width: 50%;
  min-height: 100px;
  border: 2px solid #aaaaaa;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  padding: 1%;
`;
const SubmitButton = styled.button`
  background-color: white;
  border: 2px solid #aaaaaa;
  border-radius: 10px;
  margin: 1%;
`;
const AddInput = styled.input`
  color: ${(props) => (props.active ? "green" : "white")};
`;
const ButtonContainer = styled.div`
  padding: 1%;
  text-align: left;
  margin-left: auto;
  margin-right: auto;

  input {
    background-color: white;
    border: none;
    color: #aaaaaa;
  }
`;
const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)",
  },
  orange: {
    color: "rgba(255, 127, 0, 1.0)",
  },
  yellow: {
    color: "rgba(180, 180, 0, 1.0)",
  },
  green: {
    color: "rgba(0, 180, 0, 1.0)",
  },
  blue: {
    color: "rgba(0, 0, 255, 1.0)",
  },
  indigo: {
    color: "rgba(75, 0, 130, 1.0)",
  },
  violet: {
    color: "rgba(127, 0, 255, 1.0)",
  },
  roboto: {
    fontFamily: "Roboto",
  },
};

const blockStyleButton = [
  {
    value: "U",
    block: "UNDERLINE",
  },

  {
    value: "I",
    block: "ITALIC",
  },

  {
    value: "B",
    block: "BOLD",
  },
];

const blockTypeButtons = [
  {
    value: "H1",
    block: "header-one",
  },

  {
    value: "H2",
    block: "header-two",
  },

  {
    value: "H3",
    block: "header-three",
  },
  {
    value: "H4",
    block: "header-four",
  },
  {
    value: "H5",
    block: "header-five",
  },
  {
    value: "H6",
    block: "header-six",
  },

  {
    value: "p",
    block: "paragraph",
  },
  {
    value: "Blockquote",
    block: "blockquote",
  },

  {
    value: "Unordered List",
    block: "unordered-list-item",
  },

  {
    value: "Ordered List",
    block: "ordered-list-item",
  },
];


export default Titles;
