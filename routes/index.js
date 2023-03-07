var express = require('express');
var router = express.Router();
const user = require('./user')
const region = require('./region')
const pokemon = require('./pokemon')
const exploration = require('./exploration')
const midtrans = require('./midtrans')

router.get('/', function (req, res) {
    res.status(200)._construct({message: 'welcome'})
});
router.use(user)
router.use(region)
router.use(pokemon)
router.use(exploration)
router.use(midtrans)

module.exports = router