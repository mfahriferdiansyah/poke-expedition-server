var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const RegionController = require('../controllers/regionController');

router.get('/regions', authentication, RegionController.getRegions);
 
module.exports = router