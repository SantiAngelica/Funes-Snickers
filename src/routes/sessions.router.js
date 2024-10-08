import {Router} from 'express';

const router = Router()
import userModel from "../dao/models/user.model.js";

import { createHash, isValidPassword } from "../dao/utils/bcrypt.utils.js";
import passport from "passport";
import {generateToken} from "../dao/utils/jwt.utils.js";
import { authorization, passportCall } from "../dao/utils/passportCall.utils.js";

import CartManager from "../dao/db/cart-manager-db.js";
const cartManager = new CartManager()

//REGISTER
router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body
    try {
        let userExist = await userModel.findOne({email: email})
        if(userExist){
            return res.send("el email ya esta registrado")
        } 
        let admin = email == "santiangelica410@gmail.com" ? true : false
        let newCart = await cartManager.newCart()
       
        const newUser = await userModel.create({
            first_name,
            last_name,
            age,
            password: createHash(password),
            email: email,
            role: admin ? "admin" : "user",
            cart: newCart._id
        })

        const token = generateToken({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            role: newUser.role,
            cart: newUser.cart
        })

        res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true}).redirect("/profile")

    } catch (error) {
        console.log(error)
        res.status(500).send("error interno del server")
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        let user = await userModel.findOne({email: email})
        if(!user){
            return res.send("no existe el usuario")
        }
        if(!isValidPassword(password, user)){
            return res.send("contraseña incorrecta")
        }
        const token = generateToken({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            cart: user.cart
        })
        

        res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true}).redirect("/profile")
    } catch (error) {
        console.log(error)
        res.status(500).send("error interno del server")
    }
})

//LOGOUT
router.get("/logout", (req, res) => {
    res.clearCookie("santiCookie")
    res.redirect("/sessions")
})

//LOGIN CON GITHUB
router.get("/github", passport.authenticate("github", {scope: ["user:email"], session: false}) ,(req, res) => {})
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/sessions", session: false}),
async (req, res) => {
    try {
        let user = req.user
            let token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                cart: user.cart
            })


        res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true}).redirect("/profile")
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})





//LOGIN CON GOOGLE
router.get("/google", passport.authenticate("google",{scope: ["profile", "email"], session: false}), async(req, res) => {})
router.get("/googlecallback", passport.authenticate("google", {failureRedirect: "/sessions", session: false}),
async (req, res) => {
    try {
        let user = req.user
            let token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                cart: user.cart
            })


        res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true}).redirect("/profile")
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})




//VERIFICACION DE ROL DE USUARIO CON FUNCIONES EXTERMAS
router.get("/current", passportCall("current") , authorization('user'), (req, res) => {
    res.send(req.user)
})









export default router