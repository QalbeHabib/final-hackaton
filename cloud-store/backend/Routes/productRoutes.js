const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const multerMiddleware = require('../middleware/multer');

router.get('/get',productController.get )
router.post('/add',multerMiddleware.single('img'), productController.add )
router.post('/get/:id', productController.getProductById )
router.delete('/delete/:id', productController.delete )



module.exports = router;
