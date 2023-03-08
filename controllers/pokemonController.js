const { Op } = require('sequelize')
const {UserPokemon, Pokemon, Exploration, Region} = require('../models')
const {getRandomPokemon} = require('../helpers/getRandomPokemon')
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

class PokemonController {
    static async getPokemon(req, res, next) {
        try {
            let {id} = req.user
            let pokemonInExpedition = await Exploration.findAll({
                where: {
                    UserId: id,
                },
                include:{ 
                    model: UserPokemon
                }
            })   
            let pokemonInExpeditionId = pokemonInExpedition.map(el => el.UserPokemonId)

            let pokemonNotInExpedition = await UserPokemon.findAll({
                where: {
                    [Op.and]: [
                        {UserId: id},
                        {id: {
                            [Op.notIn] : pokemonInExpeditionId
                        }}
                    ]
                }
            })
            res.status(200).json({pokemonInExpedition, pokemonNotInExpedition})
        } catch (error) {
            next(error)
        }
    }

    //Belum selesai
    static async postPokemon(req, res, next) {
       try {
        let {id} = req.user
        let {name, image, type, hp, atk} = req.body

        let [pokemon, created] = await Pokemon.findOrCreate({
            where: {name: enemyData.name},
            defaults: {
                name: enemyData.name,
                image: enemyData.sprites.other.dream_world.front_default,
                type: enemyData.types[0].type.name,
                hp,
                atk
            }
        })

        let pokemonCaptured = UserPokemon.create({
            name: '',
            exp: 0,
            level: 0,
            UserId: id,
        })
       } catch (error) {
            next(error)
       }
    }

    static async gachaPokemon(req, res, next) {
        try {
            //Verifikasi payment gateway terlebih dahulu
            let {id} = req.user
            let {bannerId:RegionId} = req.params
            let findPokemon = await getRandomPokemon(RegionId) 
            // console.log(findPokemon)
            let {name, image, type, hp, atk} = findPokemon
            let userPokemon = await UserPokemon.create({name, image, type, hp, atk, exp:0, level:0, UserId:id})
            res.status(200).json({message: 'Sweet, you got new pokemon',userPokemon})  
        } catch (error) {
            next(error)
        }
    }

    static async getRegionBanner(req, res, next) {
        try {
            let getRegion = Region.findAll()
            res.status(200).json()
        } catch (error) {
            next(error)
        }   
    }
}

module.exports = PokemonController