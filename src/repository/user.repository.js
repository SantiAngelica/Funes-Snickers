import UserDao from "../dao/users.dao.js"

class UserRepository {
    async createUser(user){
        return await UserDao.save(user)
    }
    async getUserById(uid){
        return await UserDao.findById(uid)
    }
    async getUserByMail(email){
        return await UserDao.findOne(email)
    }
    async updateUser(uid, userData){
        return await UserDao.update(userData)
    }
    async deleteUser(uid){
        return await UserDao.delete(uid)
    }
}

export default new UserRepository()