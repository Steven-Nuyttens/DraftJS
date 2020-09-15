import React from 'react';
import RichTextEditor from './../components/RichTextEditor';
import axios from 'axios';


class EditContracts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {textValue:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        let test = {text:this.state.textValue}
        console.log(test);
        axios.post('http://localhost:6200/api/EditContract', test)
      .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    render () {


        return(
            <div>
                <RichTextEditor />


            </div>
        )
    }
}

export default EditContracts;