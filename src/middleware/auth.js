const User = require('../models/users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_HASH)
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication Failed' })
    }
}

module.exports = auth