import ProductsRepository from "../repository/products.repository.js";

class ProductsService {
    async getProducts(query, options) {
        if (options == 'all') return await ProductsRepository.getAllProducts()
        else return await ProductsRepository.getPaginateProducts(query || {}, options)
    }
    async getProductById(pid) {
        return await ProductsRepository.getProductById(pid)
    }
    async addProduct(product) {
        const codeRepit = await ProductsRepository.getOneProduct(product.code)
        if(codeRepit) return 2
        return await ProductsRepository.addProduct(product)
    }
    async updateProduct(pid, product) {
        return await ProductsRepository.updateProduct(pid, product)
    }
    async deleteProduct(pid) {
        return await ProductsRepository.deleteProduct(pid)
    }
}

export default new ProductsService()