import React from "react";
import DraftEditorRawExample from "./../components/DraftEditorRawExample";
import { Editor, EditorState, RichUtils, convertToRaw, Modifier, convertFromRaw, KeyBindingUtil } from "draft-js";
import styled from "styled-components"



class EditContracts extends React.Component {
 

  

  

  render() {
    return (
      <div>
        <DraftEditorRawExample />
        
      </div>
    );
  }
}

export default EditContracts;
