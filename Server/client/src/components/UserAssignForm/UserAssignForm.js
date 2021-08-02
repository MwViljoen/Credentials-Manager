import React, {Component} from 'react';
import './userAssignFormStyles.css';

class UserAssignForm extends Component {
    constructor(props) {
        super(props);
        /*binding events*/
        this.handleOU=this.handleOU.bind(this);
        this.handleDevelopment=this.handleDevelopment.bind(this);
        this.handleWriting=this.handleWriting.bind(this);
        this.handleIT=this.handleIT.bind(this);
        this.handleFinances=this.handleFinances.bind(this);
    }
    /*events that handle the permissions granted*/
    handleOU(e){
        this.props.handleOU(e.target.value);
    }
    handleDevelopment(e){
        this.props.handleDevelopment(e.target.value);
    }
    handleWriting(e){
        this.props.handleWriting(e.target.value);
    }
    handleIT(e){
        this.props.handleIT(e.target.value);
    }
    handleFinances(e){
        this.props.handleFinances(e.target.value);
    }

    render() {
        const {orgUnit, selectedUserData} = this.props;
        /*converting the acronym to full name*/
        let fullOrgUnit;
        if(orgUnit === 'NM'){
            fullOrgUnit = 'News Management';
        }
        if(orgUnit === 'SR'){
            fullOrgUnit = 'Software Reviews';
        }
        if(orgUnit === 'HR'){
            fullOrgUnit = 'Hardware Reviews';
        }
        if(orgUnit === 'OP'){
            fullOrgUnit = 'Opinion Publishing';
        }
        /*here we generate a component that returns a part of a form the form is of type radio, The OU and all divisions
        * have 2 radio buttons that specify grant access or no access only one radio per OU or division can be selected
        * either giving access or not. The selected users permissions are passed down to this component to pre assign the
        * current permissions of that user, the changes are made and saved in state, thereafter if the admin user made the
        * changes the refresh event is called and the users will be fetched again but by now the user has been updated and
        * the new permissions should reflect*/
        return (
            <div className="user-form-container">
                <h2>{fullOrgUnit} Permissions</h2>

                <div>
                    <label>
                        <input
                            type="radio"
                            name={`ou-permission${orgUnit}`}
                            value={orgUnit}
                            checked={selectedUserData[0].length > 0}
                            onChange={this.handleOU}
                        />
                        Access
                    </label> <br/>
                    <label>
                        <input
                            type="radio"
                            name={`ou-permission${orgUnit}`}
                            value=""
                            checked={selectedUserData[0].length === 0}
                            onChange={this.handleOU}
                        />
                        No Access
                    </label><br/>
                </div>

                { selectedUserData[0].length > 0 ?
                    <div>
                        <h3>Select Division Permissions:</h3>
                        <p>Development :</p>
                        <label>
                            <input
                                type="radio"
                                name={`development${orgUnit}`}
                                value="development"
                                checked={(selectedUserData[0].length > 0) && (selectedUserData[1].length > 0)}
                                onChange={this.handleDevelopment}
                            />
                            Access
                        </label><br/>
                        <label>
                            <input
                                type="radio"
                                name={`development${orgUnit}`}
                                value="F"
                                checked={selectedUserData[0].length === 0 || (selectedUserData[1].length === 0)}
                                onChange={this.handleDevelopment}
                            />
                            No Access
                        </label><br/>
                    </div> : null
                }

                { selectedUserData[0].length > 0 ?
                    <div>
                        <p>Writing :</p>
                        <label>
                            <input
                                type="radio"
                                name={`writing${orgUnit}`}
                                value="writing"
                                checked={(selectedUserData[0].length > 0) && (selectedUserData[2].length > 0)}
                                onChange={this.handleWriting}
                            />
                            Access
                        </label><br/>
                        <label>
                            <input
                                type="radio"
                                name={`writing${orgUnit}`}
                                value="F"
                                checked={selectedUserData[0].length === 0 || (selectedUserData[2].length === 0)}
                                onChange={this.handleWriting}
                            />
                            No Access
                        </label><br/>
                    </div> : null
                }

                { selectedUserData[0].length > 0 ?
                    <div>
                        <p>IT :</p>
                        <label>
                            <input
                                type="radio"
                                name={`it${orgUnit}`}
                                value="it"
                                checked={(selectedUserData[0].length > 0) && (selectedUserData[3].length > 0)}
                                onChange={this.handleIT}
                            />
                            Access
                        </label><br/>
                        <label>
                            <input
                                type="radio"
                                name={`it${orgUnit}`}
                                value="F"
                                checked={selectedUserData[0].length === 0 || (selectedUserData[3].length === 0)}
                                onChange={this.handleIT}
                            />
                            No Access
                        </label><br/>
                    </div> : null
                }

                { selectedUserData[0].length > 0 ?
                    <div onChange={this.handleFinances}>
                        <p>Finances :</p>
                        <label>
                            <input
                                type="radio"
                                name={`finances${orgUnit}`}
                                value="finances"
                                checked={(selectedUserData[0].length > 0) && (selectedUserData[4].length > 0)}
                                onChange={this.handleFinances}
                            />
                            Access
                        </label><br/>
                        <label>
                            <input
                                type="radio"
                                name={`finances${orgUnit}`}
                                value="F"
                                checked={selectedUserData[0].length === 0 || (selectedUserData[4].length === 0)}
                                onChange={this.handleFinances}
                            />
                            No Access
                        </label><br/>
                    </div> : null
                }
            </div>
        );
    }
}

export default UserAssignForm;