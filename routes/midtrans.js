const express = require('express');
const MidtransController = require('../controllers/midtransController');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.post('/pub/midtrans-get-token', authentication, MidtransController.getToken)

module.exports = router