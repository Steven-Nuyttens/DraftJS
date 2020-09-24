import React from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import logo from "./../images/logo192.png";
import {
  Editor,
  convertToRaw,
  RichUtils,
  convertFromRaw,
  Modifier,
  EditorState,
} from "draft-js";
import storedState from "./storedState.json";

const Logo = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const ContractCard = styled.div`
  border: 2px solid blue;
  width: 100%;
  max-width: 200px;
  margin: 10px;
  text-align: center;
  justify-content: space-between;
  border-radius: 10px;
  border-style: outset;
`;

const Card = styled.div`
  display: flex;
`;

const ContractWrapper = styled.div``;

const Row = styled.div`
  display: grid;
`;

const Col = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

class Contracts extends React.Component {
  constructor(props) {
    super(props);
    let content = // this needs to be 1 item in DB;
    this.state = {
      editorState: props.newArticle
        ? EditorState.createEmpty()
        : EditorState.createWithContent(convertFromRaw(content)),
      open: null,
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
  }
  // get contracts from db

  componentDidMount() {
    axios
      .get("/api/EditContract")
      .then((response) => {
        const content = response.data;
        console.log(content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  postText(e) {
    const contentState = this.state.editorState.getCurrentContent();
    let content = {
      content: convertToRaw(contentState),
      title: convertToRaw(contentState).blocks[0].text,
    };
    console.log(content);
    axios
      .post("http://localhost:6200/api/EditContract", content)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // get contracts from db

  toggleBlockType(event) {
    event.preventDefault();

    let block = event.currentTarget.getAttribute("data-block");
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, block),
    });
  }

  toggleInlineStyle(event) {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, style),
    });
  }
  renderBlockButton(value, block) {
    return (
      <input
        type="button"
        key={block}
        value={value}
        data-block={block}
        onMouseDown={this.toggleBlockType}
      />
    );
  }

  renderStyleButton(value, block) {
    const contentState = this.state.editorState.getCurrentContent();
    return (
      <input
        type="button"
        key={block}
        value={value}
        data-style={block}
        onMouseDown={this.toggleInlineStyle}
      />
    );
  }

  _toggleColor(toggledColor) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }
  // map trough the contracts and return every contract
  renderContracts(Contract, index) {
    let contractList = _.partition(Contract, index);
    let result = contractList[0].map((Contract) => {
      return (
        <ContractCard>
          <Editor />
        </ContractCard>
      );
    });
    return result;
  }

  render() {
    const contentState = convertFromRaw(storedState);
    const { editorState } = this.state;
    return (
      <div style={styles.root}>
        <ButtonContainer>
          <ColorControls
            editorState={editorState}
            onToggle={this.toggleColor}
          />

          <div>
            {blockStyleButton.map((button) => {
              return this.renderStyleButton(button.value, button.block);
            })}
          </div>

          <div>
            {blockTypeButtons.map((button) => {
              return this.renderBlockButton(button.value, button.block);
            })}
          </div>
        </ButtonContainer>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            customStyleMap={colorStyleMap}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Write something colorful..."
            ref="editor"
          />
        </div>
        <SubmitButton
          onClick={(e) => {
            this.postText(e);
          }}
        >
          submit
        </SubmitButton>
      </div>
    );
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

export default Contracts;
