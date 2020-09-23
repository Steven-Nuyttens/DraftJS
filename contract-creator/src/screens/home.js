import React from "react";
import Contracts from "./Contracts";
import DraftEditorRawExample from "./../components/DraftEditorRawExample";

import styled from "styled-components";
import Header from "./../components/header/header";
import { Editor, EditorState, RichUtils, convertToRaw, Modifier, convertFromRaw, KeyBindingUtil } from "draft-js";
import axios from "axios";
import AlterContracts from "./AlterContracts";

const InputField = styled.div`
  margin: 10px;
  border: 1px solid grey;
`;

const ContractWrapper = styled.div`
  border: 3px solid;
`;

const Dashboard = styled.div`
  justify-content: center;
  width: 100%;
`;

const Answer = styled.h3`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 2px solid #aaaaaa;
  border-radius: 10px;
  margin: 1%;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
		this.state = { editorState: EditorState.createEmpty() };

	}

  postText(e) {
    const contentState = this.state.editorState.getCurrentContent();
		var content = {
			content: convertToRaw(contentState),
			title: convertToRaw(contentState).blocks[0].text
		}

    axios
      .post("http://localhost:6200/api/EditContract", contentState)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Dashboard>
          <h1>Dashboard</h1>
          <h2>Contract title</h2>
          <ContractWrapper>
            <InputField>
              <Answer>answer input 1</Answer>
              <DraftEditorRawExample />
            </InputField>
            
          </ContractWrapper>
          <Contracts />
        </Dashboard>
      </div>
    );
  }
}

export default Home;
