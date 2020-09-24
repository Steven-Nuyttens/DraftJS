import React from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";

class CreateAccount extends React.Component {
  constructor(props) {
    super();
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
		if(this.state.pswd.length > 7 && this.state.eMail.length > 5 && this.state.name.length >1) {

			if(this.state.pswd === this.state.confirmedpswd) {
				axios.post('http://localhost:6200/api/register/', this.state)
				.then(res => {
					console.log(res)
					if (res.status === 200) {
						document.cookie = res.data.token
						window.location.replace("/UserProfile");
						return true;
					  } else {
						const error = new Error(res.error);
						throw error;
					  }
				})
				.catch(function (error) {
				  console.log(error);
				});
			} else {
	
				alert('passwords doesnt match')
			}
		} else {
			alert('passwords must be at least 8 charachter long')
		}
	}

  render() {
    return (
      <div>
        <FormContainer onSubmit={this.handleSubmit}>
          <label>First name</label>
          <InputField type="" id="" onChange={this.handleChange}/>
          <label>Last name</label>
          <InputField type="" id="" onChange={this.handleChange}/>
          <label>Email</label>
          <InputField type="" id="" onChange={this.handleChange}/>
          <label>Password</label>
          <InputField type="" id="" onChange={this.handleChange}/>
          <label>Confirm Password</label>
          <InputField type="" id="" onChange={this.handleChange}/>
          <SubmitButton>Create Account</SubmitButton>
        </FormContainer>
      </div>
    );
  }
}


// mapsStateToProps...

export default CreateAccount;

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
