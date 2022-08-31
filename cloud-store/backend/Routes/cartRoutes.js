const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');

router.get('/get/:id',cartController.get )
router.post('/add', cartController.add )
router.put('/new', cartController.new )
router.put('/updateqty', cartController.updateqty )
router.put('/newproduct', cartController.newproduct )
router.put('/delete/:id', cartController.delete )
router.put('/update/:id', cartController.update )



module.exports = router;
