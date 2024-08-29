import { Router } from "express";
const router = Router()
import fs from "fs"
import CartManager from "../dao/db/cart-manager-db.js";
const manager = new CartManager()





//CREAR UN NUEVO CARRITO
router.post("/", async (req, res) => {
    await manager.newCart()
    res.send({ status: "success", message: "Nuevo carrito creado!" })
})





//AGREGA EL PRODUCTO CON EL ID PROPORCIONADO AL CARRITO CON EL ID PROPORCIONADO
router.post("/:cid/products/:pid/:qty", async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let quantity = req.params.qty
    let cart = await manager.addProdToCart(cid, pid, quantity)
    if (cart) {
        res.send({ status: "success", message: "producto agregado al carrito!" })
    } else {
        res.status(404).send({ status: "incomplete", message: "Carrito no encontrado :(" })
    }
})




//LISTAR CARRITO CON EL ID PROPORCIONADO
router.get("/:cid", async (req, res) => {
    let cid = req.params.cid
    const cart = await manager.getCartById(cid)
    if (cart) {
        res.send(cart.products)
    }
    else {
        res.status(404).send("Carrito no encontrado :(")
    }
})



//ELIMINAR UN PRODUCTO DE UN CARRITO
router.delete("/:cid/products/:pid",async  (req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    const cart = await manager.deleteOneProd(cid, pid)
    if(cart){
        res.send({status: "success", message: "Producto eliminado"})
    } else {
        res.status(404).send({ status: "incomplete", message: "error al eliminar producto" })
    }
})


//ACTUALIZAR TODOS LOS PRODUCTO DEL CARRITO
router.put("/:cid", async (req, res) => {
    const cid = req.params.cid
    const products = req.body
    const cart = await manager.updateProducts(cid, products)
    if(cart){
        res.send({status: "success", message: "Productos actualizados"})
    } else {
        res.status(404).send({ status: "incomplete", message: "error al actualizar los productos" })
    }
})


//ACTUALIZAR LA CANTIDAD DE UN PRODUCTO
router.put("/:cid/products/:pid", async (req, res) => {
    const quantity = req.body
    const cid = req.params.cid
    const pid = req.params.pid
    const response = await manager.updateQuantity(cid, pid, quantity)
    if(response){
        console.log("cantidad editada correctamente")
        res.send({status: "success", message: "cantidad editada correctamente"})
    }else{
        console.log("error al actualizar la cantidad")
        res.status(404).send({ status: "incomplete", message: "error al actualizar la cantidad" })
    }
})

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid
    const response = await manager.deleteAllProds(cid)
    if(response){
        console.log("productos del carrito eliminados correctamente")
        res.send({status: "success", message: "productos del carrito eliminados correctamente"})
    }else{
        console.log("error al eliminar los productos del carrito")
        res.status(404).send({ status: "incomplete", message: "error al eliminar los productos del carrito" })
    }
})




export default router