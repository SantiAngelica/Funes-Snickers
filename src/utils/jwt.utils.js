import jwt from "jsonwebtoken"

const private_key = "palabrasecretaparatoken"

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