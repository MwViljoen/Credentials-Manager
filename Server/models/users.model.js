const mongoose = require('mongoose');
/*
* role: "admin" or "manager" or "normal" only 3 roles default role is normal upon registering, a higher role can change
* roles
*
* orgUnit : ["NM" , "SR" , "HR", "OP"] order does not matter just states where user belongs to, when registering has to
* pick 1. later higher roles can add OUs and divisions if more than one
*
* divisions: ["development","writing","it","finances"]
* */
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "normal"
    },
    orgUnits: {
        type: Array,
        default: []
    },
    divisionsNM: {
        type: Array,
        default: []
    },
    divisionsSR: {
        type: Array,
        default: []
    },
    divisionsHR: {
        type: Array,
        default: []
    },
    divisionsOP: {
        type: Array,
        default: []
        /*finances, IT, writing, development*/
    }
});

module.exports = mongoose.model('Users', userSchema);
