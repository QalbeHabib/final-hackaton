const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user'},
	user1: { type: Schema.Types.ObjectId, ref: 'user'},
	products: [{
		product: { type: Schema.Types.ObjectId, ref: 'product'},
        qty: { type: Number, default: 1},
	}]
});

/* global db */
module.exports = db.model('cart', cartSchema);