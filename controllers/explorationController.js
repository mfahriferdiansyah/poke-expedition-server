const {User, Exploration, Region, EnemyPokemon, Pokemon, UserPokemon, UserItem, Item} = require('../models')
var Pokedex = require('pokedex-promise-v2');
const { getRandomPokemon } = require('../helpers/getRandomPokemon');
var P = new Pokedex();

class ExplorationController {
    static async getExploration(req, res, next) {
        try {
            /**
             * 1. Tampilkan tabel Regions, beserta reward exp dan chance
             * 2. Tampilkan tabel Explorations
             * 3. Layout atas menampilkan peta, dengan icon location ter pin per regions
             * 4. Layout bawah menampilkan list UserPokemons, dibagi dua, on exploration + time eta(kalau tidak bisa maka di klik check time), dan available to deploy
             * 5. Ketika pin regions di klik maka akan keluar pop up untuk memilih available pokemon to deploy, lalu send postExploration
             * 6. Maka yang dipanggil adalah tabel : Explorations, Regions, UserPokemons dari req.user {id} dari payload
             * 7. Perlukah isDeploy di UserPokemons ? Bila tidak maka harus cek where id:UserId, UserPokemonsId:UserPokemonsId
             * Bila ada maka tidak bisa di deploy (getExploration)
             * -----
             * -Buat logika untuk memberi waktu kapan akan battle ketika true, menggunakan date noew dikurangi x math random time milik region
             * -What client-side need ? 
             * 1. List of UserPokemons -> Divided between available and on expedition
             * 2. List of Regions -> Dosplaying chance, standart reward, estimated time (like a pin location icon with map background)
             * 3. Button to choose UserPokemons and button to deploy
             * -What logic do we need ?
             * 1. Call Users that included UserPokemons, and include Explorations that included UserPokemons
             * 2. Call Regions table
             * 3. When pokemon deployed, we need to create a logic that decide isBattle, if yes decide the time < Regions.time
             * -Most confusing is after decide the time: how to actually knows that now is the time to display exploration is ending?
             */
            let{id} = req.user 
            let dataUser = await User.findOne({
                where: {
                    id: id
                },
                attributes: {exclude: ['password']},
                include: [
                    {
                        model: UserPokemon
                    },
                    {
                        model: Exploration,
                        include: EnemyPokemon
                    }
                ]
            })
            res.status(200).json(dataUser)
        } catch (error) {
            next(error)
        }
    }
    static async postExploration(req, res, next) {
        try {
            /**
             * 1. Handle getExploration step 5, 
             * 2. isBattle = Math.Random() * Regions.chance rumusnya belum tau pokok 0/1 outputnya
             *   -time = Math.Random() * Regions.time ini adalah waktu encounter, ketika isBattle bernilai 1
             *    ketika bernilai 0 maka time = time pada region. Sebenarnya ini adalah exploration time
             *    ketika isBattle = 1 maka diakhir akan ada notif encountered pokemon
             * 3. Menerima RegionId, UserId, battleTime, UserPokemonsId, EnemyPokemons(random juga)
             * 4. Verifkasi lagi nomor 7 di get
             * 5. Create row
             * 6. getExploration()
             * 
             */
            let{id} = req.user 
            let {RegionId} = req.params
            let {UserPokemonId} = req.body //Tombol submit yang ada pada client berupa form yang berisi UserPokemonId
            
            let regionData = await Region.findByPk(RegionId)
            if(!regionData) throw {name: 'NotFound'}

            let isBattle = false
            if(Math.random() * 100 < regionData.chance) isBattle = true

            let time = regionData.time
            if(isBattle) time = Math.floor(Math.random() * regionData.time)

            let {name, image, type, hp, atk} = await getRandomPokemon(RegionId)
            let [enemy, created] = await EnemyPokemon.findOrCreate({
                where: {name},
                defaults: {
                    name,
                    image,
                    type,
                    hp,
                    atk
                }
            })

            let [newExploration, isExploration] = await Exploration.findOrCreate({
                where: {
                    UserPokemonId
                },
                defaults: {
                isBattle,
                time,
                UserId: id,
                RegionId,
                UserPokemonId,
                EnemyPokemonId : enemy.id
                }
            })

            if(!isExploration) throw {name: `isDeployed`}
            res.status(201).json({message: `Successfully sent pokemon to expedition!`, newExploration, enemy})
        } catch (error) {
            next(error)
        }
    }

    static async deleteExploration(req, res, next){
        try {
            let {id} = req.params
            let{id:UserId} = req.user
            let deletedExploration = await Exploration.destroy({
                where: {
                    id,
                    UserId
                }
            })
            if(!deletedExploration) throw {name: 'NotFound'}
            res.status(200).json({message: `Expedition ended`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ExplorationController