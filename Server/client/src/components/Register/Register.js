import React, {Component} from 'react';
import './registerStyles.css';
/*this component is very similar to the login and simply asks for a username and a pasword. the password needs to be
* confirmed twice and then the new user can click on register, if the user already exists the backend will let the new
* user know the username is not up for grabs, and can try again with a different username. the registered user
* is registered as a normal user and does not have access to anything until the admin user assigns permissions*/
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister=this.handleRegister.bind(this);
        this.handleRegisterUsername=this.handleRegisterUsername.bind(this);
        this.handleRegisterPassword=this.handleRegisterPassword.bind(this);
        this.handleRegisterPasswordConfirmation=this.handleRegisterPasswordConfirmation.bind(this);
    }

    handleRegisterUsername(e){
        this.props.handleRegisterUsername(e.target.value);
    }
    handleRegisterPassword(e){
        this.props.handleRegisterPassword(e.target.value);
    }
    handleRegisterPasswordConfirmation(e){
        this.props.handleRegisterPasswordConfirmation(e.target.value);
    }

    handleRegister(e){
        e.preventDefault();
        this.props.handleRegister()
    }

    render() {
        const {registerUsername, registerPassword, registerPasswordConfirm, registerResponse} = this.props;
        return (
            <div className="login-container">
                <h1>Credentials Management</h1>
                <div className="login-wrapper">
                    <h1>Register</h1>
                    <form onSubmit={this.handleRegister} className="login-form">
                        <input value={registerUsername}
                               onChange={this.handleRegisterUsername}
                               placeholder="Enter a Username"
                               type='text'
                               minLength={2}
                               required
                               autoFocus
                        /> <br/>
                        <input value={registerPassword}
                               onChange={this.handleRegisterPassword}
                               placeholder="Enter a password"
                               type='password'
                               minLength={8}
                               required
                               autoFocus
                        /> <br/>
                        <input value={registerPasswordConfirm}
                               onChange={this.handleRegisterPasswordConfirmation}
                               placeholder="Confirm password"
                               type="password"
                               minLength={8}
                               required
                        /> <br/>
                        {registerPassword ===  registerPasswordConfirm ?
                            <button type='submit' className='button-style1'>Register</button>
                            :
                            <p>Passwords do not match</p>
                        }
                        <br/>
                        {registerResponse.length > 0 ? <p>{registerResponse}</p> : null}
                        <p>Have a Login? Login here <a href="/">Login</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;