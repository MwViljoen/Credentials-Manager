import React, {Component} from 'react';
import './loginStyles.css';

class Login extends Component {
    constructor(props) {
        super(props);
        /*binding event handlers*/
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    /*Lifting events up to parent element*/
    handleUsername(e) {
        this.props.handleUsername(e.target.value);
    }
    handlePassword(e) {
        this.props.handlePassword(e.target.value);
    }
    /*this is the login event that triggers the login in the parent
    * prevent default prevents normal html form submit*/
    handleLogin(e) {
        e.preventDefault();
        this.props.handleLogin();
    }
    /*For the login we have 2 inputs and a login button, we expect a username and password to be entered which is then
    * saved in the parents state and used when the user clicks on Login, if the login details are incorrect the backend
    * will send a message this massage is then displayed on the login page, if correct the landing home page will be
    * rendered if the user does not have login credentials the user can click on the register link which takes the new
    * user to the register page/ renders the register component*/
    render() {
        const {username, password, falseLogin} = this.props;
        return (
            <div className="login-container">
                <h1>Credentials Management</h1>
                <div className="login-wrapper">
                    <h1>Login</h1>
                    <form onSubmit={this.handleLogin} className="login-form">
                        <input value={username}
                               onChange={this.handleUsername}
                               placeholder="Username"
                               type='text'
                               minLength={2}
                               required
                               autoFocus
                        /> <br/>
                        <input value={password}
                               onChange={this.handlePassword}
                               placeholder="Password"
                               type="password"
                               minLength={8}
                               required
                        /> <br/>
                        <button type='submit' className='button-style1'>Login</button>
                        <br/>
                        <p>{falseLogin.length > 1 ? falseLogin : null}</p>
                        <p>Register here if you have no credentials <a href="/register">Register</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;