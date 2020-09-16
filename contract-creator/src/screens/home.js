import React from "react";
import Contracts from "./Contracts";
import EditContract from "./EditContract";
import styled from "styled-components";

const InputField = styled.div`
  margin: 10px;
  border: 1px solid grey;
`;

const ContractWrapper = styled.div`
  border: 3px solid;
`;

const Dashboard = styled.div`
  display: grid;
  justify-content: center;
`;

const Answer = styled.h3`
display: flex;
justify-content: center;`

class Home extends React.Component {
  render() {
    return (
      <Dashboard>
        <h1>Dashboard</h1>
        <h2>Contract title</h2>
        <ContractWrapper>
          <InputField>
            <Answer>answer input 1</Answer>
            <EditContract />
          </InputField>
          <InputField>
            <Answer>answer input 2</Answer>
            <EditContract />
          </InputField>
          <InputField>
            <Answer>answer input 3</Answer>
            <EditContract />
          </InputField>
        </ContractWrapper>
      </Dashboard>
    );
  }
}

export default Home;
