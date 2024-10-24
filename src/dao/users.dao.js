import UserModel from "./models/user.model.js";

class UserDao {
    async findById(id){
        return await UserModel.findById(id)
    }
    async findOne(query){

        let user = await UserModel.findOne(query)
   
        return user
    }
    async save(data){
        const user = new UserModel(data); 
        return await user.save(); 
    }
    async update(id, data){
        return await UserModel.findByIdAndUpdate(id, data)
    }
    async delete(id){
        return await UserModel.findByIdAndDelete(id)
    }
}

export default new UserDao()