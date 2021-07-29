import React, {Component} from 'react';
import './userAssignStyles.css';
import UserAssignForm from "../UserAssignForm/UserAssignForm";
import Users from "../Users/Users";
/*THis component only renders if the user has a role of admin. it gives permissions to other users and also change the
* roles of other users. the only user that's permissions cannot be changed is the admin user the DB will never return
* the admin user for access. In this component we have 1 component that is rendered 4 times. once per OU.
* the components are radio inputs and are tick boxes to give access or not to the selected user. similar to the credential
* select method here we need to select a user first before a form to change the permissions will be rendered.
* this form grants access to users according to the radio buttons selected by the admin*/
class UserAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUserID: '',
            userName: '',
            role: '',
            stateNM: ['', '', '', '', ''],
            stateSR: ['', '', '', '', ''],
            stateHR: ['', '', '', '', ''],
            stateOP: ['', '', '', '', ''],
            /* [ OU state , state of Div development , state of Div writing , ... it , ... finances]*/
            data: [],
            selectState: false,
            permissionsResponse: ''
        }
        /*binding event handlers*/
        this.handleNM=this.handleNM.bind(this);
        this.handleDevelopmentNM=this.handleDevelopmentNM.bind(this);
        this.handleWritingNM=this.handleWritingNM.bind(this);
        this.handleITNM=this.handleITNM.bind(this);
        this.handleFinancesNM=this.handleFinancesNM.bind(this);

        this.handleSR=this.handleSR.bind(this);
        this.handleDevelopmentSR=this.handleDevelopmentSR.bind(this);
        this.handleWritingSR=this.handleWritingSR.bind(this);
        this.handleITSR=this.handleITSR.bind(this);
        this.handleFinancesSR=this.handleFinancesSR.bind(this);

        this.handleHR=this.handleHR.bind(this);
        this.handleDevelopmentHR=this.handleDevelopmentHR.bind(this);
        this.handleWritingHR=this.handleWritingHR.bind(this);
        this.handleITHR=this.handleITHR.bind(this);
        this.handleFinancesHR=this.handleFinancesHR.bind(this);

        this.handleOP=this.handleOP.bind(this);
        this.handleDevelopmentOP=this.handleDevelopmentOP.bind(this);
        this.handleWritingOP=this.handleWritingOP.bind(this);
        this.handleITOP=this.handleITOP.bind(this);
        this.handleFinancesOP=this.handleFinancesOP.bind(this);
        this.handleRole=this.handleRole.bind(this);
        /*handles the select of the uer to change its permissions*/
        this.handleSelect=this.handleSelect.bind(this);

        this.handlePermissionsGrant=this.handlePermissionsGrant.bind(this);
    }
    /*this event is called refresh since it fetches all registered users from the database*/
    async refresh(){
        let jsonData;

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': this.props.token
            }
        }

        try{
            const response = await fetch('/users/get', config);
            jsonData = await response.json();
            await this.setState({
                data: jsonData
            });
        } catch (error){
            console.log(`Could not fetch Users from Database`);
        }
    }
    /*the update State is called to update state values according to the arguments given in this case we expect
    * a index of the array to be updated, which organizational unit the change belong to and the data to replace that
    * index*/
    updateState(index, orgUnit, data){
        let placeholder;
        if(orgUnit === 'NM'){
            placeholder = this.state.stateNM;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                this.setState({
                    stateNM: placeholder
                });
            }
            else if(data === 'F'){
                placeholder[index] = '';
                this.setState({
                    stateNM: placeholder
                });
            }
            else {
                placeholder = ['', '', '', '', '']
                this.setState({
                    stateNM: placeholder
                });
            }
        }
        if(orgUnit === 'SR'){
            placeholder = this.state.stateSR;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                this.setState({
                    stateSR: placeholder
                });
            }
            else if(data === 'F'){
                placeholder[index] = '';
                this.setState({
                    stateSR: placeholder
                });
            }
            else {
                placeholder = ['', '', '', '', '']
                this.setState({
                    stateSR: placeholder
                });
            }
        }
        if(orgUnit === 'HR'){
            placeholder = this.state.stateHR;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                this.setState({
                    stateHR: placeholder
                });
            }
            else if(data === 'F'){
                placeholder[index] = '';
                this.setState({
                    stateHR: placeholder
                });
            }
            else {
                placeholder = ['', '', '', '', '']
                this.setState({
                    stateHR: placeholder
                });
            }
        }
        if(orgUnit === 'OP'){
            placeholder = this.state.stateOP;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                this.setState({
                    stateOP: placeholder
                });
            }
            else if(data === 'F'){
                placeholder[index] = '';
                this.setState({
                    stateOP: placeholder
                });
            }
            else {
                placeholder = ['', '', '', '', '']
                this.setState({
                    stateOP: placeholder
                });
            }
        }
    }
    /*on component did mount to dom we call the refresh to fetch the users from the database*/
    async componentDidMount() {
        await this.refresh();
    }
    /*all of these event handlers are part of a specific OU form and handles the changes accordingly*/
    handleNM(e){
        this.updateState(0, 'NM', e);
    }
    handleDevelopmentNM(e){
        this.updateState(1, 'NM', e);
    }
    handleWritingNM(e){
        this.updateState(2, 'NM', e);
    }
    handleITNM(e){
        this.updateState(3, 'NM', e);
    }
    handleFinancesNM(e){
        this.updateState(4, 'NM', e);
    }

    handleSR(e){
        this.updateState(0, 'SR', e);
    }
    handleDevelopmentSR(e){
        this.updateState(1, 'SR', e);
    }
    handleWritingSR(e){
        this.updateState(2, 'SR', e);
    }
    handleITSR(e){
        this.updateState(3, 'SR', e);
    }
    handleFinancesSR(e){
        this.updateState(4, 'SR', e);
    }

    handleHR(e){
        this.updateState(0, 'HR', e);
    }
    handleDevelopmentHR(e){
        this.updateState(1, 'HR', e);
    }
    handleWritingHR(e){
        this.updateState(2, 'HR', e);
    }
    handleITHR(e){
        this.updateState(3, 'HR', e);
    }
    handleFinancesHR(e){
        this.updateState(4, 'HR', e);
    }

    handleOP(e){
        this.updateState(0, 'OP', e);
    }
    handleDevelopmentOP(e){
        this.updateState(1, 'OP', e);
    }
    handleWritingOP(e){
        this.updateState(2, 'OP', e);
    }
    handleITOP(e){
        this.updateState(3, 'OP', e);
    }
    handleFinancesOP(e){
        this.updateState(4, 'OP', e);
    }
    /*event that handles the role change*/
    handleRole(e){
        const selectValue = e.target.value;
        this.setState({
            role: selectValue
        })
    }
    /*this event is used to select a user, the users details then automatically populate the form inputs as they are
    * the admin user can then see where the user has permissions and where to change to*/
    handleSelect(e){
        const userID = e[0];
        const userName = e[1];
        const role = e[2];
        const orgUnits = e[3];
        const divisionsNM = e[4];
        const divisionsSR = e[5];
        const divisionsHR = e[6];
        const divisionsOP = e[7];

        let placeholderNM = ['', '', '', '', ''];
        placeholderNM[0] = (orgUnits.includes('NM') ? 'NM' : '');
        placeholderNM[1] = (divisionsNM.includes('development') ? 'development' : '');
        placeholderNM[2] = (divisionsNM.includes('it') ? 'it' : '');
        placeholderNM[3] = (divisionsNM.includes('writing') ? 'writing' : '');
        placeholderNM[4] = (divisionsNM.includes('finances') ? 'finances' : '');

        let placeholderSR = ['', '', '', '', ''];
        placeholderSR[0] = (orgUnits.includes('SR') ? 'SR' : '');
        placeholderSR[1] = (divisionsSR.includes('development') ? 'development' : '');
        placeholderSR[2] = (divisionsSR.includes('it') ? 'it' : '');
        placeholderSR[3] = (divisionsSR.includes('writing') ? 'writing' : '');
        placeholderSR[4] = (divisionsSR.includes('finances') ? 'finances' : '');

        let placeholderHR = ['', '', '', '', ''];
        placeholderHR[0] = (orgUnits.includes('HR') ? 'HR' : '');
        placeholderHR[1] = (divisionsHR.includes('development') ? 'development' : '');
        placeholderHR[2] = (divisionsHR.includes('it') ? 'it' : '');
        placeholderHR[3] = (divisionsHR.includes('writing') ? 'writing' : '');
        placeholderHR[4] = (divisionsHR.includes('finances') ? 'finances' : '');

        let placeholderOP = ['', '', '', '', ''];
        placeholderOP[0] = (orgUnits.includes('OP') ? 'OP' : '');
        placeholderOP[1] = (divisionsOP.includes('development') ? 'development' : '');
        placeholderOP[2] = (divisionsOP.includes('it') ? 'it' : '');
        placeholderOP[3] = (divisionsOP.includes('writing') ? 'writing' : '');
        placeholderOP[4] = (divisionsOP.includes('finances') ? 'finances' : '');

        this.setState({
            selectedUserID: userID,
            role: role,
            userName: userName,
            stateNM: placeholderNM,
            stateSR: placeholderSR,
            stateHR: placeholderHR,
            stateOP: placeholderOP,
            selectState: true
        })
    }
    /*this event is triggerd when the admin user clicks on the grant access button to make cahnges to a users
    * permissions, the request is sent to the backend to make the cahnges*/
    async handlePermissionsGrant(e){
        e.preventDefault();
        let jsonData;
        const data = {
            userID: this.state.selectedUserID,
            role: this.state.role,
            stateNM: this.state.stateNM,
            stateSR: this.state.stateSR,
            stateHR: this.state.stateHR,
            stateOP: this.state.stateOP,
        }

        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/user/grant/permission', config);
            jsonData = await response.json();
            await this.setState({
                permissionsResponse: jsonData.message,
                selectState: false
            });
            await this.refresh();
        } catch (error){
            console.log(`Could not send permissions update`);
        }
    }

    render() {
        const {data, role, stateNM, stateSR, stateHR, stateOP, selectState, userName, permissionsResponse} = this.state;

        return (
            <div className="user-assign-container">
                <h2>Assign User Permissions</h2>
                { selectState ?
                    <form onSubmit={this.handlePermissionsGrant}>
                        <h3>User: {userName}</h3>
                        <div className='user-assign-role'>
                            <select value={role} onChange={this.handleRole} required>
                                <option value="" disabled hidden>Select Division</option>
                                <option value="normal">Normal</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select><br/><br/>
                        </div>

                        <div className='form-assign-wrapper'>
                            <UserAssignForm
                                orgUnit="NM"
                                handleOU={this.handleNM}
                                handleDevelopment={this.handleDevelopmentNM}
                                handleWriting={this.handleWritingNM}
                                handleIT={this.handleITNM}
                                handleFinances={this.handleFinancesNM}
                                selectedUserData={stateNM}
                            />

                            <UserAssignForm
                                orgUnit="SR"
                                handleOU={this.handleSR}
                                handleDevelopment={this.handleDevelopmentSR}
                                handleWriting={this.handleWritingSR}
                                handleIT={this.handleITSR}
                                handleFinances={this.handleFinancesSR}
                                selectedUserData={stateSR}
                            />

                            <UserAssignForm
                                orgUnit="HR"
                                handleOU={this.handleHR}
                                handleDevelopment={this.handleDevelopmentHR}
                                handleWriting={this.handleWritingHR}
                                handleIT={this.handleITHR}
                                handleFinances={this.handleFinancesHR}
                                selectedUserData={stateHR}
                            />

                            <UserAssignForm
                                orgUnit="OP"
                                handleOU={this.handleOP}
                                handleDevelopment={this.handleDevelopmentOP}
                                handleWriting={this.handleWritingOP}
                                handleIT={this.handleITOP}
                                handleFinances={this.handleFinancesOP}
                                selectedUserData={stateOP}
                            />
                        </div>
                        <div className="user-assign-submit">
                            <button type="submit">Grant</button>
                        </div>
                    </form> :
                    <p>Click on a user to change permissions</p>
                }
                { permissionsResponse.length > 0 ? <p>{permissionsResponse}</p> : null}
                <div className="users-container">
                    <h2>Users</h2>
                    {data.map((user) => (
                        <Users
                            key={user._id}
                            id={user._id}
                            username={user.username}
                            role={user.role}
                            orgUnits={user.orgUnits}
                            divisionsNM={user.divisionsNM}
                            divisionsSR={user.divisionsSR}
                            divisionsHR={user.divisionsHR}
                            divisionsOP={user.divisionsOP}
                            handleSelect={this.handleSelect}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default UserAssign;
