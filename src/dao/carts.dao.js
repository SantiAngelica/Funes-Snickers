import CartsModel from "./models/carts.model.js";

class CartsDao {
    async getAll(){
        return await CartsModel.find()
    }
    async getById(id){
        return await CartsModel.findById(id)
    }
    async create(){
        const cart = new CartsModel({products: []})
        return await cart.save()
    }
    async save(cart){
        cart.markModified("products")
        return await cart.save()
    }
    async updateAll(id, data){
       return await CartsModel.findByIdAndUpdate(id, data)
        
    }
}

export default new CartsDao()