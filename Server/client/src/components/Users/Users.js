import React, {Component} from 'react';
import './usersStyles.css';
/*THis component renders each users permissions and is rendered for the admin user to see*/
class Users extends Component {
    constructor(props) {
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
    }

    handleSelect(e){
        e.preventDefault();
        const {id, username, role, orgUnits, divisionsNM, divisionsSR, divisionsHR, divisionsOP} = this.props;

        let data = [id, username, role, orgUnits, divisionsNM, divisionsSR, divisionsHR, divisionsOP]

        this.props.handleSelect(data);
    }

    render() {
        const {username, role, orgUnits, divisionsNM, divisionsSR, divisionsHR, divisionsOP} = this.props;
        let dataComponentNM = null, dataComponentSR = null, dataComponentHR = null, dataComponentOP = null;
        if(orgUnits.includes('NM')){
            dataComponentNM =
                <div>
                    <h4>News Management Permissions:</h4>
                    <ul>
                        {divisionsNM[0].length > 0 ? <li>{divisionsNM[0].toUpperCase()}</li> : null}
                        {divisionsNM[1].length > 0 ? <li>{divisionsNM[1].toUpperCase()}</li> : null}
                        {divisionsNM[2].length > 0 ? <li>{divisionsNM[2].toUpperCase()}</li> : null}
                        {divisionsNM[3].length > 0 ? <li>{divisionsNM[3].toUpperCase()}</li> : null}
                    </ul>
                </div>
        }
        if(orgUnits.includes('SR')){
            dataComponentSR =
                <div>
                    <h4>Software Reviews Permissions:</h4>
                    <ul>
                        {divisionsSR[0].length > 0 ? <li>{divisionsSR[0].toUpperCase()}</li> : null}
                        {divisionsSR[1].length > 0 ? <li>{divisionsSR[1].toUpperCase()}</li> : null}
                        {divisionsSR[2].length > 0 ? <li>{divisionsSR[2].toUpperCase()}</li> : null}
                        {divisionsSR[3].length > 0 ? <li>{divisionsSR[3].toUpperCase()}</li> : null}
                    </ul>
                </div>
        }
        if(orgUnits.includes('HR')){
            dataComponentHR =
                <div>
                    <h4>Hardware Reviews Permissions:</h4>
                    <ul>
                        {divisionsHR[0].length > 0 ? <li>{divisionsHR[0].toUpperCase()}</li> : null}
                        {divisionsHR[1].length > 0 ? <li>{divisionsHR[1].toUpperCase()}</li> : null}
                        {divisionsHR[2].length > 0 ? <li>{divisionsHR[2].toUpperCase()}</li> : null}
                        {divisionsHR[3].length > 0 ? <li>{divisionsHR[3].toUpperCase()}</li> : null}
                    </ul>
                </div>
        }
        if(orgUnits.includes('OP')){
            dataComponentOP =
                <div>
                    <h4>Opinion Publishing Permissions:</h4>
                    <ul>
                        {divisionsOP[0].length > 0 ? <li>{divisionsOP[0].toUpperCase()}</li> : null}
                        {divisionsOP[1].length > 0 ? <li>{divisionsOP[1].toUpperCase()}</li> : null}
                        {divisionsOP[2].length > 0 ? <li>{divisionsOP[2].toUpperCase()}</li> : null}
                        {divisionsOP[3].length > 0 ? <li>{divisionsOP[3].toUpperCase()}</li> : null}
                    </ul>
                </div>
        }

        return (
            <div className="user-Container" onClick={this.handleSelect}>
                <h4>
                    {username} <br/>
                    {role} <br/>
                </h4>
                <div className='user-organizations-container'>
                    {dataComponentNM}
                    {dataComponentSR}
                    {dataComponentHR}
                    {dataComponentOP}
                </div>
            </div>
        );
    }
}

export default Users;