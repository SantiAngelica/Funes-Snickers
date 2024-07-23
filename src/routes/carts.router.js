import { Router } from "express";
const router = Router()
import fs from "fs"
import CartManager from "../manager/cart-manager.js";
const manager = new CartManager()




//FUNCIONES PARA VERIFICAR QUE EXISTE UN PRODUCTO Y UN CARRITO CON SU RESPECTIVO ID
async function getProducts(){
    try {
        let res = await fs.promises.readFile("./src/assets/products.json", "utf-8")
        const productos = JSON.parse(res)
        return productos
    } catch (error) {
        return null
    }
}
async function getProductById(pid){
    const products = await getProducts()
    if(products){
        const prod = products.some(prod => prod.id == pid)
        if(prod){
            return 1
        }
        return 0
    }
    return 0
}




//CREAR UN NUEVO CARRITO
router.post("/", async (req, res) => {
    manager.newCart()
    res.send({status:"success", message: "Nuevo carrito creado!"})
})





//AGREGA EL PRODUCTO CON EL ID PROPORCIONADO AL CARRITO CON EL ID PROPORCIONADO
router.post("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    const prod = await getProductById(pid)
    if(prod == 0){
        res.status(404).send({status: "incomplete", message:"Producto no encontrado :("})
    }else{
        let cart = await manager.addProdToCart(pid,cid)
        if(cart == 1){
            res.send({status:"success", message: "producto agregado al carrito!"})
        }else{
            res.status(404).send({status: "incomplete", message:"Carrito no encontrado :("})
        }
    }
})




//LISTAR CARRITO CON EL ID PROPORCIONADO
router.get("/:cid", async (req, res) => {
    let cid = req.params.cid
    const cart = await manager.getCartById(cid)
    if (cart) {
        res.send(cart.products)
    }
    else{
        res.status(404).send("Carrito no encontrado :(")
    }
})






export default router