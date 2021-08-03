import React, {Component} from 'react';
import './addCredentialsStyles.css';

class AddCredentials extends Component {
    constructor(props) {
        super(props);
        /*binding event handlers*/
        this.handleUsername=this.handleUsername.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleDivision=this.handleDivision.bind(this);
        this.handleResource=this.handleResource.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
    }
    /*these event handlers send the changes made to the inputs for the form up to the parent
    * the fields are auto populated by the user on select and the data is sent down as props
    * after the auto populate the user can edit the data, on these changes the event handlers handle the changes*/
    handleUsername(e){
        this.props.handleUsername(e.target.value);
    }
    handlePassword(e){
        this.props.handlePassword(e.target.value);
    }
    handleDivision(e){
        this.props.handleDivision(e.target.value);
    }
    handleResource(e){
        this.props.handleResource(e.target.value);
    }
    /*the add event handler send the add event to the parent which handles the request*/
    handleAdd(e){
        e.preventDefault();
        this.props.handleAdd()
    }
    /*add credentials are the state values in the parent anc changes as the user updates them, these values autofill
    * the form inputs accordingly.
    * the addResponse prop is the response from the backend and notifies the user of the failure or success of the
    * operation, divisions access limits the dropdown menu options according to access/permissions of user*/
    render() {
        const {addCredentials, addResponse, divisionsAccess} = this.props;
        return (
            <div className="add-form-container">
                <h4>Create new Credentials</h4>
                <form onSubmit={this.handleAdd} className="new-credentials-form">
                    <input value={addCredentials[0]}
                           onChange={this.handleUsername}
                           placeholder="Username"
                           type='text'
                           required
                    /> <br/>
                    <input value={addCredentials[1]}
                           onChange={this.handlePassword}
                           placeholder="Password"
                           type="text"
                           required
                    /> <br/>
                    <input value={addCredentials[2]}
                           onChange={this.handleResource}
                           placeholder="Resource"
                           type="text"
                           required
                    /> <br/>
                    <select value={addCredentials[3]} onChange={this.handleDivision} required >
                        <option value="" disabled hidden>Select Division</option>
                        {divisionsAccess.includes('finances') ? <option value="finances">Finances</option> : null}
                        {divisionsAccess.includes('writing') ? <option value="writing">Writing</option> : null}
                        {divisionsAccess.includes('it') ? <option value="it">IT</option> : null}
                        {divisionsAccess.includes('development') ? <option value="development">Development</option> : null}
                    </select><br/><br/>
                    <button type='submit' className='button-style2'>Add</button> <br/>
                    <p>{addResponse.length > 0 ? addResponse : null}</p>
                </form>
            </div>
        );
    }
}

export default AddCredentials;