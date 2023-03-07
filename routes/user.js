var express = require('express');
const UserController = require('../controllers/userController');
var router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
 
module.exports = router