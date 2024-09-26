import passport  from "passport";



import userModel from "../models/user.model.js";


import GitHubStrategy from "passport-github2"

import jwt from "passport-jwt"

import GoogleStrategy from "passport-google-oauth20"



const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt



const initializedPassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({_id: id});
        done(null, user); 
    })



    //estrategia de github
    passport.use("github", new GitHubStrategy({
        clientID: "Iv23lidRMrr2doTZeBMN",
        clientSecret: "3240ca761725991adc4c5a0c2586fdc905a1d6ab",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    email: profile._json.email,
                    password: "",
                    age: 37,
                    last_name: ""
                }

                let result = await userModel.create(newUser)

                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }

    }))


    //ESTRATEGIA DE JWT
    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "palabrasecretaparatoken",
        }, async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload)
            } catch (error) {
                return done(error)
            }
    }))


    //ESTRATEGIA DE GOOGLE
    passport.use("google", new GoogleStrategy({
        clientID: "920281854300-mrlsgm8ie50diln8vj6rn94iqqf05rk3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/sessions/googlecallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    password: "",
                    age: 37,
                    last_name: ""
                }

                let result = await userModel.create(newUser)

                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))
}


const cookieExtractor = (req) =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies["santiCookie"]
    }
    return token
}


export default initializedPassport