import React from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";
import logo from "./../images/logo192.png"
import { Editor, convertToRaw, RichUtils, convertFromRaw, EditorState } from "draft-js";

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
`

const ContractWrapper = styled.div`
`;

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
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(Contract)))
    };
  }
  // get contracts from db
  componentDidMount() {
    axios
      .get("/api/EditContract")
      .then((response) => {
        const Contract = response;
        this.setState({ Contract: Contract });
        console.log(Contract);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // map trough the contracts and return every contract
  renderContracts(Contract, index) {
    let contractList = _.partition(Contract, index);
    let result = contractList[0].map((Contract) => {
      return (
        <ContractCard>
          <h5>Title</h5>
          <Logo src={logo} />
          <div>{Contract.data}</div>
        </ContractCard>
      );
    });
    return result;
  }

  render() {
    return (
      <div>
        <h1>Contracts</h1>
        <ContractWrapper>
              <Card>{this.renderContracts(this.state.Contract)}</Card>
        </ContractWrapper>
      </div>
    );
  }
}

export default Contracts;
