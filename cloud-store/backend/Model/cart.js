const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = Schema({
    userId:         { type: String},
    userEmail:      { type: String},
    productId:      { type: String},
    productName:    { type: String},
    productImage:   { type: String},
    productPrice:   { type: Number},
    productQty:     { type: Number},
},{
    // use another collection name
    collection: 'cart'
});

/* global db */
module.exports = db.model('cart', cartSchema);