var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const PokemonController = require('../controllers/pokemonController');

router.get('/pub/pokemons', authentication, PokemonController.getPokemon);
router.post('/pub/pokemons', authentication, PokemonController.gachaPokemon);

module.exports = router