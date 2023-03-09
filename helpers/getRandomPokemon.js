async function getRandomPokemon(RegionId){
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();

    let dataApi = await P.getGenerationByName(RegionId)
    let findPokemon = Math.floor(Math.random() * dataApi.pokemon_species.length)
    let pokemonData = await P.getPokemonByName(dataApi.pokemon_species[findPokemon].name)

    let hp, atk, deff
    pokemonData.stats.forEach(el => {
        let {base_stat, stat} = el
        let {name} = stat
        if(name === 'hp') hp = base_stat
        if(name === 'attack') atk = base_stat
        if(name === 'defense') deff = base_stat
    })
    let pokemon = {
        name : pokemonData.name,
        image : pokemonData.sprites.other.dream_world.front_default,
        type: pokemonData.types[0].type.name,
        hp,
        atk
    }
    return pokemon
}

module.exports = {getRandomPokemon}