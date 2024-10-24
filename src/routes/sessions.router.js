import {Router} from 'express';
const router = Router()
import passport from "passport";
import  {passportCall} from "../utils/passportCall.utils.js";
import UserController from '../controllers/user.controller.js';

//REGISTER
router.post("/register", UserController.register)

//LOGIN
router.post("/login", UserController.login)

//LOGOUT
router.get("/logout", UserController.logout)

//LOGIN CON GITHUB
router.get("/github", passport.authenticate("github", {scope: ["user:email"], session: false}) ,(req, res) => {})
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/sessions", session: false}),UserController.thirdStrategy)

//LOGIN CON GOOGLE
router.get("/google", passport.authenticate("google",{scope: ["profile", "email"], session: false}), async(req, res) => {})
router.get("/googlecallback", passport.authenticate("google", {failureRedirect: "/sessions", session: false}),UserController.thirdStrategy)

//VERIFICACION DE ROL DE USUARIO CON FUNCIONES EXTERMAS
router.get("/current", passportCall('current'), UserController.current)



export default router