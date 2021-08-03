const Div = require('../models/division.model');
const jwt = require('jsonwebtoken');
/*this function is used to verify a request token, if the token is not verified we return a message Access Denied
* if it is however verified we return an object with role and a message*/
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return {role: decoded.role, message: 'Access granted'};
    } catch (err) {
        return {message: 'Access denied'};
    }
}
/*function to check and not add duplicate usernames to the same org unit and division
* if wrong user can simply just try adding with different name*/
async function checkDuplicates(orgUnit, divName, username) {
    const placeholder = await Div.find({orgUnit: orgUnit, divName: divName});
    let list = placeholder[0].repoList;
    for (let i = 0; i < list.length; i++) {
        if (list[i].username === username) {
            return true;
        }
    }
    return false;
}
/*in this controller we add credentials to the given org unit and division after verification of token is correct
* then we check for duplicates or if the user already exists there after we add the new credentials
* the new credentials are merely just pushed onto the end of the selected org unit and divisions Repolist*/
exports.addCredentials = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        let verifyResponse = verifyToken(token);
        if (verifyResponse.message === 'Access denied') {
            res.send(verifyResponse);
        } else {
            const username = req.body.username;
            const password = req.body.password;
            const resource = req.body.resource;
            const orgUnit = req.body.orgUnit;
            const divName = req.body.divName;

            let duplicateState = await checkDuplicates(orgUnit, divName, username);

            if (duplicateState) {
                res.send({message: `Could not add Credentials to Database, Credentials already exist`});
            } else {
                let constructCredential = {
                    resource: resource,
                    username: username,
                    password: password
                }

                const placeholder = await Div.find({orgUnit: orgUnit, divName: divName});
                const credentialRepoID = placeholder[0]._id;
                const list = placeholder[0].repoList;
                list.push(constructCredential);

                await Div.findByIdAndUpdate({_id: credentialRepoID}, {repoList: list});

                res.send({message: `Added new Credentials to ${divName.toUpperCase()}`});
            }
        }
    } catch (error) {
        res.send({message: `Could not add Credentials to Database`});
    }
}
/*Update credentials works similar to the add credentials but does not check for duplicates or if the user exists
* in the front end you are forced to select a users credentials before updating so we know the user exists since the
* list is given in the front end of all the credentials the user for the app has access to
* after that we simply find the credentials ID and update the repolist for that credential
* the for loop just replaces the old data with the new data*/
exports.updateCredentials = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        let verifyResponse = verifyToken(token);

        if (verifyResponse.message === 'Access denied') {
            res.send(verifyResponse);
        } else if (verifyResponse.role === 'management' || verifyResponse.role === 'admin') {
            const credentialsToUpdate = req.body.credentialsToUpdate;
            const updatedCredentials = req.body.updatedCredentials;
            const divName = credentialsToUpdate.divName;
            const orgUnit = req.body.orgUnit;

            const placeholder = await Div.find({orgUnit: orgUnit, divName: divName});
            const credentialRepoID = placeholder[0]._id;
            const list = placeholder[0].repoList;
            for (let i = 0; i < list.length; i++) {
                if (list[i].username === credentialsToUpdate.username) {
                    list[i].resource = updatedCredentials.resource;
                    list[i].username = updatedCredentials.username;
                    list[i].password = updatedCredentials.password;
                    break;
                }
            }
            await Div.findByIdAndUpdate({_id: credentialRepoID}, {repoList: list});

            res.send({message: `Updated Credentials in ${divName.toUpperCase()}`});
        } else {
            res.send({message: 'Access denied'});
        }
    } catch (error) {
        res.send({message: `Could not Update Credentials in Database`});
    }
}

