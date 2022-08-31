const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = Schema({
    name:          { type: String},
    email:         { type: String},
    description:   { type: String},

});

/* global db */
module.exports = db.model('review', reviewSchema);