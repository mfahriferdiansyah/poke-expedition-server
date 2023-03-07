const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        let {access_token} = req.headers
        if(!access_token) throw {name: `InvalidToken`}
        let payload = verifyToken(access_token)
        let {id} = payload
        const dataUser = await User.findOne({
            where: {
                id
            }
        })
        if(!dataUser) throw {name: `Unauthenticated`}
        
        req.user = {
            id: dataUser.id,
            email: dataUser.email,
            balance: dataUser.balance
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication