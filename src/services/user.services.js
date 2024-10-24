import { CartServices } from "./index.services.js";
import UserRepository from "../repository/user.repository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.utils.js";

class UserServices {
    async registerUser(user) {
        const userExists = await UserRepository.getUserByMail({email: user.email})
        if (userExists) throw new Error()
        if (user.role == 'user') {
            const cart = await CartServices.createCart()
            user.cart = cart._id.toString()
        }

        user.password = createHash(user.password)

        return await UserRepository.createUser(user)
    }

    async loginUser(email, pass) {
        const user = await UserRepository.getUserByMail({email: email})

        if (!user || !isValidPassword(pass, user)) throw new Error("crenciales incorrectas")
        return user
    }

    async findById(uid) {
        return await UserRepository.getUserById(uid)
    }

    async updateUser(user) {
        return await UserRepository.updateUser(user)
    }

    async deleteUser(uid) {
        return await UserRepository.deleteUser(uid)
    }

    async getUserByCart(cid){
        return await UserRepository.getUserByMail({cart: cid})
    }
}

export default new UserServices()