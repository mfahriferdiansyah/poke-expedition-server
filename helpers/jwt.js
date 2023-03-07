const jwt = require('jsonwebtoken')

const createToken = (payload) => jwt.sign(payload, 'jwt_its_secret')
const verifyToken = (payload) => jwt.verify(payload, 'jwt_its_secret')

module.exports = {createToken, verifyToken}