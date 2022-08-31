const express = require('express');
const router = express.Router();
const reviewController = require('../Controller/reviewController');



router.get('/get',reviewController.get )
router.post('/add', reviewController.add )



module.exports = router;
