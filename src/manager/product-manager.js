import exp from "constants"
import fs from "fs"

class ProductManager {
    constructor() {
        this.products = []
    }

    async getProducts(){
        try {
            let res= await fs.promises.readFile("./src/assets/products.json", "utf-8")
            const products = JSON.parse(res)
            return products
        } catch (error) {
            return this.products
        }
    }

    async addProduct(newProduct) {
        let products = await this.getProducts()
        if (!newProduct.tittle || !newProduct.description || !newProduct.price || !newProduct.thumbnails ||!newProduct.code || !newProduct.stock || !newProduct.status || !newProduct.category ){

            return 1
        }
        
        if (products.some(prod => prod.code == newProduct.code)) {
           
            return 2
        }


        newProduct = {id: products.length+1, ...newProduct}

        products.push(newProduct)
        await fs.promises.writeFile("./src/assets/products.json", JSON.stringify(products, null, 2))
        return 3
    }

    async getProductById(id) {
        const products = await this.getProducts()
        let prod = products.find(prod => prod.id == id)
        if (prod) {
            return prod
        }
        else {
            return null
        }
    }

    async editProduct(id, newProperties){
        const products = await this.getProducts()
        
        
      
        let prod = products.find(prod => prod.id == id)
        if(!prod)
        {
            return
        }
        products.some(prod => prod.code == newProperties.code) && (newProperties.code = prod.code)

        newProperties.id && console.log("no se puede modificar el ID de un producto")
        newProperties.tittle && (prod.tittle = newProperties.tittle)
        newProperties.description && (prod.description = newProperties.description)
        newProperties.price && (prod.price = newProperties.price)
        newProperties.thumbnails && (prod.thumbnails = newProperties.thumbnails)
        newProperties.code && (prod.code = newProperties.code)
        newProperties.stock && (prod.stock = newProperties.stock)
        newProperties.category && (prod.category = newProperties.category)
        await fs.promises.writeFile("./src/assets/products.json", JSON.stringify(products, null, 2))
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        let indexProd = products.findIndex(prod => prod.id == id)
        if(indexProd !== -1){
            products.splice(indexProd,1)
            await fs.promises.writeFile("./src/assets/products.json", JSON.stringify(products, null, 2))
            return true
        }
        else{
            return false
        }
    }
}

export default ProductManager