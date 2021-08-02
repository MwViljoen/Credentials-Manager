import React, {Component} from 'react';
import './credentialsStyles.css';
/*this is the component that renders the credentials each credential has the select on click event, upon this event
* the data of the specific credentials are sent to the parent, this data is used as a clone and sent to the forms
* to auto fill the form, only after the select is the user able to update the credentials*/
class Credentials extends Component {
    constructor(props) {
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
    }

    handleSelect(){
        const {credentials, divName} = this.props;
        let data = {
            resource: credentials.resource,
            username: credentials.username,
            password: credentials.password,
            divName: divName
        }
        this.props.handleSelect(data);
    }


    render() {
        const {credentials} = this.props;
        return (
            <div className="credentials-container" onClick={this.handleSelect}>
                <p className="credentials-wrapper">
                    Username: {credentials.username} <br/>
                    Password: {credentials.password} <br/>
                    Resource: {credentials.resource} <br/>
                </p>
            </div>
        );
    }
}

export default Credentials;