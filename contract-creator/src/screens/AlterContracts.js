import React from 'react';
import styled from 'styled-components'

import Axios from 'axios';
import { connect } from 'react-redux';

class AlterContracts extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      contractData:{}
    }
  }

  componentDidMount() {
    this.fetchInterview()
  }

  fetchInterview() {
    var url = window.location.href;
    var splitedUrl = url.split('/')
    Axios.get(this.props.baseApi+'api/EditContract/' + splitedUrl[4])
    .then((response) => {
      console.log(response)
      this.setState({contractData: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderText() {
    let contract = []
    if(this.state.contractData.content) {
      contract = this.state.contractData.content.blocks.map( text => {
        switch (text.type) {
          case "header-one":
            return <h1>{text.text} </h1>
          
          case "header-two":
            return <h2>{text.text} </h2>
          case "header-three":
            return <h3>{text.text} </h3>
          case "atomic":
            return <img src={text.text} />
          default:
            return <p>{text.text} </p>
        }
      
      })
    }
    return contract
  }

  render() {
    return (
      <Canvas>
        {this.renderText()}
      </Canvas>
    );
  }
}

const mapStateToProps = (state) => {
    return{

        level:state.level,
        baseApi : state.baseApi
    }
}

export default connect(mapStateToProps)(AlterContracts)

const Canvas = styled.div`
  width: 60%;
  margin-right:auto;
  margin-left:auto;
  text-align:left;

`