const mongoose = require('mongoose');

const divisionSchema = mongoose.Schema({
    orgUnit:{
        /*NM, SR, HR, OP   only one*/
        type: String,
        required: true
    },
    divName: {
        /*finances, IT, writing, development      only one*/
        type: String,
        required: true
    },
    repoList: {
        type: Array,
        default: []  /*[{resource: "www.google.com", username: 'frikkie', password: '1234'},
            {resource: "www.sage123.com", username: 'admin', password: 'abcdef'}]*/
    }
});

module.exports = mongoose.model('divisions', divisionSchema);