const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    name:          { type: String},
    price:         { type: Number},
    qty:           { type: Number},
    category:      { type: String},
    description:   { type: String},
    img:           { type: String},

});

/* global db */
module.exports = db.model('product', productSchema);