import React from "react";
import Contracts from "./Contracts";
import EditContract from "./EditContract";
import styled from "styled-components";
import Header from "./../components/header/header";

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

class Home extends React.Component {
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
          <Contracts />
        </Dashboard>
      </div>
    );
  }
}

export default Home;
