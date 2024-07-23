import { Router } from "express";
const router = Router()
import fs from "fs"


class ProductManager {
    constructor() {
        this.products = []
    }

    async getProducts(){
        try {
            let res= await fs.promises.readFile("./src/assets/productos.json", "utf-8")
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
        await fs.promises.writeFile("./src/assets/productos.json", JSON.stringify(products, null, 2))
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
        newProperties.id && console.log("no se puede modificar el ID de un producto")
        newProperties.tittle && (prod.tittle = newProperties.tittle)
        newProperties.description && (prod.description = newProperties.description)
        newProperties.price && (prod.price = newProperties.price)
        newProperties.thumbnails && (prod.thumbnails = newProperties.thumbnails)
        newProperties.code && (prod.code = newProperties.code)
        newProperties.stock && (prod.stock = newProperties.stock)
        newProperties.category && (prod.category = newProperties.category)
        await fs.promises.writeFile("./src/assets/productos.json", JSON.stringify(products, null, 2))
    }
}
const manager = new ProductManager()



//MOSTRAR LISTA DE PRODUCTS
router.get("/", async (req, res) => {
    let products = await manager.getProducts()
    res.send(products)
})

//MOSTRAR EL PRODUCTO CON EL ID PROPORCIONADO
router.get("/:pid", async (req, res) => {
    let id = req.params.pid
    const product = await manager.getProductById(id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({status:"incomplete", message: "Producto no encontrado"})
    }
})





//POST
//AGREGRA NUEVO PRODUCTO
router.post("/", async (req, res) => {
    let newProd = req.body
    let error
    error = await manager.addProduct(newProd)
    if(error == 1){
        res.send({status:"incomplete", message: "Todos los campos son obligatorios"})
    }
    if(error == 2){
        res.send({status:"incomplete", message: "No puede haber codigos repetidos"})
    }
    if(error == 3){
        res.send({status:"success", message: "producto agregado!"})
    }
})




//PUT
//EDITA EL PRODUCTO CON EL ID PROPORCIONADO CON LAS PROPIEDADES AGREGADAS
router.put("/:pid", async(req, res) => {
    let newProperties = req.body
    let id = req.params.pid
    await manager.editProduct(id, newProperties)
    if(newProperties.id){
        res.send({status: "success", message:"Producto editado!", messajeID:"No se puede modificar el id de un producto"})
    }
    else{
        res.send({status: "success", message:"Producto editado!"})
    }
})




//DELETE
//BORRA EL PRODUCTO CON EL ID PROPORICONADO
router.delete("/:pid", async(req, res) => {
    let id = req.params.pid
    const products = await manager.getProducts()
    console.log(products)
    let indexProd = products.findIndex(prod => prod.id == id)
    if(indexProd !== -1){
        products.splice(indexProd,1)
        await fs.promises.writeFile("./src/assets/productos.json", JSON.stringify(products, null, 2))
        res.send({status: "success", message:"Producto eliminado"})
    }
    else{
        res.status(404).send({status: "incomplete", message:"Producto no encontrado"})
    }
})




export default router