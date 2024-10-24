import ProductsDao from "../dao/products.dao.js";

class ProductsRepository{
    async getAllProducts(){
        return await ProductsDao.getAll()
    }
    async getPaginateProducts(query, options){
        return await ProductsDao.getPaginates(query, options)
    }
    async getProductById(pid){
        return await ProductsDao.getById(pid)
    }
    async addProduct(product){
        return await ProductsDao.save(product)
    }
    async getOneProduct(code){
        return await ProductsDao.getOne({code: code})
    }
    async updateProduct(pid, product){
        return await ProductsDao.update(pid, product)
    }
    async deleteProduct(pid){
        return await ProductsDao.delete(pid)
    }
}

export default new ProductsRepository()