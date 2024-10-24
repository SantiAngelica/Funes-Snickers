import passport from "passport";


const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};


const authorization = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("No tienes permiso");
        }
        next();
    };
};




export {
    passportCall,
    authorization
}
