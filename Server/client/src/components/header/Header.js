import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './headerStyles.css';
/*This is the header component the header is generated on all routes after logging in
* the header renders as per the user permissions, if the user is part of Software reviews only a tab with
* software reviews will be rendered, If the user manually types in the route to a different Organizational Unit
* the user will loose access and he/she will have to log in again. The only way to not be logged out is to navigate
* via header, the header uses the React-router-dom Link method, which overrides the normal browser router and react takes
* over the routing thus if a user manually tries to access a route that he/she does not have access to, the state data
* will automatically clear including the token and other user data, resulting in the user needs to log in again.*/
class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLogout=this.handleLogout.bind(this);
    }
    /*if the user wishes to log out he can just click on the logout button which will clear the login data and revert
    * back to login page*/
    handleLogout(){
        this.props.handleLogout();
    }
    render() {
        const {units, username, role} = this.props;
        let NM = false, SR = false, HR = false, OP = false
        if(units.includes('NM')){
            NM = true
        }
        if(units.includes('SR')){
            SR = true
        }
        if(units.includes('HR')){
            HR = true
        }
        if(units.includes('OP')){
            OP = true
        }
        return (
            <div  className="header-container">
                <div className="header-heading">
                    <h1>Credentials Manager</h1>
                    <div className="header-login">
                        <p>Welcome, {username}</p>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="header-menu">
                    <Link to="/"><div>Home</div></Link>
                    {NM ? <Link to="/NM"><div>News Management</div></Link> : null}
                    {SR ? <Link to="/SR"><div>Software Reviews</div></Link> : null}
                    {HR ? <Link to="/HR"><div>Hardware Reviews</div></Link> : null}
                    {OP ? <Link to="/OP"><div>Opinion Publishing</div></Link> : null}
                    {role === 'admin' ? <Link to="/admin"><div>Assign Users</div></Link> : null}
                </div>
            </div>
        );
    }
}

export default Header;