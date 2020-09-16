import React from "react";
import axios from "axios";
import styled from "styled-components";
import _ from "lodash";

class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contract: [],
    };
  }
// get contracts from db
  componentDidMount() {
    axios
      .get("/api/EditContract")
      .then((response) => {
        const Contract = response.data;
        this.setState({ Contract: Contract });
        console.log("here");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
// map trough the contracts and render every contract
  renderContracts(Contract, index) {
    let contractList = _.partition(Contract, index);
    let result = contractList[0].map((Contract) => {
      return (
        <div>
          <h5>This one</h5>
          <div>{Contract.content}</div>
        </div>
      );
    });
    return result;
  }

  render() {
    return (
      <div>
        <h1>Contracts</h1>
        <div>{this.renderContracts(this.state.Contract)}</div>
      </div>
    );
  }
}

export default Contracts;
