const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
/*this function is used to verify a request token, if the token is not verified we return a message Access Denied
* if it is however verified we return an object with username, role and a message*/
function verifyToken(token){
    try{
        const decoded = jwt.verify(token, 'rainbowCMrainbow');
        return {username: decoded.username ,role: decoded.role, message: 'Access granted'};
    } catch (err) {
        return {message: 'Access denied'};
    }
}
/*when a user logged in and the credentials are correct for the user, we have to generate a token using JWT sign with
* the HS256 algorithm we then return the token with other related data of that user*/
function createToken(username, role, orgUnits, divisionsNM, divisionsSR, divisionsHR, divisionsOP) {
    let payload = {
        username: username,
        role: role,
        orgUnits: orgUnits,
        divisionsNM: divisionsNM,
        divisionsSR: divisionsSR,
        divisionsHR: divisionsHR,
        divisionsOP: divisionsOP
    }
    const token = jwt.sign(JSON.stringify(payload), 'rainbowCMrainbow',
        {algorithm: 'HS256'})
    return {
        username: username,
        role: role,
        token: token,
        orgUnits: orgUnits,
        divisionsNM: divisionsNM,
        divisionsSR: divisionsSR,
        divisionsHR: divisionsHR,
        divisionsOP: divisionsOP
    }
}
/*New user is a controller that creates a new user to have access to the app, when the user registers as a new user
* the user will be a normal user, but will have access to nothing, as soon as the user is created the admin user
* must allocate the new user permissions and only the admin can*/
exports.newUser = async (req, res) => {
    try {
        /*here we first test if that username is already taken
        * if so we return User already exists*/
        const existingUserTest = await User.findOne({username: req.body.username});
        if (existingUserTest.username === req.body.username) {
            res.send({message: `User already exists`});
        }
    } catch (error) {
        /*when the if in the try catch block tries to access an empty attribute/key value it would automatically throw
        * a catch in this case we know the user does not exist we then proceed to create the new username with password*/
        try {
            const user = new User({
                username: req.body.username,
                password: req.body.password,

            });
            await user.save();
            res.send({message: `Successfully Created User`});
        } catch (error) {
            res.send({message: `Could not add new User: ${error}`});
        }
    }
}
/*User Login controller checks if the user exists in the database and if the password matches, if it does we create a
* token for the login and send user related data back else we respond with incorrect credentials*/
exports.userLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({username: username, password: password});
        const role = user.role;
        const orgUnits = user.orgUnits;
        const divisionsNM = user.divisionsNM;
        const divisionsSR = user.divisionsSR;
        const divisionsHR = user.divisionsHR;
        const divisionsOP = user.divisionsOP;

        const data = createToken(username, role, orgUnits, divisionsNM, divisionsSR, divisionsHR, divisionsOP);
        res.send(data);
    } catch (error) {
        res.status(403).send({message: `Login Credentials Incorrect`});
    }
}
/*get users controller returns the users, so that the admin can change permissions, note we also test if the token is
* correct before doing anything, after token was verified we check if the user role inside the token is admin
* if not we send Access denied since the user is not admin, but if the user is admin we continue to fetch all users
* but we do not return the password we also will not return the admin users data only managers and normal users will be
* returned we dont want the admin to lock out of the system*/
exports.getUsers = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decodedData = verifyToken(token);
        if(decodedData.role === 'admin'){
            const allUsers = await User.find({role: {$ne: 'admin'}}).select('-password');
            res.send(allUsers);
        }
        else{
            res.send({message: 'Access denied'});
        }
    } catch (error) {
        res.send({message: 'Error fetching Users'});
    }
}
/*The update controller receives the user id and all the changed permissions from the front end, if the token is verified
* we update the user by id with all the new permissions*/
exports.updatePermissions = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decodedData = verifyToken(token);

        const id = req.body.userID;
        const role = req.body.role;
        const stateNM = req.body.stateNM;
        const stateSR = req.body.stateSR;
        const stateHR = req.body.stateHR;
        const stateOP = req.body.stateOP;

        const orgUnits = [stateNM[0], stateSR[0], stateHR[0], stateOP[0]];
        const divisionsNM = [stateNM[1], stateNM[2], stateNM[3], stateNM[4]]
        const divisionsSR = [stateSR[1], stateSR[2], stateSR[3], stateSR[4]]
        const divisionsHR = [stateHR[1], stateHR[2], stateHR[3], stateHR[4]]
        const divisionsOP = [stateOP[1], stateOP[2], stateOP[3], stateOP[4]]

        if(decodedData.role === 'admin'){
            await User.findByIdAndUpdate({_id: id},
                {
                    role: role,
                    orgUnits: orgUnits,
                    divisionsNM: divisionsNM,
                    divisionsSR: divisionsSR,
                    divisionsHR: divisionsHR,
                    divisionsOP: divisionsOP,
                });
            res.send({message: 'Permissions Updated'});
        }
        else{
            res.send({message: 'Access denied'});
        }
    } catch (error) {
        res.send({message: 'Error Updating User Permissions'});
    }
}