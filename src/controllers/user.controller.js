import UserServices from "../services/user.services.js";

import {generateToken} from "../utils/jwt.utils.js";

import UserDTO from "../dto/user.dto.js";

class UserController {
    async register(req, res){
        const {first_name, last_name, email, password, age} = req.body
        try {
            const newUser = {
                first_name,
                last_name,
                age,
                password,
                email,
                role: email == 'santiangelica410@gmail.com' ? 'admin' : 'user',
            }

            await UserServices.registerUser(newUser)

            const token = generateToken({
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
                cart: newUser.cart
            })
            res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true})

            res.redirect("/profile")
        } catch (error) {
            console.log(error)
            res.status(500).send("error interno del server al registrar el usuario")
        }
    }

    async login(req, res){
        const {email, password} = req.body
        try {
            const user = await UserServices.loginUser(email, password)
            const token = generateToken({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                cart: user.cart
            })
            res.cookie("santiCookie", token, {maxAge: 60*60*1000, httpOnly: true})
            res.redirect("/profile")
        } catch (error) {
            console.log(error)
            res.status(500).send("error interno del server al logear el usuario")
        }
    }

    async logout(req, res){
        res.clearCookie("santiCookie")
        res.redirect("/sessions")
    }

    async current(req, res){
        if(req.user) {
            const user = req.user; 
            const userDto = new UserDTO(user); 
            res.send(userDto) 
        }else {
            res.send("No autorizado"); 
        }
    }

    async thirdStrategy(req, res){
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
    }
}

export default new UserController()