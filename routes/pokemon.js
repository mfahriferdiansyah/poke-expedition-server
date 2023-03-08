var express = require('express');
var router = express.Router();
const authentication = require('../middlewares/authentication');
const PokemonController = require('../controllers/pokemonController');

router.get('/pokemons', authentication, PokemonController.getPokemon);
router.post('/pokemons/:bannerId', authentication, PokemonController.gachaPokemon);

module.exports = router