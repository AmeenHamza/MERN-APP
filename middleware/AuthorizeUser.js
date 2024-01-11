const { verify } = require("jsonwebtoken");
require('dotenv').config()

const AuthorizeUser = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(404).json({
            message : "Required Authorization token"
        })
    }
    else {
        try {
            const decode = verify(authorization, process.env.JWT_SECRET)
            console.log(decode)
            next()
        } catch (error) {
            res.status(500).json({
                message : "Invalid Token"
            })
        }
    }

}

module.exports = AuthorizeUser