const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    name:                       { type: String ,require:true},
    phone:                      { type: Number ,require:true},
    email:                      { type: String ,require:true},
    password:                   { type: String ,require:true},
    confirmPassword:            { type: String ,require:true},
    role:                       { type: String ,require:true},
    profileImage:               { type: String },


});

/* global db */
module.exports = db.model('user', userSchema);