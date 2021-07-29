import './App.css';
import Login from "./components/Login/Login";
import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from "./components/Register/Register";
import Header from "./components/header/Header";
import LoggedInLanding from "./components/OrganisationalUnits/LoggedInLanding/LoggedInLanding";
import NewsManagement from "./components/OrganisationalUnits/NewsManagement/NewsManagement";
import SoftwareReviews from "./components/OrganisationalUnits/SoftwareReviews/SoftwareReviews";
import HardwareReviews from "./components/OrganisationalUnits/HardwareReviews/HardwareReviews";
import OpinionPublishing from "./components/OrganisationalUnits/Opinion Publishing/OpinionPublishing";
import UserAssign from "./components/UserAssign/UserAssign";
/*App.js is the main JS where everything is called from*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            data: [],
            falseLogin: '',

            registerUsername: '',
            registerPassword: '',
            registerPasswordConfirm: '',
            registerResponse: ''
        }
        /**/
        /*Binding event handlers for the login component*/
        this.handleUsername=this.handleUsername.bind(this);
        this.handlePassword=this.handlePassword.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        /*Binding event handlers for the register component*/
        this.handleRegisterUsername=this.handleRegisterUsername.bind(this);
        this.handleRegisterPassword=this.handleRegisterPassword.bind(this);
        this.handleRegisterPasswordConfirmation=this.handleRegisterPasswordConfirmation.bind(this);
        this.handleRegister=this.handleRegister.bind(this);

        this.handleLogout=this.handleLogout.bind(this);
    }
    /* Grouped together the Login event handlers
    * The login event handlers are lifted to the parent App.js and are handled here
    * username is simply the form input for the username as is the password and is stored in state on change
    * they are then passed down as props to the login component to display the input to the user
    *
    * after the user inputted the needed data to log in the handleLogin event is triggered by a submit button in the
    * form and lifted to the parent App.js handler, this handler sends a request with the login details to the backend
    * the backend checks if the user exists and if the password matches, if this is the case the front end will
    * receive a token and other data related to that user and is stored in state, at the same time we set a state
    * that says we are logged in and clear the username and password field, this state is then later used to render
    * other components that only logged in users can see*/
    handleUsername(e){
        this.setState({
            username: e
        })
    }
    handlePassword(e){
        this.setState({
            password: e
        })
    }
    async handleLogin(){
        let jsonData;
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try{
            const response = await fetch('/user/login', config);
            jsonData = await response.json();
            if(response.ok){
                await this.setState({
                    data: jsonData,
                    loggedIn: true,
                    falseLogin: '',
                    username: '',
                    password: ''
                });
            }
            else{
                this.setState({
                    falseLogin: jsonData.message
                });
            }
        } catch (error){
            console.log(`Login Error`);
        }
    }
    /*Register event handlers work similar to the login but here we except a username and to type in the password
    * twice to confirm it is correct, on the Register button click a event handler in the parent sends a
    * request to the backend to add the user. The backend tests if the user already exists with that username,
    * if not then the user is created with a normal role and no permissions and a message is displayed that the
    * user is created, the registered user can then log in but has no access to anything except the home page which
    * says to ask the admin to grant specific access*/
    handleRegisterUsername(e){
        this.setState({
            registerUsername: e
        })
    }
    handleRegisterPassword(e){
        this.setState({
            registerPassword: e
        })
    }
    handleRegisterPasswordConfirmation(e){
        this.setState({
            registerPasswordConfirm: e
        })
    }
    async handleRegister(){
        let jsonData;
        const data = {
            username: this.state.registerUsername,
            password: this.state.registerPasswordConfirm
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try{
            const response = await fetch('/user/register', config);
            jsonData = await response.json();
            await this.setState({
                registerResponse: jsonData.message
            });
        } catch (error){
            console.log(`Register Error`);
        }
    }
    /*The logout simply clears logged in state and other related data such as the token and then we redirect the login
    * page*/
    handleLogout(){
        this.setState({
            loggedIn: false,
            data: [],
        })
        window.location.assign('/');
    }

    render() {
        const {username, password, loggedIn, falseLogin, registerUsername,
            registerPassword, registerPasswordConfirm, data, registerResponse} = this.state;
        /*declaring a variable to construct a component according to a state*/
        let notLoggedIn = null;
        /*This was a piece of experimental code to test a few things, and what i can do to write the code better in
        * the future projects. If the logged in state is not true we will enter another if else
        * this if else returns a component according to the pathname in the URL
        * if path is simply '/' we know it is log in page and if not we know it is register component */
        if(!loggedIn){
            if(window.location.pathname === '/'){
                notLoggedIn = (
                    <Route
                    path="/"
                    exact
                    render={() =>
                        <Login
                            handleUsername={this.handleUsername}
                            handlePassword={this.handlePassword}
                            handleLogin={this.handleLogin}
                            username={username}
                            password={password}
                            falseLogin={falseLogin}
                        />
                    }
                />
                )
            } else {
                notLoggedIn = (
                    <Route
                    path="/register"
                    exact
                    render={() =>
                        <Register
                            handleRegisterUsername={this.handleRegisterUsername}
                            handleRegisterPassword={this.handleRegisterPassword}
                            handleRegisterPasswordConfirmation={this.handleRegisterPasswordConfirmation}
                            handleRegister={this.handleRegister}
                            registerUsername={registerUsername}
                            registerPassword={registerPassword}
                            registerPasswordConfirm={registerPasswordConfirm}
                            registerResponse={registerResponse}
                        />
                    }
                    />
                )
            }
        }
        /*we use the react browser router here we can se the notLoggedIn component is called to be rendered
        * simply put if this was a bigger project with more components the notLoggedIn component will have to be made a
        * component in the component folder and not in code as above
        *
        * if the user is logged in we render the other pages according to the routes
        * in this case if we are logged in we will make a route for LoggedInLanding component as well as for
        * the other Organizational Units such as News Management (NM), the extra Route for admins only called userAssign
        * will only render if the logged in user is admin, each route renders a component accordingly with props and
        * event handlers*/
        return (
            <BrowserRouter>
                {notLoggedIn}
                {loggedIn ?
                    <Header
                        units={data.orgUnits}
                        role={data.role}
                        username={data.username}
                        handleLogout={this.handleLogout}
                    /> : null
                }
                {loggedIn ?
                    <Route
                        path="/"
                        exact={true}
                        render={() =>
                            <LoggedInLanding
                                units={data.orgUnits}
                                username={data.username}
                                divisionsNM={data.divisionsNM}
                                divisionsSR={data.divisionsSR}
                                divisionsHR={data.divisionsHR}
                                divisionsOP={data.divisionsOP}
                                role={data.role}
                            />
                        }
                    /> : null
                }
                {loggedIn ?
                    <Route
                        path="/NM"
                        exact={true}
                        render={() =>
                            <NewsManagement
                                role={data.role}
                                divisionsNM={data.divisionsNM}
                                token={data.token}
                            />
                        }
                    /> : null
                }
                {loggedIn ?
                    <Route
                        path="/SR"
                        exact={true}
                        render={() =>
                            <SoftwareReviews
                                role={data.role}
                                divisionsSR={data.divisionsSR}
                                token={data.token}
                            />
                        }
                    /> : null
                }
                {loggedIn ?
                    <Route
                        path="/HR"
                        exact={true}
                        render={() =>
                            <HardwareReviews
                                role={data.role}
                                divisionsHR={data.divisionsHR}
                                token={data.token}
                            />
                        }
                    /> : null
                }
                {loggedIn ?
                    <Route
                        path="/OP"
                        exact={true}
                        render={() =>
                            <OpinionPublishing
                                role={data.role}
                                divisionsOP={data.divisionsOP}
                                token={data.token}
                            />
                        }
                    /> : null
                }
                {loggedIn && data.role === 'admin' ?
                    <Route
                        path="/admin"
                        exact={true}
                        render={() =>
                            <UserAssign
                                token={data.token}
                            />
                        }
                    /> : null
                }
            </BrowserRouter>
        );
    }
}

export default App;
