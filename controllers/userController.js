const {hashPassword, comparePassword} = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static async login (req, res, next) {
        try {
            let {email, password} = req.body
            if(!email || !password) throw {name: `EmailPasswordRequired`}

            let dataUser = await User.findOne({
                where: {
                    email
                }
            })
            if(!dataUser) throw {name: 'InvalidEmailPassword'}

            let verify = comparePassword(password, dataUser.password)
            if(!verify) throw {name : `InvalidEmailPassword`}

            let access_token = createToken({id:dataUser.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async register (req, res, next) {
        try {
            let {username, email, password} = req.body
            if(!email || !password) throw {name: `EmailPasswordRequired`}
            password = hashPassword(password)
            let dataUser = await User.create({    
                username, email, password,
                balance: 0
            })
            let { username:Username, email:Email, balance:Balance } = dataUser
            res.status(200).json({Username, Email, Balance})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController