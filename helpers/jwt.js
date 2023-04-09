const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const createToken = (payload) => jwt.sign(payload, secret)
const verifyToken = (payload) => jwt.verify(payload, secret)

module.exports = {createToken, verifyToken}