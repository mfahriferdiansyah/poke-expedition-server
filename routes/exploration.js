var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const ExplorationController = require('../controllers/explorationController');

router.get('/explorations', authentication, ExplorationController.getExploration);
router.post('/explorations', authentication, ExplorationController.postExploration);
router.delete('/explorations/:id', authentication, ExplorationController.claimExploration);
 
module.exports = router