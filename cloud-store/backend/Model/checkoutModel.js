const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkoutSchema = Schema({
    userId:                     { type: String },
    cars:                       [{type: Schema.Types.ObjectId,ref:"Product" }],
    email:                      { type: String },
    nameOnCard:                 { type: String },
    cardNumber:                 { type: String },
    expirationDate:             { type: String },
    cvc:                        { type: Number },
    address:                    { type: String },
    city:                       { type: String },
    state:                      { type: String },
    zip:                        { type: Number },


});

/* global db */
module.exports = db.model('checkout', checkoutSchema);