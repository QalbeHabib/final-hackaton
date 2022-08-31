const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');


router.post('/get',userController.get )
router.post('/add', userController.add )
router.delete('/delete/:id', userController.delete )
router.put('/update/:id', userController.update )
router.get('/getById/:id', userController.getById )
router.get('/authenticate',authenticateToken, userController.authenticate )


module.exports = router;
