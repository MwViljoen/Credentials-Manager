import React, {Component} from 'react';
import './loggedInLandingStyles.css';
import OrgUnit from "./OrgUnit/OrgUnit";
/*This component is the landing route '/' component it is also the home page of the user.This component renders
* after a user logged in and here we can see all the permissions the user has, if none the user needs to notify
* admin to give permissions. We welcome the user with some information regarding the app. Along with all the rest
* of the components a header renders this header is used to navigate to different Organization Units that a admin
* grants access to. From there we use the .map method to render multiple OrgUnit Components the max is 4 which is
* one for each Org Unit (OU). Inside each OU Component we use shorthand if else statements that passess down the
* correct divisions for that specific OU that was allocated, if the user has access to News Management(NM) and in that
* NM he/she has access to IT and Writing, we know we need to pass down the NM divisions and not the wrong divisions of
* another OU the units contain all the OUs of the logged in user to which it has access to and the other props
* are specific arrays that relate to those OUs*/
class LoggedInLanding extends Component {
    render() {
        const {units, username, role, divisionsNM, divisionsHR, divisionsOP, divisionsSR} = this.props;
        return (
            <div className="landing-container">
                <div className="landing-information">
                    <h2>Welcome {username} <br/> you are a {role.toUpperCase()} user</h2>
                    <p>
                        Navigate with header menu according to permissions,
                        if you do not have permissions contact admin to assign
                    </p>
                </div>
                <h2>You Have Access to</h2>
                <div className="landing-wrapper">
                    {units.map((unit, i) => (
                        <OrgUnit
                            key={i}
                            unit={unit}
                            division={unit === 'NM' ? divisionsNM
                                    : unit === 'HR' ? divisionsHR
                                        : unit === 'OP' ? divisionsOP
                                            : unit === 'SR' ? divisionsSR : ['', '', '', '']
                            }
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default LoggedInLanding;