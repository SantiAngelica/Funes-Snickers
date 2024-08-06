import { Router } from "express";
const router = Router()
import fs from "fs"

import ProductManager from "../manager/product-manager.js";
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
        await fs.promises.writeFile("./src/assets/products.json", JSON.stringify(products, null, 2))
        res.send({status: "success", message:"Producto eliminado"})
    }
    else{
        res.status(404).send({status: "incomplete", message:"Producto no encontrado"})
    }
})








export default router