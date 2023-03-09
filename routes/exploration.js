var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const ExplorationController = require('../controllers/explorationController');

router.get('/pub/explorations', authentication, ExplorationController.getExploration);
router.post('/pub/explorations', authentication, ExplorationController.postExploration);
router.delete('/pub/explorations/:id', authentication, ExplorationController.claimExploration);
 
module.exports = router