import jwt from "jsonwebtoken"
import configObject from "../config/dotenv.config.js"

const { jwt_decoder } = configObject
const private_key = jwt_decoder

const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"})
    return token
}


const jwtValidator = (req, res, next) => {
    const token = req.cookies.santiCookie

    if (!token) {
        return
    }

    jwt.verify(token, private_key, (err, decoded) => {
        if (err) {
            return res.status(403).send('Failed to authenticate token.');
        }

        req.user = decoded; 
        next();
    });
}





export {
    generateToken,
    jwtValidator
}