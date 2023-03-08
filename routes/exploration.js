var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const ExplorationController = require('../controllers/explorationController');

router.get('/explorations', authentication, ExplorationController.getExploration);
router.delete('/explorations/:id', authentication, ExplorationController.claimExploration);
router.post('/explorations/:RegionId', authentication, ExplorationController.postExploration);
 
module.exports = router