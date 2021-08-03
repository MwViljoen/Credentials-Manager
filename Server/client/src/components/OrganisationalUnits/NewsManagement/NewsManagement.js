import React, {Component} from 'react';
import './nmStyles.css';
import Division from "../Division/Division";
import AddCredentials from "../AddCredentials/AddCredentials";
import UpdateCredentials from "../UpdateCredentials/UpdateCredentials";
/*This component consists of a few other components, the main purpose is to render all related data to the News
* Management OU. There are 4 Components that are copies of one another where mere variables change one for each
* OU. */
class NewsManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectState: false,
            selectedCredentials: [],
            updatedCredentials: [],
            addCredentials: ['','','',''],
            addResponse: [],
            updateResponse:[]
        }
        /*here we bind all event handlers*/
        this.handleSelect=this.handleSelect.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleResourceChange=this.handleResourceChange.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);

        this.handleUsername=this.handleUsername.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleDivision=this.handleDivision.bind(this);
        this.handleResource=this.handleResource.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
    }
    /*the refresh async event is called where we want to update/fetch the data related to this specific component
    * */
    async refresh(){
        let jsonData;
        /*we first construct the body with all the data we want to send with the request to fetch the
        * data we want in this case we send the Organization Unit and the divisions we want inside of that division*/
        const data = {
            orgUnit: 'NM',
            divisionsNM: this.props.divisionsNM
        }
        /*We then generate the headers for the request, in this case we make it a Post Method and we expect Json data
        * along with the header we send the token received when logging in which the backend needs to verify upon all
        * requests related to credentials and users, we then stringify the data to json format before making the
        * fetch request*/
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify(data)
        }
        /*in this try catch we reach out to the backend with a specific route and config details/data in body
        * we wait for the fetch request, if the request is successful we store the data received in state
        * else if not successful the try catch will log the error*/
        try{
            const response = await fetch('/get/credentials', config);
            jsonData = await response.json();
            await this.setState({
                data: jsonData
            });
        } catch (error){
            console.log(`Could not fetch data related to News Management and Divisions`);
        }
    }
    /*when compoennt did mount to DOM we simply call the refresh event that fetches all data we want*/
    async componentDidMount() {
        await this.refresh();
    }
    /*these event handlers are used to update credentials for a selected credential in this OU.
    *
    * before we can update credentials, the user needs to select the credentials received from the back end,
    *  in the rendered front end upon the select/click the selected credentials component lifts the data up to
    * the parent in this case to here and the data is stored in state. NOTICE in handleSelect event we make a clone
    * of the data Object sent from the parent we store both the original data location and the clone of that data
    * Objects are pointed to and not stored as a variable, thus we need to make a clone. after the clone is made
    * any changes made to the data is changed in the clone while the original object is unchanged since we need to send
    * both the original and changed data to the backend to make the changes, we also have a selected state, this state
    * tells us when the user selected a credential to update or not, a update button renders accordingly only if the
    * user selected a credential from a division*/

    /*here we autofill the form according to the select, it also shows the changes to the user as they are made and
    * stored in the clones state*/
    handleUsernameChange(e){
        /*updates the clone data that was passed down to the form to autofill the form*/
        let placeholder = this.state.updatedCredentials
        placeholder.username = e;
        this.setState({
            updatedCredentials: placeholder
        });
    }
    handlePasswordChange(e){
        let placeholder = this.state.updatedCredentials
        placeholder.password = e;
        this.setState({
            updatedCredentials: placeholder
        });
    }
    handleResourceChange(e){
        let placeholder = this.state.updatedCredentials
        placeholder.resource = e;
        this.setState({
            updatedCredentials: placeholder
        });
    }
    handleSelect(e){
        /*https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/*/
        const ObjectClone = Object.assign({},e);
        this.setState({
            selectedCredentials: e,
            updatedCredentials: ObjectClone,
            selectState: true
        });
    }
    /*the handle update event triggers when the user successfully selected credentials to update, we then send the
    * original credentials and the updated credentials to the backend to make the changes, after the update was
    * successful we set the selected state to false which means that if the user whats to change credentials the
    * user needs to select the credentials it needs to update/change*/
    async handleUpdate(){
        let jsonData;
        let data = {
            credentialsToUpdate: this.state.selectedCredentials,
            updatedCredentials: this.state.updatedCredentials,
            orgUnit: 'NM'
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
            const response = await fetch('/credentials/update', config);
            jsonData = await response.json();
            await this.setState({
                updateResponse: jsonData.message,
                selectedCredentials: [],
                updatedCredentials: [],
                selectState: false
            });
        } catch (error){
            console.log(`Could not update credentials`);
        }
        await this.refresh();
    }
    /*handle username is similar to update and simply adds a new credential to a division for the specific OU*/
    handleUsername(e){
        let placeholder = this.state.addCredentials;
        placeholder[0] = e
        this.setState({
            addCredentials: placeholder
        });
    }
    handlePassword(e){
        let placeholder = this.state.addCredentials;
        placeholder[1] = e
        this.setState({
            addCredentials: placeholder
        });
    }
    handleResource(e){
        let placeholder = this.state.addCredentials;
        placeholder[2] = e
        this.setState({
            addCredentials: placeholder
        });
    }
    handleDivision(e){
        let placeholder = this.state.addCredentials;
        placeholder[3] = e
        this.setState({
            addCredentials: placeholder
        });
    }
    /*only difference here is the PATCH Method*/
    async handleAdd(){
        let jsonData;
        let data = {
            username: this.state.addCredentials[0],
            password: this.state.addCredentials[1],
            resource: this.state.addCredentials[2],
            divName: this.state.addCredentials[3],
            orgUnit: 'NM'
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
            const response = await fetch('/credentials/add', config);
            jsonData = await response.json();
            await this.setState({
                addResponse: jsonData.message,
                addCredentials: ['','','','']
            });
        } catch (error){
            console.log(`Could not add credentials`);
        }
        await this.refresh();
    }

    render() {
        const {role} = this.props;
        const {data, addCredentials, updatedCredentials, addResponse, selectState, updateResponse} = this.state;

        let divisions = [];
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                divisions.push(data[i].divName);
            }
        }
        /* We render a Header for the OU and we render forms depending on the user role, Add credentials adds credentials
        * according to the selected division the backend then adds the credential to the DB
        *
        * UpdateCredentials handles the Update functionality
        *
        * below the forms we generate the Credentials accordingly*/
        return (
            <div className="ou-container">
                <h2>News Management</h2>
                <div className="ou-modification-container">
                    <AddCredentials
                        handleUsername={this.handleUsername}
                        handlePassword={this.handlePassword}
                        handleDivision={this.handleDivision}
                        handleResource={this.handleResource}
                        handleAdd={this.handleAdd}
                        addCredentials={addCredentials}
                        addResponse={addResponse}
                        divisionsAccess={divisions}
                    />
                    {role === 'admin' || role === 'manager' ?
                        <UpdateCredentials
                            handleUsernameChange={this.handleUsernameChange}
                            handlePasswordChange={this.handlePasswordChange}
                            handleResourceChange={this.handleResourceChange}
                            handleUpdate={this.handleUpdate}
                            updatedCredentials={updatedCredentials}
                            updateResponse={updateResponse}
                            selectState={selectState}
                            divisionsAccess={divisions}
                        /> : null
                    }
                </div>
                <h2>Credentials</h2>
                <div className="ou-wrapper">
                    {data.map((division, i) => (
                        <Division
                            key={i + 200}
                            divName={division.divName}
                            repoList={division.repoList}
                            handleSelect={this.handleSelect}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default NewsManagement;