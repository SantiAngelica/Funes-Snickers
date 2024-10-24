import productsService from "../services/products.service.js";
import PaginateProductsDTO from "../dto/paginate.dto.js";

class ProductController {
    
    async getProducts(req, res) {
        let limit = parseInt(req.query.limit) || 9
        let page = parseInt(req.query.page) || 1
        let sort = req.query.sort ? { price: parseInt(req.query.sort) } : {}
        let query = req.query.query ? { category: req.query.query } : {}
        try {
            const options = {
                limit: limit,
                page: page ,
                sort: sort ,
                ...query ? { query } : {} 
            }
            const products = await productsService.getProducts(query, options)
            const response = new PaginateProductsDTO(products)

            let cleanProducts = response.payload.map(product => {
                const prodClean = JSON.parse(JSON.stringify(product))
                return prodClean
            });
            response.payload = cleanProducts
        } catch (error) {
            console.log(error)
            res.status(500).send({status:"incomplete", message: "Productos no encontrados"})
        }
    }
    async editProduct(req, res){
        const data = req.body
        const pid = req.params.pid
        try {
            const product = await productsService.updateProduct(pid, data)
            if(!product) throw new Error()
        } catch (error) {
            res.status(500).send({status: 'incomplete', message:'Error al editar el producto'})
        }
    }
    async getProductById(req, res){
        let pid = req.params.pid
        try {
            const prod = await productsService.getProductById(pid)
            if(!prod) throw new Error()
            res.send(prod)
        } catch (error) {
            res.status(404).send({status:"incomplete", message: "Producto no encontrado"})
        }

    }
    async addProduct(req, res){
        let newProduct = req.body
        try {
            if (!newProduct.tittle || !newProduct.description || !newProduct.price || !newProduct.thumbnails || !newProduct.code || !newProduct.stock || !newProduct.status || !newProduct.category) {
                return res.send({status:"incomplete", message: "Todos los campos son obligatorios"})
            }
            const prod = await productsService.addProduct(newProduct)
            if(prod == 2) return res.send({status:"incomplete", message: "No puede haber codigos repetidos"})
            res.send({status:"success", message: "producto agregado!"})
        } catch (error) {
            res.send({status:"incomplete", message: "Error interno del servidor"})
        }
    }
    async deleteProduct(req, res){
        let pid = req.params.pid
        try {
            const response = await productsService.deleteProduct(pid)
            res.send('Producto eliminado correctamente')
        } catch (error) {
            res.status(404).send('El producto no se encontro')
        }
    }
}

export default new ProductController()