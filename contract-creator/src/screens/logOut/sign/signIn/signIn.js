import React from "react";
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import styled from "styled-components";
import axios from "axios";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      pswd: "",
      repeatPswd: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:6200/api/', this.state)
  .then(res => {
    console.log(res)
    if (res.status === 200) {
        document.cookie = res.data.token
        window.location.replace("/UserProfile");
        return <Redirect to="/UserProfile" />;
      } else {
        const error = new Error(res.error);
        throw error;
      }
})
.catch(function (error) {
    console.log(error);
});
}

render() {
    return (
        <div>
            <FormContainer onSubmit={this.handleSubmit}>
                <label>email</label>
                <InputField type="mail" id="email" onChange={this.handleChange} />
                <label>password</label>
                <InputField type="password" id="pswd" onChange={this.handleChange} />
                <SubmitButton>Sign In</SubmitButton>
            </FormContainer>
        </div>
    )
}
};

// mapsStateToProps...


export default SignIn;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  height: 20px;
`;

const SubmitButton = styled.button`
  border-radius: 20px;
  background-color: light-grey;
`;