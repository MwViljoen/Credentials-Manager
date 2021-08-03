import React, {Component} from 'react';
import "./orgUnitStyles.css";
/* this component simpy renders the information given. here we render the permissions of a logged in user on the home
* page */
class OrgUnit extends Component {
    render() {
        const {unit, division} = this.props;
        let unitFull = 'None';
        /*this if else changes the abbreviation to the full name*/
        if(unit === 'NM'){
            unitFull = 'News Management'
        }
        if(unit === 'SR'){
            unitFull = 'Software Reviews'
        }
        if(unit === 'HR'){
            unitFull = 'Hardware Reviews'
        }
        if(unit === 'OP'){
            unitFull = 'Opinion Publishing'
        }
        /*the shorthand if else statements check the divisions array indexes max of four and if empty we do not render
        * that specific array index, we can not use the .map to simplyfy the code since the array is structured
        * of empty strings, thus we do not wish to have empty list items on our page ( the dot remains but no value) */
        if(unitFull !== 'None'){
            return (
                <div className="orgunit-container">
                    <h2>{unitFull}</h2>
                    <h3>Divisions:</h3>
                    <ul>
                        {division[0].length > 0 ? <li>{division[0].toUpperCase()}</li> : null}
                        {division[1].length > 0 ? <li>{division[1].toUpperCase()}</li> : null}
                        {division[2].length > 0 ? <li>{division[2].toUpperCase()}</li> : null}
                        {division[3].length > 0 ? <li>{division[3].toUpperCase()}</li> : null}
                    </ul>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default OrgUnit;