import React from 'react';
import SignIn from './signIn/signIn.js';
import CreateAccount from './signUp/CreateAccount.js';
import styled from 'styled-components';
import { connect } from 'react-redux';

class SignScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedUpUser: true
        };
    }

    render() {
        return (
            <div>
                <div>
					<h2>Join Us</h2>
					<div src={require('./../../../assets/images/synclogo.png')} />
				</div>

				<div>

					<div style ={styles.countainer} >
						{this.state.signedUpUser ? <SignIn/> : <CreateAccount/>}
					</div>
					<div> 
						<h3>OR</h3> 
						<div onClick={ (e) => {this.setState({signedUpUser:!this.state.signedUpUser})}}>
						 {this.state.signedUpUser ? ' Create Account ' : ' Sign In '}
						</div>
					</div>
				</div>
            </div>
        )
    }
}

// mapStateToProps...

export default SignScreen;