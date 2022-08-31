const express = require('express');
const router = express.Router();
const stripeController = require('../Controller/stripeController');



router.post('/create-checkout-session', stripeController.add )



module.exports = router;
