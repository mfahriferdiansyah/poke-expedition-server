var express = require('express');
const UserController = require('../controllers/userController');
var router = express.Router();

router.post('/pub/login', UserController.login);
router.post('/pub/register', UserController.register);
 
module.exports = router