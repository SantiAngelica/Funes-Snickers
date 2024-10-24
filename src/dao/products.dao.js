import ProductsModel from "./models/products.model.js";

class ProductsDao {
    async getAll(){
        return await ProductsModel.find()
    }
    async getPaginates(query, option){
        return await ProductsModel.paginate(query, option)
    }
    async getById(id){
        return await ProductsModel.findById(id)
    }
    async getOne(query){
        return await ProductsModel.findOne(query)
    }
    async save(data){
        const product = new ProductsModel(data)
        return await product.save()
    }
    async update(id,data){
        return await ProductsModel.findByIdAndUpdate(id, data)
    }
    async delete(id){
        return await ProductsModel.findByIdAndDelete(id)
    }
}

export default new ProductsDao()