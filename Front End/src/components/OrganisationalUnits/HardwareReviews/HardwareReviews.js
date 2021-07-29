import React, {Component} from 'react';
import './hrStyles.css';
import AddCredentials from "../AddCredentials/AddCredentials";
import UpdateCredentials from "../UpdateCredentials/UpdateCredentials";
import Division from "../Division/Division";
/*This Component is a copy of the News management, which is thoroughly commented on for more details*/
class HardwareReviews extends Component {
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

    async refresh(){
        let jsonData;
        const data = {
            orgUnit: 'HR',
            divisionsHR: this.props.divisionsHR
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/get/credentials', config);
            jsonData = await response.json();
            await this.setState({
                data: jsonData
            });
        } catch (error){
            console.log(`Could not fetch data related to Hardware Reviews and Divisions`);
        }
    }
    async componentDidMount() {
        await this.refresh();
    }

    handleUsernameChange(e){
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
    async handleUpdate(){
        let jsonData;
        let data = {
            credentialsToUpdate: this.state.selectedCredentials,
            updatedCredentials: this.state.updatedCredentials,
            orgUnit: 'HR'
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
    async handleAdd(){
        let jsonData;
        let data = {
            username: this.state.addCredentials[0],
            password: this.state.addCredentials[1],
            resource: this.state.addCredentials[2],
            divName: this.state.addCredentials[3],
            orgUnit: 'HR'
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

        return (
            <div className="ou-container">
                <h2>Hardware Reviews</h2>
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
                            key={i + 300}
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

export default HardwareReviews;