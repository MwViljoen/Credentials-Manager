import React, {Component} from 'react';
import './updateCredentialsStyles.css';
/* in this component we handle the update of credentials, after the user selects a credential to update the form is automatically
* populated with the selected credentials, the handlers merely update the credentials as the user changes them
* the update button will only appear if the user selected a credential to update, and a message will appear to the user if
* the update was successful or not */
class UpdateCredentials extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleResourceChange=this.handleResourceChange.bind(this);
    }

    handleUsernameChange(e){
        this.props.handleUsernameChange(e.target.value);
    }
    handlePasswordChange(e){
        this.props.handlePasswordChange(e.target.value);
    }
    handleResourceChange(e){
        this.props.handleResourceChange(e.target.value);
    }

    handleUpdate(e){
        e.preventDefault();
        this.props.handleUpdate()
    }

    render() {
        const {updatedCredentials, selectState, updateResponse} = this.props;
        const username = updatedCredentials.username;
        const password = updatedCredentials.password;
        const resource = updatedCredentials.resource;
        return (
            <div className="add-form-container">
                <h4>Create new Credentials</h4>
                <form onSubmit={this.handleUpdate} className="new-credentials-form">
                    <input value={username}
                           onChange={this.handleUsernameChange}
                           placeholder="Click a credential to update"
                           type='text'
                           required
                           size='25'
                    /> <br/>
                    <input value={password}
                           onChange={this.handlePasswordChange}
                           placeholder="Click a credential to update"
                           type="text"
                           required
                           size='25'
                    /> <br/>
                    <input value={resource}
                           onChange={this.handleResourceChange}
                           placeholder="Click a credential to update"
                           type="text"
                           required
                           size='25'
                    /> <br/>
                    {
                        selectState ? <button type='submit' className='button-style2'>Update</button> :
                            <p>Click on a Credential in Divisions below to update</p>
                    }
                    <br/>
                    <p>{updateResponse.length > 0 ? updateResponse : null}</p>
                </form>
            </div>
        );
    }
}

export default UpdateCredentials;