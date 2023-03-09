var express = require('express');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
var router = express.Router();

router.post('/pub/login', UserController.login);
router.post('/pub/register', UserController.register);
router.get('/pub/user', authentication, UserController.getUser);
router.patch('/pub/user', authentication, UserController.changeBalance);

module.exports = router