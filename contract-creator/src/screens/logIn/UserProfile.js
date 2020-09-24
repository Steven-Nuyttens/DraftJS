import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:6200/api/user/data')
        .then(res => {
            if (res.status === 200) {
                this.setState(res.data);
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
        });
    }

    render() {
        

        return(
            <div>
                <div>
                    <p>{this.state.firstName}</p>
                    <p>{this.state.lastName}</p>
                </div>
            </div>
        )
    }
}

export default UserProfile;